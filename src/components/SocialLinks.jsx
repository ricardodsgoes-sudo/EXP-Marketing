import SocialIcon from './SocialIcon'

const DEFAULT_LINKS = [
  { name: 'instagram', url: '#', label: 'Instagram' },
  { name: 'whatsapp',  url: '#', label: 'WhatsApp' },
  { name: 'youtube',   url: '#', label: 'YouTube' },
  { name: 'linkedin',  url: '#', label: 'LinkedIn' },
]

/**
 * Renders the configured social platform icons as a horizontal list.
 *
 * Props:
 *   links    – custom array of { name, url, label } (defaults to all 4)
 *   size     – icon size in px (default 20)
 *   variant  – '' (dark bg, default) or 'light' (light bg → graphite icons)
 *   className – extra classes appended to the wrapping <ul>
 */
export default function SocialLinks({
  links   = DEFAULT_LINKS,
  size    = 20,
  variant = '',
  className = '',
}) {
  const wrapClass = [
    'social-links',
    variant === 'light' ? 'social-links--light' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <ul className={wrapClass}>
      {links.map(({ name, url, label }) => (
        <li key={name}>
          <a
            href={url}
            className="social-link"
            aria-label={label}
            rel="noopener noreferrer"
          >
            <SocialIcon name={name} size={size} />
          </a>
        </li>
      ))}
    </ul>
  )
}
