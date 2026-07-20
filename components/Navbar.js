'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { usePhone } from '@/hooks/useSettings'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const phone = usePhone()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { label: 'Home',         href: '/' },
    { label: 'Destinations', href: '/#destinations' },
    { label: 'Services',     href: '/#services' },
    { label: 'Packages',     href: '/#packages' },
    { label: 'About',        href: '/#about' },
    { label: 'Contact',      href: '/#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.09)' : '0 1px 0 rgba(0,0,0,0.07)',
      transition: 'box-shadow 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 64, position: 'relative' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0, zIndex: 1 }}>
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg,#e8520a,#c93d00)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 17,
            }}>✈️</div>
            <div className="hidden sm:block">
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 12, color: '#111', lineHeight: 1.15, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Bharath Tours</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 9.5, color: '#e8520a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>& Consultancy</div>
            </div>
          </Link>

          {/* Desktop Nav — absolute centred */}
          <div className="hidden lg:flex"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 28, alignItems: 'center' }}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="hover:text-orange-500 transition-colors duration-200"
                style={{ fontSize: 13, fontWeight: 500, color: '#4b5563', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex" style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0, zIndex: 1 }}>
            <a href={`tel:+${phone}`}
              className="hover:bg-gray-100 transition-colors rounded-lg"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#374151', textDecoration: 'none', padding: '7px 14px' }}>
              <Phone size={13} /> Call Us
            </a>
            <a href={`https://wa.me/${phone}?text=Hi! I want to book a tour or get visa assistance!`}
              target="_blank" rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', padding: '9px 22px', borderRadius: 8, background: '#111' }}>
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden"
            style={{ marginLeft: 'auto', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', zIndex: 1 }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '12px 20px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="hover:bg-gray-50 transition-colors rounded-xl"
                style={{ padding: '11px 14px', fontSize: 14, fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid #f3f4f6' }}>
              <a href={`tel:+${phone}`}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 8, border: '1.5px solid #e8520a', color: '#e8520a', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                <Phone size={13} /> Call
              </a>
              <a href={`https://wa.me/${phone}?text=Hi! I want to book a tour or get visa assistance!`}
                target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 8, background: '#111', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
