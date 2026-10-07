/** Formate un tarif horaire à la française : « 18 € » ou « 17,50 € ». */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Note arrondie au dixième, séparateur décimal français. */
export function formatRating(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/** « Membre depuis mars 2025 ». */
export function formatMemberSince(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Liste lisible sans doublons : « Ménage, Repassage et Jardinage ». */
export function formatList(items: string[]): string {
  const unique = [...new Set(items)];
  return new Intl.ListFormat("fr-FR", {
    style: "long",
    type: "conjunction",
  }).format(unique);
}

/** « jeudi 2 octobre à 14:00 », ou sans heure si minuit. */
export function formatInterventionDate(iso: string): string {
  const date = new Date(iso);
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(hasTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(date);
}

/** Tronque sur une frontière de mot, pour les aperçus. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`;
}
