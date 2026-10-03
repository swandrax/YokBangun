import { postJson } from "@/lib/api/http";
import type { ContactInput, PartnershipInput } from "./schema";

export type SubmitResponse = { ok: true };

export function submitContact(input: ContactInput) {
  return postJson<SubmitResponse>("/api/contact", input);
}

export function submitPartnership(input: PartnershipInput) {
  return postJson<SubmitResponse>("/api/partnership", input);
}
