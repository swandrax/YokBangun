/**
 * JEV (Justified Expected Value) & ROI Decision Layer for yokBangun.
 * 
 * Ensures that product features, AI integrations, and infrastructure changes
 * are evaluated mathematically and risk-adjusted before engineering begins.
 * No feature or architecture is greenlit on hype alone.
 */

export type ReversibilityType = "TYPE_1_IRREVERSIBLE" | "TYPE_2_REVERSIBLE";

export type SecurityRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type MaintenanceBurden = "LOW" | "MEDIUM" | "HIGH";

export type ProposalType =
  | "FEATURE"
  | "INFRASTRUCTURE"
  | "AI_INTEGRATION"
  | "REFACTORING"
  | "MAINTENANCE";

export type ProposalFinancials = {
  /** Expected direct revenue increase (IDR / USD) within 12 months */
  estimatedRevenueGain: number;
  /** Direct cost savings (e.g. reduced manual hours, lower cloud bills) */
  estimatedCostSaving: number;
  /** CapEx: Initial engineering & design cost to build (Hours × Rate) */
  developmentCost: number;
  /** OpEx: Estimated annual maintenance, LLM API bills, server hosting */
  operationalCostAnnual: number;
};

export type ProposalRisk = {
  /** Cost/damages if the initiative fails (rollback cost, lost time, customer trust) */
  downsideCost: number;
  /** Security exposure assessment */
  securityRisk: SecurityRiskLevel;
  /** Ongoing tech debt / maintenance overhead */
  maintenanceBurden: MaintenanceBurden;
};

export type FeatureProposal = {
  id: string;
  title: string;
  type: ProposalType;
  reversibility: ReversibilityType;
  financials: ProposalFinancials;
  /** Confidence score based on user research & technical feasibility (0.0 to 1.0) */
  probabilityOfSuccess: number;
  risk: ProposalRisk;
  /** Required operational and engineering guardrails */
  guardrails: string[];
};

export type DecisionStatus = "GO" | "CONDITIONAL_SPIKE" | "NO_GO";

export type DecisionEvaluation = {
  proposalId: string;
  title: string;
  status: DecisionStatus;
  metrics: {
    totalCostOfOwnership: number;
    expectedGrossValue: number;
    expectedRiskPenalty: number;
    justifiedExpectedValue: number;
    riskAdjustedRoi: number; // e.g. 3.2 = 320% ROI
  };
  reasons: string[];
  requiredGuardrails: string[];
  actionRecommendation: string;
};

export const JEV_THRESHOLDS = {
  MINIMUM_ROI_FOR_GO: 2.5,          // 250% ROI required for direct GO
  MINIMUM_ROI_FOR_SPIKE: 1.8,       // 180% ROI qualifies for a timeboxed spike
  MIN_SUCCESS_PROB_TYPE1: 0.70,     // Irreversible decisions need >= 70% confidence
  MIN_SUCCESS_PROB_TYPE2: 0.50,     // Reversible decisions need >= 50% confidence
} as const;

/**
 * Evaluates a feature proposal through the Justified Expected Value (JEV) Decision Engine.
 */
