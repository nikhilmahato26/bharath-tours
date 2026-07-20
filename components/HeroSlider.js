'use client'
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useWhatsapp } from '@/hooks/useSettings'

const FALLBACK_SLIDES = [
  {
    tag: 'Based in Andhra Pradesh, India',
    title: 'Your Trusted Travel',
    highlight: '& Visa Partner',
    tagline: 'Domestic & International Tour Packages',
    desc: 'Visa Consultancy · Flight Booking · Hotel Booking · Customized Holidays · Group Tours from Annamayya District, Andhra Pradesh.',
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&q=85',
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=85',
    ],
  },
  {
    tag: 'International Tours',
    title: 'Explore the World',
    highlight: 'with Expert Guidance',
    tagline: 'Customized Holiday Packages Worldwide',
    desc: 'International holidays with visa assistance, flight booking, hotel reservations, and travel insurance — hassle-free from start to finish.',
    images: [
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=85',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=85',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=85',
    ],
  },
  {
    tag: 'Visa Consultancy',
    title: 'Professional Visa',
    highlight: 'Consultancy Services',
    tagline: 'Tourist · Business · Student Visa',
    desc: 'Expert guidance for all types of visas with fast processing and transparent pricing. Passport assistance and travel insurance included.',
    images: [
      'https://images.unsplash.com/photo-1601607696985-8e1f0d0f9fb5?w=900&q=85',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85',
    ],
  },
]

export default function HeroSlider() {
  const [slides] = useState(FALLBACK_SLIDES)
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const whatsapp = useWhatsapp()

  const go = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 380)
  }, [animating])

  const next = useCallback(() => go((current + 1) % slides.length), [current, go, slides.length])

  useEffect(() => {
    const t = setInterval(next, 6500)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[current]

  return (
    <section style={{ background: '#fff', paddingTop: 64, minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="hero-outer" style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '52px 24px 60px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: 48,
        alignItems: 'center',
      }}>

        {/* ── Left: Text Content ── */}
        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.42s ease',
        }}>
          {/* Tag pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff5ef', border: '1px solid rgba(232,82,10,0.22)', borderRadius: 999, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8520a', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#e8520a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{slide.tag}</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,4rem)', lineHeight: 1.05, color: '#111', marginBottom: 14 }}>
            {slide.title}<br />
            <span style={{ color: '#e8520a' }}>{slide.highlight}</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 10, lineHeight: 1.4 }}>{slide.tagline}</p>

          {/* Description */}
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>{slide.desc}</p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
            <a href="#packages"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: '#e8520a', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,82,10,0.35)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c93d00'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(232,82,10,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e8520a'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,82,10,0.35)' }}>
              Book Now <ArrowRight size={15} />
            </a>
            <a href={`https://wa.me/${whatsapp}?text=Hi! I want to book a tour or get visa assistance!`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: '#fff', border: '1.5px solid #e5e7eb', color: '#374151', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#f9fafb' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#fff' }}>
              <MessageCircle size={15} style={{ color: '#25d366' }} /> WhatsApp Us
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 36, marginBottom: 32 }}>
            {[['500+', 'Happy Clients'], ['16+', 'Services'], ['5 ★', 'Rating']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800, color: '#111', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, marginTop: 5 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                style={{ height: 5, borderRadius: 999, width: i === current ? 28 : 5, background: i === current ? '#e8520a' : '#d1d5db', border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0 }} />
            ))}
          </div>
        </div>

        {/* ── Right: 3-Image Mosaic ── */}
        <div className="hero-mosaic" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 14,
          height: 500,
          opacity: animating ? 0.65 : 1,
          transition: 'opacity 0.42s ease',
        }}>
          {/* Tall left image spans 2 rows */}
          <div style={{ gridRow: '1 / 3', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.16)' }}>
            <img src={slide.images[0]} alt="Travel Destination"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          </div>

          {/* Top-right */}
          <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <img src={slide.images[1]} alt="Travel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          </div>

          {/* Bottom-right with stats overlay */}
          <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', position: 'relative' }}>
            <img src={slide.images[2]} alt="Travel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
            {/* Stats chip */}
            <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 17, fontWeight: 800, color: '#e8520a', lineHeight: 1 }}>500+</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 3, fontWeight: 500 }}>Happy Clients</div>
              </div>
              <div style={{ width: 1, height: 28, background: '#e5e7eb' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 17, fontWeight: 800, color: '#e8520a', lineHeight: 1 }}>50+</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 3, fontWeight: 500 }}>Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative airplane accent */}
      <div style={{ position: 'absolute', right: '18%', top: '30%', fontSize: 32, opacity: 0.06, transform: 'rotate(25deg)', pointerEvents: 'none', userSelect: 'none' }}>✈</div>

      <style>{`
        @media (max-width: 900px) {
          .hero-outer { grid-template-columns: 1fr !important; padding: 36px 20px 52px !important; min-height: auto !important; gap: 36px !important; }
          .hero-mosaic { height: 320px !important; }
        }
        @media (max-width: 600px) {
          .hero-mosaic { display: none !important; }
        }
      `}</style>
    </section>
  )
}
