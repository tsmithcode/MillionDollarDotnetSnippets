"use client";

import { useMemo, useState } from "react";
import { buildRecommendation, pains, personas, proofs } from "@/lib/site-content";
import { PageTelemetry, trackTelemetry } from "@/components/telemetry/telemetry-client";

type StepId = "persona" | "pain" | "proof";

const steps: { id: StepId; label: string }[] = [
  { id: "persona", label: "Who are you?" },
  { id: "pain", label: "What pain are you solving?" },
  { id: "proof", label: "What proof do you need?" }
];

export function Wizard() {
  const [personaId, setPersonaId] = useState(personas[0].id);
  const [painId, setPainId] = useState(pains[0].id);
  const [proofId, setProofId] = useState(proofs[0].id);
  const [activeStep, setActiveStep] = useState<StepId>("persona");

  const selectedPersona = useMemo(
    () => personas.find((item) => item.id === personaId) ?? personas[0],
    [personaId]
  );
  const selectedPain = useMemo(() => pains.find((item) => item.id === painId) ?? pains[0], [painId]);
  const selectedProof = useMemo(() => proofs.find((item) => item.id === proofId) ?? proofs[0], [proofId]);

  const recommendation = useMemo(
    () => buildRecommendation(selectedPersona.id, selectedPain.id, selectedProof.id),
    [selectedPain.id, selectedPersona.id, selectedProof.id]
  );

  return (
    <section className="wizard-panel" id="wizard" aria-labelledby="wizard-title">
      <PageTelemetry page="wizard" />
      <div className="wizard-header">
        <div>
          <p className="eyebrow">Guided path</p>
          <h2 className="section-title" id="wizard-title">
            Zero-knowledge onboarding with explicit reasons at every step.
          </h2>
        </div>
        <ol className="progress-meter" aria-label="Wizard progress">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isComplete = steps.findIndex((item) => item.id === activeStep) > index;

            return (
              <li key={step.id} className={isActive ? "active" : isComplete ? "complete" : ""}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStep(step.id);
                    trackTelemetry("wizard_step_changed", { step: step.id, source: "progress_meter" });
                  }}
                >
                  <span>{index + 1}</span>
                  {step.label}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="wizard-grid">
        <div className="wizard-controls">
          <fieldset className={activeStep === "persona" ? "step-frame active" : "step-frame"}>
            <legend>Step 1: Who are you?</legend>
            {personas.map((persona) => (
              <label key={persona.id} className="choice-row">
                <input
                  checked={persona.id === personaId}
                  name="persona"
                  onChange={() => {
                    setPersonaId(persona.id);
                    setActiveStep("pain");
                    trackTelemetry("wizard_selection_changed", {
                      field: "persona",
                      value: persona.id,
                      nextStep: "pain"
                    });
                  }}
                  type="radio"
                />
                <span>
                  <strong>{persona.label}</strong>
                  <small>{persona.summary}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className={activeStep === "pain" ? "step-frame active" : "step-frame"}>
            <legend>Step 2: What pain are you solving?</legend>
            {pains.map((pain) => (
              <label key={pain.id} className="choice-row">
                <input
                  checked={pain.id === painId}
                  name="pain"
                  onChange={() => {
                    setPainId(pain.id);
                    setActiveStep("proof");
                    trackTelemetry("wizard_selection_changed", {
                      field: "pain",
                      value: pain.id,
                      nextStep: "proof"
                    });
                  }}
                  type="radio"
                />
                <span>
                  <strong>{pain.label}</strong>
                  <small>{pain.summary}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className={activeStep === "proof" ? "step-frame active" : "step-frame"}>
            <legend>Step 3: What proof do you need?</legend>
            {proofs.map((proof) => (
              <label key={proof.id} className="choice-row">
                <input
                  checked={proof.id === proofId}
                  name="proof"
                  onChange={() => {
                    setProofId(proof.id);
                    trackTelemetry("wizard_selection_changed", {
                      field: "proof",
                      value: proof.id,
                      nextStep: "recommendation"
                    });
                  }}
                  type="radio"
                />
                <span>
                  <strong>{proof.label}</strong>
                  <small>{proof.summary}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </div>

        <aside className="recommendation-panel" aria-live="polite">
          <p className="eyebrow">Recommended path</p>
          <p className="recommendation-kicker">{recommendation.confidenceLabel}</p>
          <h3>{recommendation.title}</h3>
          <p>{recommendation.detail}</p>
          <dl className="decision-audit">
            <div>
              <dt>Selected persona</dt>
              <dd>{selectedPersona.label}</dd>
            </div>
            <div>
              <dt>Selected pain</dt>
              <dd>{selectedPain.label}</dd>
            </div>
            <div>
              <dt>Selected proof</dt>
              <dd>{selectedProof.label}</dd>
            </div>
          </dl>
          <div className="allowed-box">
            <strong>Why this route is allowed</strong>
            <p>{recommendation.allowedReason}</p>
          </div>
          <div className="allowed-box route-plan">
            <strong>What to do first</strong>
            <p>{recommendation.firstAction}</p>
          </div>
          <div className="route-signals" aria-label="Route fit signals">
            {recommendation.routeSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
          {recommendation.blockedReason ? (
            <div className="blocked-box">
              <strong>What this does not optimize for</strong>
              <p>{recommendation.blockedReason}</p>
            </div>
          ) : null}
          <div className="recommendation-actions">
            <a
              className="primary-action"
              href={recommendation.href}
              onClick={() =>
                trackTelemetry("wizard_recommendation_opened", {
                  href: recommendation.href,
                  persona: selectedPersona.id,
                  pain: selectedPain.id,
                  proof: selectedProof.id
                })
              }
            >
              Continue to recommended path
            </a>
            <a className="secondary-action" href={recommendation.nextActionHref}>
              {recommendation.nextActionLabel}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
