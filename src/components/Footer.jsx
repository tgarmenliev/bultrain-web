import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '32px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img 
              src="/favicon.svg" 
              alt="BulTrain Logo" 
              style={{
                width: 32,
                height: 32,
                borderRadius: '25%',
                objectFit: 'cover',
                border: '1px solid var(--color-border-accent)',
              }}
            />
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-text-primary)' }}>BulTrain</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'link-privacy', href: '/privacy', label: 'Политика за поверителност', isRouterLink: true },
              { id: 'link-privacy-app', href: '/privacy-app', label: 'Политика за поверителност на приложението', isRouterLink: true },
              { id: 'link-terms', href: '/terms', label: 'Условия за ползване', isRouterLink: true },
              { id: 'link-contact', href: '/contact', label: 'Контакти', isRouterLink: true },
            ].map(link => {
              const linkProps = {
                key: link.id,
                id: link.id,
                style: {
                  fontSize: 13,
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                },
                onMouseEnter: e => e.target.style.color = 'var(--color-text-secondary)',
                onMouseLeave: e => e.target.style.color = 'var(--color-text-muted)'
              };

              return link.isRouterLink ? (
                <Link to={link.href} {...linkProps}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} {...linkProps}>
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p style={{
            fontSize: 13,
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            © {year} BulTrain
          </p>
        </div>

        {/* Disclaimer */}
        <p style={{
          fontSize: 12,
          color: 'var(--color-text-muted)',
          opacity: 0.6,
          marginTop: 20,
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          BulTrain е независим проект и не е свързан с, нито е официално одобрен от БДЖ (Български държавни железници).
        </p>
      </div>
    </footer>
  )
}
