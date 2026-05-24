/**
 * Inline SVG icon for a social platform / brand. Uses currentColor for
 * both stroke and the small filled accents — color is fully controlled
 * via CSS.
 *
 * Props:
 *   name  – 'instagram' | 'whatsapp' | 'youtube' | 'linkedin'
 *           | 'meta' | 'google' | 'facebook' | 'tiktok'
 *   size  – px (default 20)
 */
const PATHS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.85" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  /* Meta — simplified infinity-twist mark using two overlapping arcs.
     Mono-stroke version, recognizable as the Meta loop without being
     a literal copy of the official logo. */
  meta: (
    <path d="M3 14c0-3 1.7-5 4-5 1.7 0 3 1 4 3l2 3c1 2 2.3 3 4 3 2.3 0 4-2 4-5s-1.7-5-4-5c-1.7 0-3 1-4 3l-2 3c-1 2-2.3 3-4 3-2.3 0-4-2-4-5z" />
  ),
  /* Google — a G-shaped mark: open circle with the inner stroke that
     suggests the wordmark. */
  google: (
    <>
      <path d="M21 12a9 9 0 1 1-3.3-7" />
      <path d="M21 12h-9" />
    </>
  ),
  /* Facebook — the 'f' inside a rounded square. */
  facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M14 9h2V6h-2.5a2.5 2.5 0 0 0-2.5 2.5V11H9v3h2v6h3v-6h2l.5-3H14V9.5a.5.5 0 0 1 .5-.5z" fill="currentColor" stroke="none" />
    </>
  ),
  /* TikTok — musical note merged with a square shape. */
  tiktok: (
    <path d="M16 4v8.5a3.5 3.5 0 1 1-3.5-3.5h.5V12a1 1 0 1 0 1 1V4h2c.3 1.5 1.5 2.7 3 3v2c-1.4-.1-2.6-.7-3.5-1.7" />
  ),
}

export default function SocialIcon({ name, size = 20 }) {
  const content = PATHS[name]
  if (!content) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  )
}
