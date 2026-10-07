"use client";

import { useCallback, useRef } from "react";
import { APP_SCHEME, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

type Variant = "primary" | "secondary";

const STYLES: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary-dark)]",
  secondary:
    "border border-gray-200 bg-white text-[var(--foreground)] hover:bg-gray-50",
};

function storeUrl(): string {
  if (typeof navigator === "undefined") return APP_STORE_URL;
  return /android/i.test(navigator.userAgent) ? PLAY_STORE_URL : APP_STORE_URL;
}

/**
 * Ouvre l'app sur une destination précise, ou renvoie vers le store.
 *
 * Tant que les Universal Links / App Links ne sont pas déployés, un lien
 * `https://` partagé n'ouvre jamais l'app directement. En revanche, un scheme
 * custom déclenché par un *geste utilisateur* sur une page web, lui, fonctionne
 * — c'est ce que fait ce bouton. Si rien ne se passe au bout d'un court délai,
 * c'est que l'app n'est pas installée : on bascule vers le store.
 *
 * La bascule est annulée si l'onglet passe en arrière-plan, signe que l'app
 * a bien pris la main — sans quoi l'utilisateur retrouverait le store ouvert
 * derrière son app au retour.
 */
export function OpenInAppButton({
  path,
  label,
  variant = "primary",
}: {
  path: string;
  label: string;
  variant?: Variant;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(() => {
    const cancel = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      document.removeEventListener("visibilitychange", onHide);
    };

    function onHide() {
      if (document.hidden) cancel();
    }

    document.addEventListener("visibilitychange", onHide);
    timer.current = setTimeout(() => {
      cancel();
      window.location.href = storeUrl();
    }, 1500);

    window.location.href = `${APP_SCHEME}://${path}`;
  }, [path]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition-colors sm:w-auto ${STYLES[variant]}`}
    >
      {label}
    </button>
  );
}
