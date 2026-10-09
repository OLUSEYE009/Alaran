type LogoMarkProps = {
  /** Tailwind sizing, e.g. "h-9 w-9" */
  className?: string;
  /** Each instance on the page needs a unique prefix so gradient ids don't collide */
  idPrefix?: string;
};

/**
 * The A+ Graphics brand mark — inlined as SVG so it renders even when the
 * site is served as a single HTML file (no external /logo.svg request).
 * If you ever update the artwork, edit the paths below.
 */
export function LogoMark({ className = "h-9 w-9", idPrefix = "ap" }: LogoMarkProps) {
  const gradA = `${idPrefix}-grad-a`;
  const gradB = `${idPrefix}-grad-b`;

  return (
    <svg
      viewBox="0 0 6804.22 6553.01"
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradA} gradientUnits="userSpaceOnUse" x1="5258.89" y1="4052.36" x2="7816.28" y2="7223.54">
          <stop offset="0" stopColor="#002F88" />
          <stop offset="0.588235" stopColor="#7F97C3" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={gradB} gradientUnits="userSpaceOnUse" x1="1610.33" y1="4938.93" x2="-708.38" y2="7087.14">
          <stop offset="0" stopColor="#002F88" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <circle fill="#F6C438" cx="2161.96" cy="3074.49" r="784.1" />
      <path
        fill={`url(#${gradA})`}
        d="M2083.02 1617.95c1013.72,56.41 1179.65,462.84 1562.78,1222.7l1637.63 3236.37c376.16,738.21 1105.01,480.41 1312.81,142.78 273.79,-444.85 101.29,-675.4 -84.97,-1060.7 -586.79,-1213.89 -1322.29,-2509.06 -1881.2,-3690.24 -296.18,-625.92 -892.38,-2064.5 -1817.58,-1199 -142.56,133.35 -173.74,219.47 -278.96,416.93 -65.39,122.73 -473.93,849.17 -450.52,931.15z"
      />
      <path
        fill={`url(#${gradB})`}
        d="M2768.47 4078.41c-1071.15,123.59 -3357.99,853.25 -2626.99,2111.78 232.36,400.06 1072.54,685.7 1424.79,-357.48 301.2,-891.99 1175.6,-197.15 1876.69,-346.88 833.32,-177.96 950.02,-1594.86 -674.5,-1407.43z"
      />
      <path
        fill="#FDD040"
        d="M5846.55 1370.11l-628.47 0.08 0.15 315.5c105.54,9.09 151.67,-3.9 255.04,29.82 207.98,67.84 384.44,298.39 375.36,477.99 14.49,29.41 6.37,88.34 6.37,125.39 53.04,2.05 275.63,6.57 314.37,-2.78l-0.21 -629.16 634.28 -0.09 0.78 -316.68c-205.44,-0.25 -276.52,-14.26 -427.44,-123.2 -151.56,-109.4 -220.83,-315.13 -206.81,-506.63l-315.27 -2.7c0.03,60.25 11.89,622.41 -8.15,632.47z"
      />
    </svg>
  );
}

type LogoProps = LogoMarkProps & {
  /** Show the "graphics." wordmark next to the mark */
  withWordmark?: boolean;
  /** Tailwind classes for the wordmark text */
  wordmarkClassName?: string;
};

export default function Logo({
  className,
  idPrefix,
  withWordmark = false,
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={className} idPrefix={idPrefix} />
      {withWordmark && (
        <span className={`font-grotesk font-bold tracking-[-0.075em] ${wordmarkClassName}`}>
          graphics<span className="text-gold-500">.</span>
        </span>
      )}
    </span>
  );
}
