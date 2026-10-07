import { ANDROID_PACKAGE } from "@/lib/constants";

/**
 * Fichier de vérification des App Links Android (Digital Asset Links).
 *
 * L'empreinte attendue est celle de la clé de signature **Play App Signing**,
 * pas celle de la clé d'upload — c'est l'erreur classique, et elle échoue
 * silencieusement. Elle se récupère via :
 *   `eas credentials` → Android → production → Keystore
 * ou dans la Play Console → Configuration → Intégrité de l'app → signature.
 *
 * Renvoie 404 tant que l'empreinte n'est pas configurée.
 */
export const dynamic = "force-static";

export function GET() {
  const fingerprint = process.env.ANDROID_CERT_SHA256;
  if (!fingerprint) {
    return new Response("ANDROID_CERT_SHA256 non configuré", { status: 404 });
  }

  return Response.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE,
        sha256_cert_fingerprints: [fingerprint],
      },
    },
  ]);
}
