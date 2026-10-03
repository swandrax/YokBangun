import { getMessages } from "@/lib/i18n/messages";
import { NotFoundContent } from "./NotFoundContent";

/**
 * Server component: passes only the two tiny notFound slices to the client,
 * which picks the language from the URL (not-found receives no params).
 */
export default function LocaleNotFound() {
  return <NotFoundContent copy={{ id: getMessages("id").notFound, en: getMessages("en").notFound }} />;
}
