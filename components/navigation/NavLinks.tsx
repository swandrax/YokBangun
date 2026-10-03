"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import type { NavItem } from "@/lib/navigation";

export function isActivePath(current: string, href: string): boolean {
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
}

type Props = {
  locale: Locale;
  items: (NavItem & { label: string })[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

/** Nav links with aria-current="page". Client-only because it reads the pathname. */
export function NavLinks({ locale, items, className, linkClassName, onNavigate }: Props) {
  const current = stripLocale(usePathname() || "/");
  return (
    <ul role="list" className={className}>
      {items.map((item) => (
        <li key={item.key}>
          <Link
            href={localizedPath(locale, item.href)}
            className={linkClassName}
            aria-current={isActivePath(current, item.href) ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
