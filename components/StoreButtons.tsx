import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

/**
 * Boutons officiels de téléchargement.
 *
 * Extraits de la page d'accueil pour être réutilisés par les fiches offreurs,
 * qui sont le point d'entrée web de visiteurs n'ayant pas encore l'app.
 */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger Bumbeez sur l'App Store"
        className="inline-block transition-transform hover:scale-105"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/partners/app-store-fr.svg"
          alt="Télécharger dans l'App Store"
          width={170}
          height={54}
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger Bumbeez sur Google Play"
        className="inline-block transition-transform hover:scale-105"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/partners/google-play-fr.png"
          alt="Disponible sur Google Play"
          width={182}
          height={54}
        />
      </a>
    </div>
  );
}