export function evaluateJevDecision(proposal: FeatureProposal): DecisionEvaluation {
  const { financials, risk, probabilityOfSuccess, reversibility } = proposal;
  const probabilityOfFailure = Math.max(0, 1 - probabilityOfSuccess);

  // 1. Total Cost of Ownership (TCO) = CapEx + OpEx (Year 1)
  const totalCostOfOwnership =
    financials.developmentCost + financials.operationalCostAnnual;

  // 2. Expected Gross Value (EGV)
  const totalGain = financials.estimatedRevenueGain + financials.estimatedCostSaving;
  const expectedGrossValue = totalGain * probabilityOfSuccess;

  // 3. Expected Risk Penalty (ERP)
  const expectedRiskPenalty = risk.downsideCost * probabilityOfFailure;

  // 4. Justified Expected Value (JEV)
  // JEV = EGV - ERP - TCO
  const justifiedExpectedValue = expectedGrossValue - expectedRiskPenalty - totalCostOfOwnership;

  // 5. Risk-Adjusted ROI
  const netReturn = expectedGrossValue - expectedRiskPenalty;
  const riskAdjustedRoi = totalCostOfOwnership > 0 ? netReturn / totalCostOfOwnership : 0;

  const reasons: string[] = [];

  // Security Gate
  if (risk.securityRisk === "CRITICAL") {
    reasons.push("Critical security risk identified without mitigation path.");
  }

  // Type 1 Reversibility Gate
  if (
    reversibility === "TYPE_1_IRREVERSIBLE" &&
    probabilityOfSuccess < JEV_THRESHOLDS.MIN_SUCCESS_PROB_TYPE1
  ) {
    reasons.push(
      `Irreversible (Type 1) decision has insufficient confidence (${Math.round(
        probabilityOfSuccess * 100
      )}% vs required ${JEV_THRESHOLDS.MIN_SUCCESS_PROB_TYPE1 * 100}%).`
    );
  }

  // Determine Status
  let status: DecisionStatus = "NO_GO";
  let actionRecommendation = "";

  if (
    risk.securityRisk !== "CRITICAL" &&
    justifiedExpectedValue > 0 &&
    riskAdjustedRoi >= JEV_THRESHOLDS.MINIMUM_ROI_FOR_GO &&
    (reversibility === "TYPE_2_REVERSIBLE" ||
      probabilityOfSuccess >= JEV_THRESHOLDS.MIN_SUCCESS_PROB_TYPE1)
  ) {
    status = "GO";
    actionRecommendation =
      "Approved for immediate development. All financial, reversibility, and risk criteria met.";
    reasons.push(
      `Strong risk-adjusted ROI of ${(riskAdjustedRoi * 100).toFixed(0)}% exceeds the ${
        JEV_THRESHOLDS.MINIMUM_ROI_FOR_GO * 100
      }% threshold.`
    );
  } else if (
    risk.securityRisk !== "CRITICAL" &&
    justifiedExpectedValue > 0 &&
    riskAdjustedRoi >= JEV_THRESHOLDS.MINIMUM_ROI_FOR_SPIKE
  ) {
    status = "CONDITIONAL_SPIKE";
    actionRecommendation =
      "Conditional approval: Execute a timeboxed 2-day technical spike/prototype to raise confidence above 70% before full build.";
    reasons.push(
      `Promising upside (ROI ${(riskAdjustedRoi * 100).toFixed(
        0
      )}%), but confidence score (${Math.round(
        probabilityOfSuccess * 100
      )}%) requires validation.`
    );
  } else {
    status = "NO_GO";
    actionRecommendation =
      "Rejected or shelved. Economics do not justify engineering effort or downside risk.";
    if (justifiedExpectedValue <= 0) {
      reasons.push("Negative Justified Expected Value (JEV <= 0). Value does not outweigh costs and downside.");
    }
    if (riskAdjustedRoi < JEV_THRESHOLDS.MINIMUM_ROI_FOR_SPIKE) {
      reasons.push(
        `ROI of ${(riskAdjustedRoi * 100).toFixed(0)}% is below the minimum viable hurdle rate (${
          JEV_THRESHOLDS.MINIMUM_ROI_FOR_SPIKE * 100
        }%).`
      );
    }
  }

  return {
    proposalId: proposal.id,
    title: proposal.title,
    status,
    metrics: {
      totalCostOfOwnership,
      expectedGrossValue: Math.round(expectedGrossValue),
      expectedRiskPenalty: Math.round(expectedRiskPenalty),
      justifiedExpectedValue: Math.round(justifiedExpectedValue),
      riskAdjustedRoi: Number(riskAdjustedRoi.toFixed(2)),
    },
    reasons,
    requiredGuardrails: proposal.guardrails,
    actionRecommendation,
  };
}
