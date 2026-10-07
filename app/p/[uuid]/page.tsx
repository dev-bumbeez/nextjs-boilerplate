import type { Metadata } from "next";
import { getProviderCard } from "@/lib/api";
import {
  formatList,
  formatMemberSince,
  formatPrice,
  formatRating,
} from "@/lib/format";
import { APPLE_APP_ID, APP_SCHEME } from "@/lib/constants";
import { ProviderAvatar } from "@/components/ProviderAvatar";
import { Stars } from "@/components/Stars";
import { StoreButtons } from "@/components/StoreButtons";
import { OpenInAppButton } from "@/components/OpenInAppButton";
import { notFound } from "next/navigation";

// Doit rester un littéral : Next analyse statiquement les exports de segment.
// Tenu en phase avec CARD_REVALIDATE_SECONDS (lib/api.ts).
export const revalidate = 300;

type Props = { params: Promise<{ uuid: string }> };

/** Résumé d'une ligne, réutilisé par les métadonnées et l'aperçu social. */
function summarize(card: {
  avgRating: number;
  reviewCount: number;
  priceFrom: number | null;
  zone: { city: string | null; radiusKm: number | null };
}): string {
  const parts: string[] = [];
  if (card.reviewCount > 0) {
    parts.push(
      `${formatRating(card.avgRating)} ★ (${card.reviewCount} avis)`,
    );
  }
  if (card.priceFrom != null) parts.push(`dès ${formatPrice(card.priceFrom)}/h`);
  if (card.zone.city) parts.push(card.zone.city);
  return parts.join(" · ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  const card = await getProviderCard(uuid);

  if (!card) {
    return { title: "Fiche introuvable — Bumbeez", robots: { index: false } };
  }

  // Catégories et non sous-catégories : un aperçu WhatsApp tronque vite, et
  // « Ménage et Jardinage » se lit mieux que la liste des prestations.
  const services = formatList(card.services.map((s) => s.categoryLabel));
  const title = card.zone.city
    ? `${card.nickname} — ${services || "Bumbeez"} à ${card.zone.city}`
    : `${card.nickname} — Bumbeez`;
  const description = summarize(card) || "Prestataire de services sur Bumbeez.";

  return {
    title,
    description,
    // Décision produit : les fiches sont partagées de la main à la main, pas
    // indexées. L'ouverture au référencement est un arbitrage RGPD distinct.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "profile", locale: "fr_FR" },
    twitter: { card: "summary_large_image", title, description },
    other: {
      // Smart App Banner iOS : bandeau natif « OUVRIR » dans Safari, qui
      // court-circuite le bouton ci-dessous quand l'app est installée.
      "apple-itunes-app": `app-id=${APPLE_APP_ID}, app-argument=${APP_SCHEME}://p/${uuid}`,
    },
  };
}

export default async function ProviderCardPage({ params }: Props) {
  const { uuid } = await params;
  const card = await getProviderCard(uuid);
  if (!card) notFound();

  const hasServices = card.services.length > 0;
  const firstService = card.services[0];

  const requestPath = firstService
    ? `p/${uuid}?action=request&category=${firstService.categorySlug}&subCategory=${firstService.subCategorySlug}`
    : `p/${uuid}?action=request`;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* En-tête */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <ProviderAvatar src={card.profilePicture} nickname={card.nickname} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-extrabold">
              {card.nickname ?? "Offreur Bumbeez"}
            </h1>

            {card.reviewCount > 0 ? (
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Stars rating={card.avgRating} />
                <span className="font-semibold text-[var(--foreground)]">
                  {formatRating(card.avgRating)}
                </span>
                <span>
                  ({card.reviewCount} avis
                  {card.completedJobs > 0
                    ? ` · ${card.completedJobs} mission${card.completedJobs > 1 ? "s" : ""}`
                    : ""}
                  )
                </span>
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500">Nouveau sur Bumbeez</p>
            )}

            <p className="mt-1 text-sm text-gray-500">
              Membre depuis {formatMemberSince(card.memberSince)}
            </p>

            {card.verified && (
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                ✓ Profil vérifié
              </span>
            )}
          </div>
        </div>

        {/* Tarif / zone / disponibilités */}
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 text-sm">
          {card.priceFrom != null && (
            <div>
              <dt className="text-gray-500">Tarif indicatif</dt>
              <dd className="mt-0.5 font-semibold">
                dès {formatPrice(card.priceFrom)}/h
              </dd>
            </div>
          )}
          {(card.zone.city || card.zone.radiusKm) && (
            <div>
              <dt className="text-gray-500">Zone d&apos;intervention</dt>
              <dd className="mt-0.5 font-semibold">
                {card.zone.city ?? "Non précisée"}
                {card.zone.radiusKm ? ` · ${card.zone.radiusKm} km` : ""}
              </dd>
            </div>
          )}
          {card.availabilityNote && (
            <div className="col-span-2">
              <dt className="text-gray-500">Disponibilités</dt>
              <dd className="mt-0.5 font-semibold">{card.availabilityNote}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Services */}
      <section className="mt-6">
        <h2 className="text-lg font-bold">Services proposés</h2>
        {hasServices ? (
          <ul className="mt-3 space-y-2">
            {card.services.map((s) => (
              <li
                key={s.uuid}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{s.subCategoryLabel}</p>
                  <p className="text-xs text-gray-500">{s.categoryLabel}</p>
                </div>
                <span className="shrink-0 pl-3 text-sm font-semibold">
                  {formatPrice(s.pricePerHour)}/h
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
            Aucune offre active pour le moment.
          </p>
        )}
      </section>

      {/* Avis */}
      {card.reviews.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold">Avis récents</h2>
          <ul className="mt-3 space-y-3">
            {card.reviews.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-gray-100 bg-white px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold">
                    {r.author?.nickname ?? "Utilisateur Bumbeez"}
                  </span>
                  {r.rating != null && <Stars rating={r.rating} size={14} />}
                </div>
                {r.comment && (
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                    {r.comment}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Actions */}
      <section className="mt-8 rounded-3xl bg-gray-900 px-6 py-8 text-center text-white">
        <h2 className="text-xl font-bold">
          Contactez {card.nickname ?? "cet offreur"} sur Bumbeez
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-300">
          Paiement sécurisé, prestataires assurés. L&apos;inscription est
          gratuite.
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <OpenInAppButton path={`p/${uuid}`} label="Voir le profil complet" />
          <OpenInAppButton
            path={`p/${uuid}?action=contact`}
            label="Contacter"
            variant="secondary"
          />
          <OpenInAppButton
            path={requestPath}
            label="Publier une demande"
            variant="secondary"
          />
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Pas encore l&apos;application ?
        </p>
        <StoreButtons className="mt-3" />
      </section>
    </div>
  );
}
