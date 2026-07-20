'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { usePhone, useWhatsapp, useEmail } from '@/hooks/useSettings'

function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function FbIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const SERVICES = [
  'Domestic Tour Packages',
  'International Tour Packages',
  'Visa Consultancy',
  'Flight Ticket Booking',
  'Hotel Booking',
  'Honeymoon Packages',
  'Group Tours',
  'Travel Insurance',
  'Passport Assistance',
  'Customized Holidays',
]

const QUICK_LINKS = [
  ['Home',         '/'],
  ['Destinations', '/#destinations'],
  ['Services',     '/#services'],
  ['Packages',     '/#packages'],
  ['About',        '/#about'],
  ['Contact',      '/#contact'],
]

const FALLBACK_DESTS = [
  { id: 1, name: 'Goa' },
  { id: 2, name: 'Dubai' },
  { id: 3, name: 'Singapore' },
  { id: 4, name: 'Manali' },
  { id: 5, name: 'Andaman' },
  { id: 6, name: 'Thailand' },
]

export default function Footer() {
  const phone    = usePhone()
  const whatsapp = useWhatsapp()
  const email    = useEmail()
  const [footerDests, setFooterDests] = useState([])

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.ok ? r.json() : [])
      .then(dests => setFooterDests(dests.filter(d => d.featured !== false).slice(0, 7)))
      .catch(() => {})
  }, [])

  const displayDests = footerDests.length > 0 ? footerDests : FALLBACK_DESTS

  return (
    <footer style={{ background: '#08091a', color: '#fff' }}>

      {/* Main footer content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 0' }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#e8520a,#c93d00)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>✈️</div>
              <div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 12, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.15 }}>Bharath Tours</div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 9.5, color: '#e8520a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>& Consultancy</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 22, maxWidth: 260 }}>
              Trusted travel agency & visa consultancy from Annamayya District, Andhra Pradesh. Domestic & international tours, visa assistance, and more.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              {[
                { href: 'https://instagram.com/', icon: <IgIcon />, label: 'Instagram' },
                { href: 'https://facebook.com/',  icon: <FbIcon />, label: 'Facebook' },
                { href: `https://wa.me/${whatsapp}`, icon: <MessageCircle size={15} />, label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e8520a'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Our Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map(s => (
                <li key={s}>
                  <Link href="/#packages"
                    className="hover:text-orange-400 transition-colors"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations column */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Destinations</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {displayDests.map(d => (
                <li key={d.id}>
                  <Link href="/#packages"
                    className="hover:text-orange-400 transition-colors"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                    <MapPin size={10} style={{ flexShrink: 0 }} /> {d.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 28 }}>
              <h4 style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {QUICK_LINKS.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}
                      className="hover:text-orange-400 transition-colors"
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <li>
                <a href={`tel:+${phone}`}
                  className="hover:text-orange-400 transition-colors"
                  style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                  <Phone size={13} style={{ flexShrink: 0 }} /> +{phone}
                </a>
              </li>
              {email && (
                <li>
                  <a href={`mailto:${email}`}
                    className="hover:text-orange-400 transition-colors"
                    style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                    <Mail size={13} style={{ flexShrink: 0 }} /> {email}
                  </a>
                </li>
              )}
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                  style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                  <MessageCircle size={13} style={{ flexShrink: 0 }} /> WhatsApp Us
                </a>
              </li>
              <li>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                  <MapPin size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    Near Opposite to Shivaliyam,<br />
                    Ananthampalli, Redipalli,<br />
                    Pullempeta Mandal,<br />
                    Annamayya District,<br />
                    Andhra Pradesh – 516107
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
            © {new Date().getFullYear()} Bharath Tours and Consultancy. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
            Made with ❤️ for travellers
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1.5fr 1.7fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
