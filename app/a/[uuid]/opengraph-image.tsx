import { ImageResponse } from "next/og";
import { toJpegResponse } from "@/lib/og-response";
import { getAdCard } from "@/lib/api";
import { formatPrice, truncate } from "@/lib/format";
import { loadImageForOg } from "@/lib/og-image";

export const alt = "Annonce Bumbeez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const YELLOW = "#FFC300";
const DARK = "#1F2937";

/**
 * Aperçu social de l'annonce.
 *
 * Deux compositions selon qu'une photo existe : avec photo, elle occupe la
 * moitié gauche et le texte la droite ; sans photo, le texte prend toute la
 * largeur sur fond clair. Dans les deux cas, peu de mots et de gros corps :
 * l'image est rendue en vignette dans un fil de discussion.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const ad = await getAdCard(uuid);

  if (!ad) {
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

  // Conversion préalable : satori ne décode pas le webp produit par l'API.
  // `null` si l'image est illisible, et la composition repasse en une colonne.
  const photo = await loadImageForOg(ad.image, { width: 480, height: 630 });

  const isOffer = ad.adType === "offer";
  const meta = [ad.city, `${formatPrice(ad.pricePerHour)}/h`]
    .filter(Boolean)
    .join("   ·   ");

  const textBlock = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        padding: 64,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: isOffer ? YELLOW : DARK,
              color: isOffer ? DARK : "#fff",
              fontSize: 28,
              fontWeight: 800,
              padding: "10px 24px",
              borderRadius: 999,
            }}
          >
            {isOffer ? "Offre" : "Demande"}
          </div>
          <div style={{ fontSize: 28, color: "#64748B", fontWeight: 600 }}>
            {ad.categoryLabel}
          </div>
          {ad.urgent && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#B91C1C",
                fontSize: 26,
                fontWeight: 800,
                padding: "10px 22px",
                borderRadius: 999,
              }}
            >
              Urgent
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: photo ? 58 : 72,
            fontWeight: 800,
            color: DARK,
            lineHeight: 1.15,
          }}
        >
          {truncate(ad.title, 60)}
        </div>

        <div
          style={{
            fontSize: photo ? 30 : 36,
            color: "#475569",
            lineHeight: 1.35,
          }}
        >
          {truncate(ad.description, photo ? 110 : 180)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `8px solid ${YELLOW}`,
          paddingTop: 28,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: DARK }}>{meta}</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#94A3B8" }}>
          bumbeez.fr
        </div>
      </div>
    </div>
  );

  return toJpegResponse(
    new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFFFFF",
        }}
      >
        {photo && (
          <img
            src={photo}
            alt=""
            width={480}
            height={630}
            style={{ width: 480, height: 630, objectFit: "cover" }}
          />
        )}
        {textBlock}
      </div>,
      { ...size },
    ),
  );
}
