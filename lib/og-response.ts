import sharp from "sharp";

/**
 * Réencode un aperçu social en JPEG.
 *
 * `ImageResponse` ne sait produire que du PNG. Sur une composition contenant
 * une photo, ça donne ~900 Ko — très au-dessus de ce que WhatsApp accepte pour
 * afficher un aperçu (quelques centaines de Ko), donc un lien qui s'affiche nu
 * dans la conversation, c'est-à-dire l'échec de la feature.
 *
 * Mesuré sur une vraie fiche annonce avec photo : PNG brut 883 Ko, PNG
 * palettisé 128 couleurs 87 Ko mais photo visiblement postérisée, JPEG q82
 * 98 Ko sans dégradation perceptible. Sans photo : 158 Ko -> 38 Ko.
 *
 * Le JPEG est donc appliqué dans tous les cas : un seul format, un seul
 * `contentType` déclaré, et les deux compositions restent largement sous le
 * budget.
 */
export async function toJpegResponse(image: Response): Promise<Response> {
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png)
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "content-type": "image/jpeg",
      // Les aperçus sont régénérés par la revalidation de la fiche elle-même.
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
