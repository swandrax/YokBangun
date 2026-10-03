"use client";

import { useEffect, useRef, useState } from "react";
import ClipboardJS from "clipboard";
import { Icon } from "@/components/ui/Icon";

export interface CopyButtonProps {
  text: string;
  label?: string;
  successLabel?: string;
  className?: string;
  size?: "sm" | "md";
  showText?: boolean;
}

export function CopyButton({
  text,
  label = "Salin",
  successLabel = "Tersalin!",
  className = "",
  size = "sm",
  showText = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const clipboard = new ClipboardJS(btnRef.current, {
      text: () => text,
    });

    clipboard.on("success", () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    clipboard.on("error", () => {
      // Fallback
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    });

    return () => {
      clipboard.destroy();
    };
  }, [text]);

  const sizeClasses =
    size === "sm" ? "py-1 px-2.5 text-xs gap-1.5" : "py-1.5 px-3 text-sm gap-2";

  return (
    <button
      ref={btnRef}
      type="button"
      className={`inline-flex items-center justify-center font-medium rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1F5D45]/20 transition-all duration-150 active:scale-[0.98] ${sizeClasses} ${className}`}
      aria-label={`${label}: ${text}`}
      title={label}
    >
      {copied ? (
        <>
          <Icon name="check" size={size === "sm" ? 14 : 16} className="text-[#1F5D45]" />
          {showText && <span className="text-[#1F5D45] font-semibold">{successLabel}</span>}
        </>
      ) : (
        <>
          <Icon name="copy" size={size === "sm" ? 14 : 16} className="text-neutral-500" />
          {showText && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
