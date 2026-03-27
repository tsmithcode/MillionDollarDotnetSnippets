export type PersonaOption = {
  id: string;
  label: string;
  summary: string;
  recommendation: string;
  preferredProofs: string[];
  topPainIds: string[];
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

export type RecommendationRoute = {
  href: string;
  title: string;
  detail: string;
  confidenceLabel: string;
  allowedReason: string;
  firstAction: string;
  nextActionLabel: string;
  nextActionHref: string;
  routeSignals: string[];
  blockedReason?: string;
};

export const guidedReadingPaths = [
  {
    title: "Start with proof",
    audience: "Consultants and engineering leads who need ROI fast.",
    path: ["/proof", "/about", "/leadership"]
  },
  {
    title: "Start with founder authority",
    audience: "Strategic readers who need credibility before mechanics.",
    path: ["/about", "/proof", "/leadership"]
  },
  {
    title: "Start with leadership",
    audience: "CEO and investor readers who need category, moat, and confidence first.",
    path: ["/leadership", "/proof", "/about"]
  }
];

export const personas: PersonaOption[] = [
  {
    id: "consultant",
    label: "Consultant",
    summary: "You need reusable delivery leverage across multiple client environments.",
    recommendation: "Start with the golden path to show visible ROI fast.",
    preferredProofs: ["example", "diagnostics"],
    topPainIds: ["tools", "integrations"]
  },
  {
    id: "architect",
    label: "Solution architect",
    summary: "You want reusable rules, integration seams, and auditable system behavior.",
    recommendation: "Start with architecture and proof surfaces.",
    preferredProofs: ["architecture", "diagnostics"],
    topPainIds: ["rules", "integrations"]
  },
  {
    id: "lead",
    label: "Engineering lead",
    summary: "You need a framework that lowers team ramp time and reduces one-off utility code.",
    recommendation: "Start with diagnostics and adoption flow.",
    preferredProofs: ["diagnostics", "example"],
    topPainIds: ["tools", "reusable"]
  },
  {
    id: "operator",
    label: "Operations-minded builder",
    summary: "You care about delivery clarity, edge-case visibility, and explainable workflow behavior.",
    recommendation: "Start with proof and validation trace output.",
    preferredProofs: ["diagnostics", "founder"],
    topPainIds: ["integrations", "rules"]
  }
];

export const pains: PainOption[] = [
  {
    id: "tools",
    label: "Ship internal tools faster",
    summary: "Use capability-first utilities and a repeatable quickstart to avoid rebuilding the same foundation every time.",
    route: "/proof#success"
  },
  {
    id: "integrations",
    label: "Make integrations reliable",
    summary: "Start with file and HTTP-backed ingestion plus rule trace output that makes behavior easy to inspect.",
    route: "/proof#proof-grid"
  },
  {
    id: "rules",
    label: "Build a rules and validation foundation",
    summary: "Use config-driven rule evaluation and explicit validation feedback to make business logic easier to audit.",
    route: "/proof#diagnostics"
  },
  {
    id: "reusable",
    label: "Create reusable delivery blocks",
    summary: "Use Build Faster, Ship Safer, Automate More, and Integrate Messy Systems as the public framework surface.",
    route: "/proof#capabilities"
  }
];

export const proofs: ProofOption[] = [
  {
    id: "example",
    label: "Example first",
    summary: "See the golden path and expected outputs before reading architecture.",
    route: "/proof#success"
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

export const proofStats = [
  { label: "Ingestion modes", value: "2", detail: "File and HTTP-backed pipeline" },
  { label: "Proof devices", value: "2", detail: "Desktop and mobile browser coverage" },
  { label: "Enterprise outputs", value: "4", detail: "Queue, connector, SLA, and approval routing shown" },
  { label: "Rule trace clarity", value: "Per rule", detail: "Applied and skipped outcomes shown" }
];

export const premiumArtifacts = [
  {
    title: "Executive review route",
    detail: "Leadership gets one fast reading path for buyer, moat, release confidence, and current execution standard.",
    href: "/leadership",
    label: "Open leadership surface"
  },
  {
    title: "Proof-first evaluation",
    detail: "Technical readers can inspect diagnostics, ingestion modes, and golden-path outputs before they read narrative.",
    href: "/proof",
    label: "Inspect proof surface"
  },
  {
    title: "Founder authority signal",
    detail: "The about route grounds the framework in enterprise delivery reality rather than abstract positioning language.",
    href: "/about",
    label: "Read founder story"
  }
];

export const proofRecords = [
  {
    id: "WORK-1001",
    queue: "Enterprise Operations",
    status: "Escalated",
    mode: ["File source mode", "HTTP source mode"],
    summary: "Urgent ERP work receives connector, SLA, and executive approval routing without ambiguity."
  },
  {
    id: "WORK-1002",
    queue: "Enterprise Operations",
    status: "Unset",
    mode: ["File source mode", "HTTP source mode"],
    summary: "Normal ERP work routes correctly but still surfaces missing escalation status through validation."
  },
  {
    id: "WORK-1003",
    queue: "Engineering Automation",
    status: "Escalated",
    mode: ["File source mode", "HTTP source mode"],
    summary: "Urgent CAD work is routed into engineering automation with operations-level approval."
  }
];

export const leadershipMetrics = [
  {
    label: "Primary buyer",
    value: "High-value .NET consultants",
    detail: "Built for consultants, architects, and technical leads who monetize delivery leverage."
  },
  {
    label: "Product category",
    value: "Consultant acceleration framework",
    detail: "More than snippets: guided adoption, auditable proof, and reusable .NET building blocks."
  },
  {
    label: "Release confidence",
    value: "15/15 gate checks",
    detail: "Chromium, WebKit, and mobile flows now pass console-clean, guided, keyboard, and reduced-motion proof."
  },
  {
    label: "Founder authority",
    value: "ERP + CAD + modernization",
    detail: "Grounded in enterprise integration, Autodesk-platform work, and governed system delivery."
  }
];

export const marketReasons = [
  {
    title: "Messy-system leverage",
    detail: "The framework is strongest where delivery teams lose margin: integrations, validation, rules, repetitive internal tooling, and operational routing."
  },
  {
    title: "Enterprise workflow proof",
    detail: "The flagship slice now shows connector assignment, SLA windows, approval lanes, and queue routing instead of generic helper behavior."
  },
  {
    title: "Civic-grade clarity",
    detail: "The product is designed to stay legible for zero-knowledge users while still satisfying executive and technical scrutiny."
  }
];

export const leadershipQuestions = [
  {
    title: "What is it?",
    answer: "A premium .NET consultant acceleration framework presented through a guided, accessible product surface."
  },
  {
    title: "Who is it for?",
    answer: "Consultants, architects, and leads responsible for difficult delivery work where speed, trust, and reuse all matter."
  },
  {
    title: "Why does it win?",
    answer: "It combines framework leverage, explicit diagnostics, founder credibility, and release-grade browser proof in one coherent system."
  },
  {
    title: "What is proven today?",
    answer: "A buildable .NET product, dual-ingestion golden path, auditable rules, mobile-ready UX, and cross-browser release confidence."
  }
];

export const leadershipTimeline = [
  {
    phase: "Now",
    title: "Flagship product surface",
    detail: "Guided wizard, founder page, proof page, cinematic hero, and browser/device release gating are live."
  },
  {
    phase: "Next",
    title: "Launch-grade narrative assets",
    detail: "Leadership review, investor framing, social previews, and richer examples make the repo more legible outside engineering."
  },
  {
    phase: "Then",
    title: "Compounding framework adoption",
    detail: "More vertical slices, stronger integration modes, and clearer package distribution turn proof into repeatable usage."
  }
];

export const commercializationOffers = [
  {
    title: "Open-core framework",
    detail: "Keep the core product public and proof-rich so buyer trust compounds through transparent adoption.",
    fit: "Best for distribution and authority building."
  },
  {
    title: "Premium enterprise modules",
    detail: "Reserve deeper integration packs, packaging accelerators, and flagship vertical slices for paid usage.",
    fit: "Best for monetizing the strongest consultant ROI paths."
  },
  {
    title: "Strategic advisory offer",
    detail: "Use the framework as the operating system behind higher-value consulting, modernization, and integration delivery.",
    fit: "Best for founder-led premium service leverage."
  }
];

export const appraisalRange = {
  current: "$1M-$3M",
  expected: "$8M-$20M",
  traction: "$20M-$50M+",
  reason:
    "The current site and proof layer are strong strategic assets, but the framework depth and monetization system still have meaningful upside."
};

export const operatingMetrics = [
  {
    label: "Release rhythm",
    value: "Managed weekly",
    detail: "A formal scorecard, release review, and risk register now define what leadership should inspect before shipping."
  },
  {
    label: "Executive visibility",
    value: "Single review layer",
    detail: "Leadership, proof, appraisal, and operating risk are now consolidated into one product-facing reading system."
  },
  {
    label: "Investor package",
    value: "Prepared",
    detail: "The product now has a repeatable package for category, moat, proof, appraisal, and next-step execution."
  }
];

export function buildRecommendation(personaId: string, painId: string, proofId: string): RecommendationRoute {
  const persona = personas.find((item) => item.id === personaId) ?? personas[0];
  const pain = pains.find((item) => item.id === painId) ?? pains[0];
  const proof = proofs.find((item) => item.id === proofId) ?? proofs[0];

  const personaPrefersProof = persona.preferredProofs.includes(proof.id);
  const personaPainAligned = persona.topPainIds.includes(pain.id);

  if (proof.id === "founder") {
    return {
      href: "/about",
      title: "Start with the creator story",
      detail: "You asked for credibility first, so the fastest route is the founder page and the delivery evidence behind it.",
      confidenceLabel: "Credibility-first route",
      allowedReason: "Founder-first is allowed because you selected creator credibility as the proof layer.",
      firstAction: "Read the founder story first, then move to proof once the delivery context is clear.",
      nextActionLabel: "Then review the proof surface",
      nextActionHref: "/proof",
      routeSignals: [
        "Strong fit for executive and investor readers",
        "Best when founder credibility is part of the buying decision",
        "Not the fastest path to runtime mechanics"
      ],
      blockedReason: pain.id === "integrations"
        ? "This path does not show runtime integration proof first. Use the proof page next if you need system behavior before story."
        : undefined
    };
  }

  if (personaPrefersProof && personaPainAligned) {
    return {
      href: proof.route,
      title: "Start with the recommended proof path",
      detail: `${persona.recommendation} ${pain.summary}`,
      confidenceLabel: "High-confidence route",
      allowedReason: "This route matches both your persona and the kind of delivery problem you selected.",
      firstAction: "Use this page as the fastest first success path, then expand into the supporting surfaces once the value is obvious.",
      nextActionLabel: proof.id === "architecture" ? "Then review founder authority" : "Then open the leadership review",
      nextActionHref: proof.id === "architecture" ? "/about" : "/leadership",
      routeSignals: [
        "Best fit for your selected persona",
        "Aligned to your chosen delivery pain",
        "Designed to show useful proof before deeper reading"
      ]
    };
  }

  return {
    href: pain.route,
    title: "Start with the fastest ROI proof",
    detail: `${pain.summary} Then expand into ${proof.label.toLowerCase()} once you have first success.`,
    confidenceLabel: "Practical first-step route",
    allowedReason: "This route is allowed because it keeps the first step practical and short for a zero-knowledge user.",
    firstAction: "Take the shortest path to visible value first, then move into the deeper proof or narrative layer you selected.",
    nextActionLabel: proof.id === "founder" ? "Then review founder authority" : "Then open your selected proof layer",
    nextActionHref: proof.route,
    routeSignals: [
      "Optimized for first success rather than deepest detail",
      "Strong for zero-knowledge readers",
      "Built to reduce early decision fatigue"
    ],
    blockedReason: personaPrefersProof
      ? undefined
      : `${proof.label} is not the strongest first stop for a ${persona.label.toLowerCase()} solving this specific problem.`
  };
}
