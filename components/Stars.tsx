/** Étoiles pleines / demi / vides, rendues en SVG pour rester nettes partout. */
export function Stars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Note de ${rating.toFixed(1)} sur 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="var(--primary)" />
                <stop offset={`${fill * 100}%`} stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
              fill={`url(#star-${i}-${Math.round(fill * 100)})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
