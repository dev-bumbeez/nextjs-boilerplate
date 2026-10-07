import Link from "next/link";
import { StoreButtons } from "@/components/StoreButtons";

export default function AdCardNotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <h1 className="text-2xl font-extrabold">Annonce introuvable</h1>
      <p className="mt-3 text-gray-600">
        Cette annonce n&apos;existe pas ou a été retirée par son auteur.
      </p>
      <p className="mt-8 text-sm text-gray-500">
        Découvrez les services près de chez vous sur Bumbeez.
      </p>
      <StoreButtons className="mt-4" />
      <Link
        href="/"
        className="mt-8 inline-block text-sm underline underline-offset-4 hover:opacity-70"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
