import { ImageResponse } from "next/og";
import { toJpegResponse } from "@/lib/og-response";
import { getProviderCard } from "@/lib/api";
import { formatList, formatPrice, formatRating } from "@/lib/format";
import { loadImageForOg } from "@/lib/og-image";

export const alt = "Fiche offreur Bumbeez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const YELLOW = "#FFC300";
const DARK = "#1F2937";

/**
 * Aperçu social de la fiche offreur.
 *
 * C'est ce visuel — et non la page — que WhatsApp, iMessage et les réseaux
 * affichent dans la conversation. Il doit donc porter seul l'essentiel :
 * photo, prénom, note, services, tarif, zone. Composition volontairement
 * massive et peu bavarde : l'image est rendue en petit dans un fil de
 * discussion.
 *
 * Aucune police distante n'est chargée : `ImageResponse` retomberait sur un
 * rendu dégradé en cas d'échec réseau, et Bumbeez n'a pas de police de marque.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const card = await getProviderCard(uuid);

  if (!card) {
    return toJpegResponse(
      new ImageResponse(
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: DARK,
            color: "#fff",
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          Bumbeez
        </div>,
        { ...size },
      ),
    );
  }

  // Conversion préalable : satori ne décode pas le webp produit par le
  // StorageService de l'API. `null` si illisible, on retombe sur les initiales.
  const photo = await loadImageForOg(card.profilePicture, {
    width: 220,
    height: 220,
  });

  // Catégories : lisibles en petit dans un fil de discussion.
  const services = formatList(card.services.map((s) => s.categoryLabel));
  const meta = [
    card.priceFrom != null ? `dès ${formatPrice(card.priceFrom)}/h` : null,
    card.zone.city
      ? `${card.zone.city}${card.zone.radiusKm ? ` · ${card.zone.radiusKm} km` : ""}`
      : null,
  ]
    .filter(Boolean)
    .join("   ·   ");

  return toJpegResponse(
    new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: 72,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 40, flex: 1 }}
        >
          {photo ? (
            <img
              src={photo}
              alt=""
              width={220}
              height={220}
              style={{ borderRadius: 110, objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 110,
                background: YELLOW,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 88,
                fontWeight: 800,
                color: DARK,
              }}
            >
              {(card.nickname ?? "?").charAt(0).toUpperCase()}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: DARK }}>
              {card.nickname ?? "Offreur Bumbeez"}
            </div>

            {card.reviewCount > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 40,
                  color: DARK,
                }}
              >
                <svg width="46" height="46" viewBox="0 0 20 20">
                  <path
                    d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
                    fill={YELLOW}
                  />
                </svg>
                <span style={{ fontWeight: 700 }}>
                  {formatRating(card.avgRating)}
                </span>
                <span style={{ color: "#64748B" }}>
                  ({card.reviewCount} avis)
                </span>
              </div>
            )}

            {services && (
              <div
                style={{
                  fontSize: 36,
                  color: "#475569",
                  maxWidth: 720,
                  overflow: "hidden",
                }}
              >
                {services}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `8px solid ${YELLOW}`,
            paddingTop: 36,
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 700, color: DARK }}>
            {meta}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#94A3B8" }}>
            bumbeez.fr
          </div>
        </div>
      </div>,
      { ...size },
    ),
  );
}
