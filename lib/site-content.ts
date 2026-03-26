export type PersonaOption = {
  id: string;
  label: string;
  summary: string;
  recommendation: string;
};

export type PainOption = {
  id: string;
  label: string;
  summary: string;
  route: string;
};

export type ProofOption = {
  id: string;
  label: string;
  summary: string;
  route: string;
};

export const personas: PersonaOption[] = [
  {
    id: "consultant",
    label: "Consultant",
    summary: "You need reusable delivery leverage across multiple client environments.",
    recommendation: "Start with the golden path to show visible ROI fast."
  },
  {
    id: "architect",
    label: "Solution architect",
    summary: "You want reusable rules, integration seams, and auditable system behavior.",
    recommendation: "Start with architecture and proof surfaces."
  },
  {
    id: "lead",
    label: "Engineering lead",
    summary: "You need a framework that lowers team ramp time and reduces one-off utility code.",
    recommendation: "Start with diagnostics and adoption flow."
  },
  {
    id: "operator",
    label: "Operations-minded builder",
    summary: "You care about delivery clarity, edge-case visibility, and explainable workflow behavior.",
    recommendation: "Start with proof and validation trace output."
  }
];

export const pains: PainOption[] = [
  {
    id: "tools",
    label: "Ship internal tools faster",
    summary: "Use capability-first utilities and a repeatable quickstart to avoid rebuilding the same foundation every time.",
    route: "/proof"
  },
  {
    id: "integrations",
    label: "Make integrations reliable",
    summary: "Start with file and HTTP-backed ingestion plus rule trace output that makes behavior easy to inspect.",
    route: "/proof"
  },
  {
    id: "rules",
    label: "Build a rules and validation foundation",
    summary: "Use config-driven rule evaluation and explicit validation feedback to make business logic easier to audit.",
    route: "/proof"
  },
  {
    id: "reusable",
    label: "Create reusable delivery blocks",
    summary: "Use Build Faster, Ship Safer, Automate More, and Integrate Messy Systems as the public framework surface.",
    route: "/about"
  }
];

export const proofs: ProofOption[] = [
  {
    id: "example",
    label: "Example first",
    summary: "See the golden path and expected outputs before reading architecture.",
    route: "/proof"
  },
  {
    id: "architecture",
    label: "Architecture first",
    summary: "Understand the modular .NET shape before drilling into usage.",
    route: "/proof#architecture"
  },
  {
    id: "diagnostics",
    label: "Diagnostics first",
    summary: "See why rules apply or skip and how validation explains missing state.",
    route: "/proof#diagnostics"
  },
  {
    id: "founder",
    label: "Creator credibility first",
    summary: "Understand why Thomas Smith built this framework and what delivery experience shaped it.",
    route: "/about"
  }
];

export const capabilityCards = [
  {
    title: "Build Faster",
    detail: "Shape data, wire utilities, and move faster when a new project needs immediate traction."
  },
  {
    title: "Ship Safer",
    detail: "Reduce runtime surprises with retries, wrappers, validation, and clear output expectations."
  },
  {
    title: "Automate More",
    detail: "Package repeat work into dynamic helpers and reusable generation patterns."
  },
  {
    title: "Integrate Messy Systems",
    detail: "Stabilize environment, parsing, and system boundaries when business software gets ugly."
  }
];
