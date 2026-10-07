import { notFound } from "next/navigation";

/**
 * Client de l'API Bumbeez pour les surfaces web publiques.
 *
 * Les fiches offreurs sont rendues côté serveur puis mises en cache (ISR) :
 * une fiche partagée à des centaines de personnes ne déclenche qu'un appel
 * API par fenêtre de revalidation, et reste servie si l'API est momentanément
 * indisponible.
 */
const API_URL = process.env.API_URL;

/** Durée de cache d'une fiche, en secondes. */
export const CARD_REVALIDATE_SECONDS = 300;

export type ProviderCardService = {
  uuid: string;
  categorySlug: string;
  categoryLabel: string;
  subCategorySlug: string;
  subCategoryLabel: string;
  pricePerHour: number;
};

export type ProviderCardReview = {
  id: number;
  rating: number | null;
  comment: string | null;
  date: string;
  author: { nickname: string | null; profilePicture: string | null } | null;
};

export type ProviderCard = {
  uuid: string;
  nickname: string | null;
  profilePicture: string | null;
  memberSince: string;
  verified: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  priceFrom: number | null;
  zone: { city: string | null; radiusKm: number | null };
  availabilityNote: string | null;
  services: ProviderCardService[];
  reviews: ProviderCardReview[];
};

/**
 * Récupère une fiche offreur publique.
 *
 * Renvoie `null` sur 404 (fiche inexistante, compte supprimé, ou partage non
 * activé par l'offreur — l'API ne les distingue pas volontairement, pour ne
 * pas révéler l'existence d'un compte privé). Lève sur les autres erreurs,
 * afin qu'une panne d'API ne se traduise pas par un faux « profil introuvable »
 * indexable.
 */
export async function getProviderCard(
  uuid: string,
): Promise<ProviderCard | null> {
  if (!API_URL) {
    throw new Error(
      "API_URL n'est pas configurée : impossible de rendre une fiche offreur.",
    );
  }

  const res = await fetch(
    `${API_URL}/users/${encodeURIComponent(uuid)}/card`,
    { next: { revalidate: CARD_REVALIDATE_SECONDS } },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API ${res.status} sur la fiche ${uuid}`);
  }

  return (await res.json()) as ProviderCard;
}

/** Variante qui déclenche directement la page 404 de Next. */
export async function getProviderCardOrNotFound(
  uuid: string,
): Promise<ProviderCard> {
  const card = await getProviderCard(uuid);
  if (!card) notFound();
  return card;
}

export type AdCard = {
  uuid: string;
  adType: "offer" | "request";
  title: string;
  categorySlug: string;
  categoryLabel: string;
  subCategorySlug: string;
  subCategoryLabel: string;
  description: string;
  image: string | null;
  city: string | null;
  interventionDate: string | null;
  estimatedDurationHours: number | null;
  pricePerHour: number;
  urgent: boolean;
  available: boolean;
  createdAt: string;
  author: {
    uuid: string | null;
    nickname: string | null;
    profilePicture: string | null;
    avgRating: number;
    reviewCount: number;
  };
};

/**
 * Récupère la fiche publique d'une annonce.
 *
 * Même contrat que `getProviderCard` : `null` sur 404 (annonce inexistante,
 * archivée, suspendue, ou réservation privée), exception sur le reste pour
 * qu'une panne d'API ne se traduise pas par un faux « introuvable ».
 */
export async function getAdCard(uuid: string): Promise<AdCard | null> {
  if (!API_URL) {
    throw new Error(
      "API_URL n'est pas configurée : impossible de rendre une fiche annonce.",
    );
  }

  const res = await fetch(
    `${API_URL}/classified-ads/${encodeURIComponent(uuid)}/card`,
    { next: { revalidate: CARD_REVALIDATE_SECONDS } },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API ${res.status} sur l'annonce ${uuid}`);
  }

  return (await res.json()) as AdCard;
}
