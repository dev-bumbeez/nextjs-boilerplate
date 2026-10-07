import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdCard, type AdCard } from "@/lib/api";
import {
  formatInterventionDate,
  formatPrice,
  formatRating,
  truncate,
} from "@/lib/format";
import { APPLE_APP_ID, APP_SCHEME } from "@/lib/constants";
import { ProviderAvatar } from "@/components/ProviderAvatar";
import { Stars } from "@/components/Stars";
import { StoreButtons } from "@/components/StoreButtons";
import { OpenInAppButton } from "@/components/OpenInAppButton";

// Doit rester un littéral : Next analyse statiquement les exports de segment.
// Tenu en phase avec CARD_REVALIDATE_SECONDS (lib/api.ts).
export const revalidate = 300;

type Props = { params: Promise<{ uuid: string }> };

/** « Offre » / « Demande », tels qu'affichés dans l'app. */
function typeLabel(adType: AdCard["adType"]): string {
  return adType === "offer" ? "Offre" : "Demande";
}

function summarize(ad: AdCard): string {
  const parts = [typeLabel(ad.adType), ad.categoryLabel];
  if (ad.city) parts.push(ad.city);
  parts.push(`${formatPrice(ad.pricePerHour)}/h`);
  return parts.join(" · ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  const ad = await getAdCard(uuid);

  if (!ad) {
    return { title: "Annonce introuvable — Bumbeez", robots: { index: false } };
  }

  const title = ad.city
    ? `${ad.title} à ${ad.city} — Bumbeez`
    : `${ad.title} — Bumbeez`;
  const description = truncate(ad.description, 150) || summarize(ad);

  return {
    title,
    description,
    // Même arbitrage que les fiches offreurs : partage de la main à la main,
    // pas d'indexation. Une annonce porte un besoin et une localisation.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "article", locale: "fr_FR" },
    twitter: { card: "summary_large_image", title, description },
    other: {
      "apple-itunes-app": `app-id=${APPLE_APP_ID}, app-argument=${APP_SCHEME}://a/${uuid}`,
    },
  };
}

export default async function AdCardPage({ params }: Props) {
  const { uuid } = await params;
  const ad = await getAdCard(uuid);
  if (!ad) notFound();

  const isOffer = ad.adType === "offer";

  // L'action proposée dépend du sens de l'annonce : on répond à une demande en
  // proposant ses services, on répond à une offre en réservant.
  const primaryLabel = isOffer ? "Réserver" : "Proposer mes services";
  const primaryPath = `a/${uuid}?action=${isOffer ? "book" : "offer"}`;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {!ad.available && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          Cette annonce n&apos;est plus disponible. Découvrez les autres
          services près de chez vous sur Bumbeez.
        </div>
      )}

      <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        {ad.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ad.image}
            alt={ad.title}
            className="h-56 w-full object-cover sm:h-72"
          />
        )}

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                isOffer
                  ? "bg-[var(--primary)] text-[var(--foreground)]"
                  : "bg-gray-900 text-white"
              }`}
            >
              {typeLabel(ad.adType)}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
              {ad.categoryLabel}
            </span>
            {ad.urgent && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                Urgent
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-extrabold">{ad.title}</h1>

          <p className="mt-3 leading-relaxed whitespace-pre-line text-gray-700">
            {truncate(ad.description, 500)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 text-sm">
            <div>
              <dt className="text-gray-500">
                {isOffer ? "Tarif" : "Budget indicatif"}
              </dt>
              <dd className="mt-0.5 font-semibold">
                {formatPrice(ad.pricePerHour)}/h
              </dd>
            </div>
            {ad.city && (
              <div>
                <dt className="text-gray-500">Localisation</dt>
                <dd className="mt-0.5 font-semibold">{ad.city}</dd>
              </div>
            )}
            {ad.interventionDate && (
              <div className="col-span-2">
                <dt className="text-gray-500">Date souhaitée</dt>
                <dd className="mt-0.5 font-semibold first-letter:uppercase">
                  {formatInterventionDate(ad.interventionDate)}
                </dd>
              </div>
            )}
            {ad.estimatedDurationHours && (
              <div>
                <dt className="text-gray-500">Durée estimée</dt>
                <dd className="mt-0.5 font-semibold">
                  {ad.estimatedDurationHours} h
                </dd>
              </div>
            )}
          </dl>

          {/* Auteur */}
          <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
            <ProviderAvatar
              src={ad.author.profilePicture}
              nickname={ad.author.nickname}
              size={44}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {ad.author.nickname ?? "Utilisateur Bumbeez"}
              </p>
              {ad.author.reviewCount > 0 ? (
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                  <Stars rating={ad.author.avgRating} size={12} />
                  <span>
                    {formatRating(ad.author.avgRating)} ({ad.author.reviewCount}{" "}
                    avis)
                  </span>
                </div>
              ) : (
                <p className="mt-0.5 text-xs text-gray-500">
                  Nouveau sur Bumbeez
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Actions */}
      <section className="mt-8 rounded-3xl bg-gray-900 px-6 py-8 text-center text-white">
        <h2 className="text-xl font-bold">
          {ad.available
            ? "Répondez à cette annonce sur Bumbeez"
            : "Trouvez un service près de chez vous"}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-300">
          Paiement sécurisé, prestataires assurés. L&apos;inscription est
          gratuite.
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <OpenInAppButton
            path={`a/${uuid}`}
            label="Voir l'annonce complète"
          />
          {ad.available && (
            <OpenInAppButton
              path={primaryPath}
              label={primaryLabel}
              variant="secondary"
            />
          )}
          {ad.author.uuid && (
            <OpenInAppButton
              path={`p/${ad.author.uuid}`}
              label="Voir le profil"
              variant="secondary"
            />
          )}
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Pas encore l&apos;application ?
        </p>
        <StoreButtons className="mt-3" />
      </section>
    </div>
  );
}
