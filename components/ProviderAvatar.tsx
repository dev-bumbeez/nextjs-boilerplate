/**
 * Photo de profil, avec repli sur les initiales.
 *
 * `<img>` volontairement brut plutôt que `next/image` : les URLs viennent de
 * Firebase Storage (domaine externe), et l'optimiseur d'images imposerait une
 * configuration `remotePatterns` pour un gain nul sur une image déjà
 * redimensionnée à 1080px et servie par un CDN.
 */
export function ProviderAvatar({
  src,
  nickname,
  size = 96,
}: {
  src: string | null;
  nickname: string | null;
  size?: number;
}) {
  const initials = (nickname ?? "?")
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-bold text-[var(--foreground)]"
        style={{ width: size, height: size, fontSize: size / 2.8 }}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={nickname ? `Photo de ${nickname}` : "Photo de profil"}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
