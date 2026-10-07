import sharp from "sharp";

/**
 * Charge une image distante et la rend consommable par `ImageResponse`.
 *
 * satori, le moteur derrière `ImageResponse`, ne sait décoder ni le webp ni
 * l'avif — or le `StorageService` de l'API réencode **tous** les uploads en
 * webp. Sans cette conversion, aucune photo n'apparaîtrait jamais dans les
 * aperçus sociaux : l'emplacement resterait blanc, et la composition deux
 * colonnes des annonces afficherait une moitié vide.
 *
 * L'image est redimensionnée à sa taille d'affichage avant encodage : elle
 * n'est qu'un ingrédient du rendu final, inutile d'y transporter du 1080px.
 *
 * Renvoie `null` si l'image est injoignable ou illisible, pour que l'appelant
 * retombe sur une composition sans photo plutôt que sur un trou blanc.
 */
export async function loadImageForOg(
  url: string | null,
  size: { width: number; height: number },
): Promise<string | null> {
  if (!url) return null;

  try {
    // Cache aligné sur celui des fiches : une photo d'annonce ne change pas.
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const png = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize(size.width, size.height, { fit: "cover", position: "centre" })
      .png({ compressionLevel: 9 })
      .toBuffer();

    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null;
  }
}
