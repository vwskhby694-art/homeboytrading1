// Temporary typographic mark until official NexaAI brand assets are supplied.
// The lime diagonal echoes the "boundary line" used throughout the site.
export function WordmarkMark({ size = 34 }: { size?: number }) {
  return (
    <svg className="wordmark-mark" width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="33" height="33" rx="9" fill="#13281e" stroke="rgba(232,240,228,0.28)" />
      <path d="M11 24V10" stroke="#f4f2ec" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 24V10" stroke="#f4f2ec" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 10l12 14" stroke="#d4ff70" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
