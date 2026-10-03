"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Icon } from "@/components/ui/Icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt({ locale }: { locale: Locale }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("pwa_prompt_dismissed")) {
      return;
    }
    // Already opened as the installed app: nothing to offer.
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    ) {
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after user is comfortable on the page (5s)
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!showPrompt || !deferredPrompt) return null;

  const handleInstall = async () => {
    setShowPrompt(false);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_prompt_dismissed", "true");
    }
  };

  return (
    <aside
      aria-label={locale === "id" ? "Pasang aplikasi yokBangun" : "Install yokBangun app"}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 p-4 bg-white border border-neutral-200 rounded-xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#1F5D45] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          yB
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 leading-tight">
            {locale === "id" ? "Pasang Aplikasi yokBangun" : "Install yokBangun App"}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {locale === "id"
              ? "Akses lebih cepat & offline di perangkat Anda"
              : "Faster access & offline support on your device"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={handleInstall}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1F5D45] text-white hover:bg-[#143F2F] transition-colors"
        >
          {locale === "id" ? "Pasang" : "Install"}
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md transition-colors"
          aria-label={locale === "id" ? "Tutup" : "Dismiss"}
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </aside>
  );
}
