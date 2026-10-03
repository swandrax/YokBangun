/**
 * CLI utility to evaluate real feature proposals through the JEV Decision Engine.
 * Run with: npx tsx scripts/jev-decision.ts
 */

import { evaluateJevDecision, type FeatureProposal } from "../lib/decision/jev";

const SAMPLE_PROPOSALS: FeatureProposal[] = [
  {
    id: "FEAT-001",
    title: "Client Portal & Real-time Maintenance SLA Status Dashboard",
    type: "FEATURE",
    reversibility: "TYPE_2_REVERSIBLE",
    financials: {
      estimatedRevenueGain: 120_000_000, // IDR 120M / year (new maintenance retainer conversions)
      estimatedCostSaving: 30_000_000,  // IDR 30M / year (reduced client support WhatsApp back-and-forth)
      developmentCost: 25_000_000,      // IDR 25M (2 sprints engineering)
      operationalCostAnnual: 5_000_000, // IDR 5M (hosting & monitoring)
    },
    probabilityOfSuccess: 0.85,
    risk: {
      downsideCost: 10_000_000,
      securityRisk: "LOW",
      maintenanceBurden: "LOW",
    },
    guardrails: [
      "Light theme design system compliance",
      "PWA offline caching for client tickets",
      "Role-based access token authentication",
    ],
  },
  {
    id: "AI-002",
    title: "Autonomous AI Client Support Agent (No Human In The Loop)",
    type: "AI_INTEGRATION",
    reversibility: "TYPE_1_IRREVERSIBLE",
    financials: {
      estimatedRevenueGain: 40_000_000,
      estimatedCostSaving: 15_000_000,
      developmentCost: 35_000_000,
      operationalCostAnnual: 20_000_000, // High token API bills
    },
    probabilityOfSuccess: 0.40, // High hallucination rate, untrusted
    risk: {
      downsideCost: 80_000_000, // Loss of high-ticket enterprise client due to false promises
      securityRisk: "HIGH",
      maintenanceBurden: "HIGH",
    },
    guardrails: [
      "STRICT HUMAN ESCALATION PATH",
      "Grounded RAG with verified company docs only",
      "Token cost quota breaker ($50/month ceiling)",
    ],
  },
];

console.log("================================================================================");
console.log("               yokBangun — JEV (Justified Expected Value) Decision Layer         ");
console.log("================================================================================\n");

for (const proposal of SAMPLE_PROPOSALS) {
  const result = evaluateJevDecision(proposal);
  console.log(`[${result.status}] Proposal: ${result.proposalId} - ${result.title}`);
  console.log(`  Expected Gross Value : IDR ${result.metrics.expectedGrossValue.toLocaleString()}`);
  console.log(`  Total Cost (TCO)     : IDR ${result.metrics.totalCostOfOwnership.toLocaleString()}`);
  console.log(`  Justified Value (JEV): IDR ${result.metrics.justifiedExpectedValue.toLocaleString()}`);
  console.log(`  Risk-Adjusted ROI    : ${(result.metrics.riskAdjustedRoi * 100).toFixed(0)}%`);
  console.log(`  Recommendation       : ${result.actionRecommendation}`);
  console.log(`  Reasons:`);
  result.reasons.forEach((r) => console.log(`    - ${r}`));
  console.log(`  Required Guardrails:`);
  result.requiredGuardrails.forEach((g) => console.log(`    * [GUARDRAIL] ${g}`));
  console.log("--------------------------------------------------------------------------------\n");
}
