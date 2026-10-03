import { describe, it, expect } from "vitest";
import { evaluateJevDecision, type FeatureProposal } from "@/lib/decision/jev";

describe("Decision Layer (JEV & ROI Gate)", () => {
  it("approves proposals with strong ROI and high confidence (GO)", () => {
    const proposal: FeatureProposal = {
      id: "TEST-01",
      title: "Self-service Client Invoice & Retainer Dashboard",
      type: "FEATURE",
      reversibility: "TYPE_2_REVERSIBLE",
      financials: {
        estimatedRevenueGain: 100_000_000,
        estimatedCostSaving: 20_000_000,
        developmentCost: 20_000_000,
        operationalCostAnnual: 5_000_000,
      },
      probabilityOfSuccess: 0.9,
      risk: {
        downsideCost: 5_000_000,
        securityRisk: "LOW",
        maintenanceBurden: "LOW",
      },
      guardrails: ["Light theme compliance", "Type safety"],
    };

    const evaluation = evaluateJevDecision(proposal);
    expect(evaluation.status).toBe("GO");
    expect(evaluation.metrics.riskAdjustedRoi).toBeGreaterThan(2.5);
    expect(evaluation.metrics.justifiedExpectedValue).toBeGreaterThan(0);
  });

  it("triggers CONDITIONAL_SPIKE when upside is promising but confidence is uncertain", () => {
    const proposal: FeatureProposal = {
      id: "TEST-02",
      title: "Experimental Vector Search for Portfolio Case Studies",
      type: "AI_INTEGRATION",
      reversibility: "TYPE_2_REVERSIBLE",
      financials: {
        estimatedRevenueGain: 70_000_000,
        estimatedCostSaving: 10_000_000,
        developmentCost: 15_000_000,
        operationalCostAnnual: 5_000_000,
      },
      probabilityOfSuccess: 0.55, // Between 0.40 and 0.65
      risk: {
        downsideCost: 10_000_000,
        securityRisk: "LOW",
        maintenanceBurden: "MEDIUM",
      },
      guardrails: ["Offline fallback"],
    };

    const evaluation = evaluateJevDecision(proposal);
    expect(evaluation.status).toBe("CONDITIONAL_SPIKE");
    expect(evaluation.actionRecommendation).toContain("spike");
  });

  it("strictly rejects high-downside, negative-value initiatives (NO_GO)", () => {
    const proposal: FeatureProposal = {
      id: "TEST-03",
      title: "Overengineered Blockchain Verification for Contacts",
      type: "FEATURE",
      reversibility: "TYPE_1_IRREVERSIBLE",
      financials: {
        estimatedRevenueGain: 5_000_000,
        estimatedCostSaving: 0,
        developmentCost: 50_000_000,
        operationalCostAnnual: 25_000_000,
      },
      probabilityOfSuccess: 0.2,
      risk: {
        downsideCost: 40_000_000,
        securityRisk: "HIGH",
        maintenanceBurden: "HIGH",
      },
      guardrails: [],
    };

    const evaluation = evaluateJevDecision(proposal);
    expect(evaluation.status).toBe("NO_GO");
    expect(evaluation.metrics.justifiedExpectedValue).toBeLessThan(0);
  });
});
