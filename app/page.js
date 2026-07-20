'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import PackageCard from '@/components/PackageCard'
import Footer from '@/components/Footer'
import { usePackages } from '@/hooks/usePackages'
import { usePhone, useWhatsapp, useEmail } from '@/hooks/useSettings'
import {
  Phone, MessageCircle, MapPin, Mail, Star,
  CheckCircle, ArrowRight, ChevronDown,
} from 'lucide-react'

/* ─── Static data ─────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    category: 'Tour Packages',
    title: 'Domestic & International Tour Packages',
    desc: 'Curated packages with day-wise itineraries, accommodation, and transfers — fully customized to your preferences and budget.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&q=85',
    featured: true,
  },
  {
    category: 'Visa Services',
    title: 'Visa Consultancy — Tourist, Business & Student',
    desc: 'Expert guidance for all visa types with fast processing and transparent pricing.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=85',
  },
  {
    category: 'Travel Bookings',
    title: 'Flight Booking, Hotels & Travel Insurance',
    desc: 'Best deals on flights and hotel reservations with comprehensive travel insurance.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=85',
  },
]

const FALLBACK_DESTINATIONS = [
  { id: 1, name: 'Goa',       location: 'India',             image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
  { id: 2, name: 'Manali',    location: 'Himachal Pradesh',  image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80' },
  { id: 3, name: 'Andaman',   location: 'India',             image_url: 'https://images.unsplash.com/photo-1587139223877-04ea07f19379?w=400&q=80' },
  { id: 4, name: 'Dubai',     location: 'UAE',               image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
  { id: 5, name: 'Singapore', location: 'Singapore',         image_url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80' },
  { id: 6, name: 'Thailand',  location: 'Bangkok, Thailand', image_url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80' },
]

const CATEGORY_TABS = [
  { value: 'all',       label: 'All Packages' },
  { value: 'package',  label: 'Tour Packages' },
  { value: 'group',    label: 'Group Packages' },
  { value: 'homestay', label: 'Home Stays' },
  { value: 'houseboat',label: 'Houseboats' },
  { value: 'other',    label: 'Other' },
]

const DEST_TABS = ['All', 'Domestic', 'International', 'Beach', 'Hill Stations', 'Heritage']

const WHY_POINTS = [
  'Trusted Travel Experts',
  'Professional Visa Assistance',
  'Affordable Tour Packages',
  'Personalized Travel Planning',
  'Secure Booking Process',
  'Fast Customer Support',
  'Experienced Team',
  'Transparent Pricing',
]

/* ─── Page ────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeDest,     setActiveDest]     = useState('all')
  const [destinations,   setDestinations]   = useState([])
  const [destTab,        setDestTab]        = useState('All')
  const { packages, loaded: pkgsLoaded } = usePackages()
  const phone    = usePhone()
  const whatsapp = useWhatsapp()
  const email    = useEmail()

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.ok ? r.json() : [])
      .then(setDestinations)
      .catch(() => {})
  }, [])

  const visibleDests = destinations.filter(d => d.featured !== false)
  const displayDests = visibleDests.length > 0 ? visibleDests : FALLBACK_DESTINATIONS

  const shown = packages.filter(p => {
    const matchCat  = activeCategory === 'all' || p.category === activeCategory
    const matchDest = activeDest     === 'all' || p.destination === activeDest
    return matchCat && matchDest
  })

  const pkgCount = name => packages.filter(p => p.destination === name).length

  return (
    <main style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter',sans-serif" }}>
      <Navbar />
      <HeroSlider />

      {/* ══ TOP DESTINATIONS ══════════════════════════════════════════════ */}
      <section id="destinations" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8520a', marginBottom: 8 }}>WHERE WE GO</p>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#111', margin: 0 }}>Top Destinations</h2>
            </div>
            <button
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#e8520a', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}>
              Explore all destinations <ArrowRight size={14} />
            </button>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {DEST_TABS.map(tab => (
              <button key={tab} onClick={() => setDestTab(tab)}
                style={{
                  padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: destTab === tab ? '#111' : '#f5f0e8',
                  color:      destTab === tab ? '#fff' : '#6b7280',
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Portrait destination cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 20 }}>
            {displayDests.slice(0, 6).map(dest => (
              <button key={dest.id}
                onClick={() => { setActiveDest(dest.name); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                <div
                  style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4', marginBottom: 12, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <img
                    src={dest.image_url || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80'}
                    alt={dest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: dest.image_pos || 'center' }}
                  />
                  {pkgCount(dest.name) > 0 && (
                    <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#111' }}>
                      {pkgCount(dest.name)} pkg{pkgCount(dest.name) !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 3 }}>{dest.name}</h3>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>{dest.location || 'India'}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR SERVICES — editorial cards ═══════════════════════════════ */}
      <section id="services" style={{ padding: '90px 24px', background: '#f8f6f3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8520a', marginBottom: 8 }}>WHAT WE OFFER</p>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#111', margin: 0 }}>Our Services</h2>
            </div>
            <a href="#packages" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#e8520a', textDecoration: 'none' }}>
              See all packages <ArrowRight size={14} />
            </a>
          </div>

          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>

            {/* Large featured card */}
            <div
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', height: 490, boxShadow: '0 8px 40px rgba(0,0,0,0.13)', cursor: 'pointer' }}>
              <img src={SERVICES_DATA[0].image} alt={SERVICES_DATA[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 30px' }}>
                <span style={{ display: 'inline-block', background: '#e8520a', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {SERVICES_DATA[0].category}
                </span>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>{SERVICES_DATA[0].title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.76)', lineHeight: 1.65, marginBottom: 18 }}>{SERVICES_DATA[0].desc}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#111', borderRadius: 999, padding: '10px 20px', fontSize: 13, fontWeight: 700 }}>
                  Explore Packages <ArrowRight size={13} />
                </span>
              </div>
            </div>

            {/* Two smaller horizontal cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {SERVICES_DATA.slice(1).map(s => (
                <div key={s.title}
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', display: 'flex', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(0,0,0,0.14)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: 130, flexShrink: 0, height: 180 }}>
                    <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#e8520a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>{s.category}</span>
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.65 }}>{s.desc}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#e8520a', marginTop: 10 }}>
                      Learn more <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PACKAGES ══════════════════════════════════════════════════════ */}
      <section id="packages" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8520a', marginBottom: 10 }}>CURATED FOR YOU</p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#111', marginBottom: 10 }}>
              Our <span style={{ color: '#e8520a' }}>Packages</span>
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.65, fontSize: 14 }}>
              Every package includes a day-wise itinerary, accommodation & transfers.
            </p>

            {/* Category tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
              {CATEGORY_TABS.map(tab => (
                <button key={tab.value}
                  onClick={() => { setActiveCategory(tab.value); setActiveDest('all') }}
                  style={{
                    padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    background: activeCategory === tab.value ? '#111' : '#f5f0e8',
                    color:      activeCategory === tab.value ? '#fff' : '#6b7280',
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Destination dropdown */}
            {destinations.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                  <MapPin size={13} style={{ position: 'absolute', left: 12, color: activeDest !== 'all' ? '#e8520a' : '#9ca3af', pointerEvents: 'none', zIndex: 1 }} />
                  <select value={activeDest} onChange={e => setActiveDest(e.target.value)}
                    style={{
                      padding: '8px 36px 8px 30px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: `1.5px solid ${activeDest !== 'all' ? '#e8520a' : '#e5e7eb'}`,
                      background: activeDest !== 'all' ? '#fff5ef' : '#f5f0e8',
                      color:      activeDest !== 'all' ? '#e8520a' : '#555',
                      appearance: 'none', outline: 'none',
                    }}>
                    <option value="all">All Destinations</option>
                    {destinations.map(d => <option key={d.id} value={d.name}>{d.emoji} {d.name}</option>)}
                  </select>
                  <ChevronDown size={13} style={{ position: 'absolute', right: 12, color: activeDest !== 'all' ? '#e8520a' : '#9ca3af', pointerEvents: 'none' }} />
                </div>
              </div>
            )}
          </div>

          {!pkgsLoaded ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ width: 36, height: 36, border: '3px solid #f0ebe1', borderTop: '3px solid #e8520a', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
              <p style={{ fontSize: 14 }}>Loading packages...</p>
            </div>
          ) : shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
              <p>No packages available for this selection.</p>
              <button onClick={() => { setActiveCategory('all'); setActiveDest('all') }}
                style={{ marginTop: 12, padding: '8px 20px', borderRadius: 999, border: 'none', background: '#f5f0e8', color: '#555', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {shown.map(pkg => <PackageCard key={pkg.id} pkg={pkg} phone={phone} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══ WHY CHOOSE US — Highlights ════════════════════════════════════ */}
      <section id="about" style={{ padding: '90px 24px', background: '#f8f6f3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'start' }}>

            {/* Left */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8520a', marginBottom: 12 }}>WHY CHOOSE US</p>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#111', marginBottom: 22, lineHeight: 1.1 }}>
                Travel Confidently<br /><span style={{ color: '#e8520a' }}>with Bharath Tours</span>
              </h2>

              {/* Testimonial card */}
              <div style={{ background: '#fff', borderRadius: 18, padding: '20px 24px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 10 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />)}
                  <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 6, fontWeight: 500 }}>4.9 / 5.0</span>
                </div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 14 }}>
                  "Bharath Tours made our family trip completely stress-free. Visa assistance, flights, hotels — everything handled professionally with the best pricing."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#e8520a,#c93d00)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>R</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Ravi Kumar</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>Family Tour to Singapore</div>
                  </div>
                </div>
              </div>

              {/* Checklist grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                {WHY_POINTS.map(pt => (
                  <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#374151' }}>{pt}</span>
                  </div>
                ))}
              </div>

              <p style={{ color: '#6b7280', lineHeight: 1.75, fontSize: 14 }}>
                Bharath Tours and Consultancy is a trusted travel agency and visa consultancy based in Annamayya District, Andhra Pradesh. We specialize in domestic and international tour packages, visa assistance, flight booking, hotel reservations, customized holidays, and complete travel planning.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <a href={`tel:+${phone}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 999, background: '#e8520a', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c93d00'}
                  onMouseLeave={e => e.currentTarget.style.background = '#e8520a'}>
                  <Phone size={14} /> Call Now
                </a>
                <a href={`https://wa.me/${whatsapp}?text=Hi! I want to book a tour or get visa assistance!`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 999, background: '#fff', border: '1.5px solid #e5e7eb', color: '#374151', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                  <MessageCircle size={14} style={{ color: '#25d366' }} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right: images + stats */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div style={{ borderRadius: 20, overflow: 'hidden', height: 230, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80" alt="International Travel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: 20, overflow: 'hidden', height: 230, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80" alt="Visa Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* Stats bar */}
              <div style={{ background: '#fff', borderRadius: 18, padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                {[['500+', 'Happy Clients'], ['50+', 'Destinations'], ['16+', 'Services']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#e8520a', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA — Dark full-width with background image ════════════════════ */}
      <section id="contact" style={{ position: 'relative', padding: '110px 24px', overflow: 'hidden' }}>
        {/* Background image with dark overlay */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,10,28,0.83)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14 }}>READY TO TRAVEL?</p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
            Get Your Perfect <span style={{ color: '#fbbf24' }}>Travel Plan</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 16, lineHeight: 1.75, marginBottom: 14 }}>
            Tell us your travel plans and we&apos;ll craft the perfect tour package or assist with your visa, flights, and hotels.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 38 }}>
            <MapPin size={13} /> Annamayya District, Andhra Pradesh, India
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:+${phone}`}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#1c1c1c', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              <Phone size={18} /> Call Us Now
            </a>
            <a href={`https://wa.me/${whatsapp}?text=Hi! I want to book a tour or get visa assistance!`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: 'linear-gradient(135deg,#25d366,#128c7e)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            {email && (
              <a href={`mailto:${email}`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                <Mail size={18} /> Email Us
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${whatsapp}?text=Hi! I want to book a tour or get visa assistance!`}
        target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#25d366,#128c7e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 24px rgba(37,211,102,0.5)', textDecoration: 'none' }}>
        <MessageCircle size={26} />
      </a>

      <style>{`
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </main>
  )
}
