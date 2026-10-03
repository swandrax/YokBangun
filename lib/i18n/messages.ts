import en from "@/messages/en";
import id, { type Messages } from "@/messages/id";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Messages> = { id, en };

/**
 * Server-side access to the local dictionaries. Client components never import
 * the full dictionary; they receive the slice they need as props.
 */
export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type { Messages };
