import { IOS_BUNDLE_ID } from "@/lib/constants";

/**
 * Fichier de vérification des Universal Links iOS.
 *
 * Servi sur `https://bumbeez.fr/.well-known/apple-app-site-association`, sans
 * extension et en `application/json` — d'où un route handler plutôt qu'un
 * fichier statique, que Next servirait en `application/octet-stream`.
 *
 * Apple ne suit PAS les redirections sur ce fichier : il doit répondre 200 en
 * direct sur le domaine exact déclaré dans `associatedDomains` (apex ou www,
 * pas l'un redirigeant vers l'autre).
 *
 * Renvoie 404 tant que `APPLE_TEAM_ID` n'est pas configuré : mieux vaut aucune
 * association qu'une association erronée, qu'iOS mettrait en cache.
 */
export const dynamic = "force-static";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID;
  if (!teamId) {
    return new Response("APPLE_TEAM_ID non configuré", { status: 404 });
  }

  return Response.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: `${teamId}.${IOS_BUNDLE_ID}`,
          // `components` est le format iOS 13+ ; `paths` reste lu par les
          // versions antérieures. On n'ouvre que les fiches offreurs.
          components: [{ "/": "/p/*" }, { "/": "/a/*" }],
          paths: ["/p/*", "/a/*"],
        },
      ],
    },
  });
}
