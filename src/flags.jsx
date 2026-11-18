// Inline SVG flags (3:2). Emoji flags don't render on Windows, so these are drawn by hand.

const svgProps = {
  viewBox: '0 0 30 20',
  className: 'nation-flag',
  'aria-hidden': 'true',
  focusable: 'false',
};

const STRIPE = 20 / 13;

export function UsaFlag() {
  return (
    <svg {...svgProps}>
      <rect width="30" height="20" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={i * STRIPE} width="30" height={STRIPE} fill="#fff" />
      ))}
      <rect width="12" height={STRIPE * 7} fill="#3c3b6e" />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={1 + (i % 6) * 2} cy={1.1 + Math.floor(i / 6) * 2.15} r=".5" fill="#fff" />
      ))}
    </svg>
  );
}

export function CanadaFlag() {
  return (
    <svg {...svgProps}>
      <rect width="30" height="20" fill="#fff" />
      <rect width="7.5" height="20" fill="#d52b1e" />
      <rect x="22.5" width="7.5" height="20" fill="#d52b1e" />
      <path
        transform="translate(15 10.2) scale(.95)"
        fill="#d52b1e"
        d="M0-5 .9-3.3 2-3.8 1.5-1.2 3.3-2.6 3.5-1.6 5-2 4.4-.4 4.9 0 2.6 2.2 3 3.1 .35 2.7 .35 4.8-.35 4.8-.35 2.7-3 3.1-2.6 2.2-4.9 0-4.4-.4-5-2-3.5-1.6-3.3-2.6-1.5-1.2-2-3.8-.9-3.3Z"
      />
    </svg>
  );
}

export function FinlandFlag() {
  return (
    <svg {...svgProps}>
      <rect width="30" height="20" fill="#fff" />
      <rect x="8.3" width="5.4" height="20" fill="#002f6c" />
      <rect y="7.3" width="30" height="5.4" fill="#002f6c" />
    </svg>
  );
}

export function SwedenFlag() {
  return (
    <svg {...svgProps}>
      <rect width="30" height="20" fill="#006aa7" />
      <rect x="9.4" width="4" height="20" fill="#fecc02" />
      <rect y="8" width="30" height="4" fill="#fecc02" />
    </svg>
  );
}
