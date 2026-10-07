"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StoreButtons } from "@/components/StoreButtons";

/**
 * 404 unique du site, adapté au type de ressource demandée.
 *
 * Next 16 ne rend pas les `not-found.tsx` de segment : un `notFound()` levé
 * dans `app/a/[uuid]` remonte jusqu'ici (vérifié sur une reproduction
 * minimale). Le message est donc différencié à partir du chemin plutôt que
 * par des fichiers par segment, qui resteraient lettre morte.
 *
 * Composant client pour accéder à `usePathname()` — c'est la seule façon de
 * savoir ce qui a été demandé, le not-found racine ne recevant aucun param.
 */
export default function NotFound() {
  const pathname = usePathname() ?? "";

  const variant = pathname.startsWith("/a/")
    ? {
        title: "Annonce introuvable",
        body: "Cette annonce n'existe pas ou a été retirée par son auteur.",
        showStores: true,
      }
    : pathname.startsWith("/p/")
      ? {
          title: "Fiche introuvable",
          body: "Cette fiche n'existe pas ou n'est plus partagée par son auteur.",
          showStores: true,
        }
      : {
          title: "Page introuvable",
          body: "Cette page n'existe pas ou a été déplacée.",
          showStores: false,
        };

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <h1 className="text-2xl font-extrabold">{variant.title}</h1>
      <p className="mt-3 text-gray-600">{variant.body}</p>

      {variant.showStores && (
        <>
          <p className="mt-8 text-sm text-gray-500">
            Découvrez les services près de chez vous sur Bumbeez.
          </p>
          <StoreButtons className="mt-4" />
        </>
      )}

      <Link
        href="/"
        className="mt-8 inline-block text-sm underline underline-offset-4 hover:opacity-70"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
