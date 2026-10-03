/**
 * Shared, dependency-free validation for the contact and partnership forms.
 * Runs in the browser (instant feedback) and in the Route Handler (trust boundary).
 * Error values are message keys (see messages.validation), never raw strings.
 */
export type ValidationCode = "required" | "email" | "whatsapp" | "tooShort" | "tooLong" | "choose";

export const projectStages = ["exploring", "planning", "has-product", "maintenance", "ai", "partner"] as const;
export type ProjectStage = (typeof projectStages)[number];

export const partnershipTypes = ["technology", "business", "community", "institution", "research", "investor"] as const;
export type PartnershipType = (typeof partnershipTypes)[number];

export type ContactInput = {
  name: string;
  organisation: string;
  email: string;
  whatsapp: string;
  sector: string;
  need: string;
  stage: string;
  /** Honeypot. Real users never see or fill it. */
  website?: string;
};

export type PartnershipInput = {
  name: string;
  organisation: string;
  email: string;
  type: string;
  message: string;
  website?: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, ValidationCode>>;
export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors<T> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Indonesian mobile numbers: 08xx / 628xx / +628xx, 9–13 digits after the prefix.
const WHATSAPP_RE = /^(?:\+?62|0)8\d{7,12}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function textField(value: string, { min = 1, max = 200 }: { min?: number; max?: number } = {}): ValidationCode | undefined {
  if (!value) return "required";
  if (value.length < min) return "tooShort";
  if (value.length > max) return "tooLong";
  return undefined;
}

function emailField(value: string): ValidationCode | undefined {
  if (!value) return "required";
  if (value.length > 200 || !EMAIL_RE.test(value)) return "email";
  return undefined;
}

export function normaliseWhatsapp(value: string): string {
  return value.replace(/[\s\-().]/g, "");
}

function compact<T>(errors: FieldErrors<T>): FieldErrors<T> {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => Boolean(v))) as FieldErrors<T>;
}

export function validateContact(raw: unknown): ValidationResult<ContactInput> {
  const input = (raw ?? {}) as Record<string, unknown>;
  const data: ContactInput = {
    name: str(input.name),
    organisation: str(input.organisation),
    email: str(input.email),
    whatsapp: normaliseWhatsapp(str(input.whatsapp)),
    sector: str(input.sector),
    need: str(input.need),
    stage: str(input.stage),
    website: str(input.website),
  };

  const errors = compact<ContactInput>({
    name: textField(data.name, { max: 120 }),
    organisation: textField(data.organisation, { max: 160 }),
    email: emailField(data.email),
    whatsapp: data.whatsapp && !WHATSAPP_RE.test(data.whatsapp) ? "whatsapp" : undefined,
    sector: data.sector ? (data.sector.length > 60 ? "tooLong" : undefined) : "choose",
    need: textField(data.need, { min: 10, max: 3000 }),
    stage: (projectStages as readonly string[]).includes(data.stage) ? undefined : "choose",
  });

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validatePartnership(raw: unknown): ValidationResult<PartnershipInput> {
  const input = (raw ?? {}) as Record<string, unknown>;
  const data: PartnershipInput = {
    name: str(input.name),
    organisation: str(input.organisation),
    email: str(input.email),
    type: str(input.type),
    message: str(input.message),
    website: str(input.website),
  };

  const errors = compact<PartnershipInput>({
    name: textField(data.name, { max: 120 }),
    organisation: textField(data.organisation, { max: 160 }),
    email: emailField(data.email),
    type: (partnershipTypes as readonly string[]).includes(data.type) ? undefined : "choose",
    message: textField(data.message, { min: 10, max: 3000 }),
  });

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
