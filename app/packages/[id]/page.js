'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomestayDetail from '@/components/HomestayDetail'
import { usePhone, useWhatsapp } from '@/hooks/useSettings'
import { Phone, MessageCircle, Clock, MapPin, Check, X, ChevronDown, ChevronUp, ArrowLeft, Send, User, Info, Users, Baby, BedDouble } from 'lucide-react'
import Link from 'next/link'

function fmt(n) {
  return '₹' + Number(n).toLocaleString('en-IN')
}

function fmtRange(dr) {
  if (typeof dr === 'string') return dr
  const { start, end } = dr || {}
  if (!start && !end) return ''
  const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const f = d => { const dt = new Date(d + 'T00:00:00'); return `${dt.getDate()} ${M[dt.getMonth()]}, ${dt.getFullYear()}` }
  const s = start ? f(start) : '', e = end ? f(end) : ''
  return s && e ? `${s} – ${e}` : s || e
}
function groupMonth(group) {
  if (group.month) return group.month
  const first = group.dates?.[0]
  const start = first ? (typeof first === 'string' ? '' : first.start) : ''
  if (!start) return ''
  const dt = new Date(start + 'T00:00:00')
  return dt.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

export default function PackagePage({ params }) {
  const { id } = use(params)
  const [pkg, setPkg] = useState(null)
  const [openDay, setOpenDay] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const phone = usePhone()
  const whatsapp = useWhatsapp()

  const [enquiry, setEnquiry] = useState({ name: '', phone: '', email: '', message: '' })
  const [enquiryStatus, setEnquiryStatus] = useState(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    fetch(`/api/packages/${encodeURIComponent(id)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setPkg(data && !data.error ? data : null))
      .catch(() => setPkg(null))
      .finally(() => setLoading(false))
  }, [id])

  const submitEnquiry = async (e) => {
    e.preventDefault()
    if (!enquiry.name.trim() || !enquiry.phone.trim()) return
    setEnquiryStatus('sending')
    const msgWithId = enquiry.message.trim()
      ? `${enquiry.message.trim()}\n\nPackage ID: ${pkg.id}`
      : `Package ID: ${pkg.id}`
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package_id: pkg.id,
          package_title: pkg.title,
          ...enquiry,
          message: msgWithId,
        }),
      })
      if (res.ok) {
        setEnquiryStatus('sent')
        setEnquiry({ name: '', phone: '', email: '', message: '' })
      } else {
        setEnquiryStatus('error')
      }
    } catch {
      setEnquiryStatus('error')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-red-100 border-t-red-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 font-medium">Loading package...</p>
      </div>
    </div>
  )

  if (!pkg) return (
    <main className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Package not found</h2>
        <Link href="/" className="text-red-500 hover:text-red-600 underline font-medium">← Back to home</Link>
      </div>
    </main>
  )

  if (pkg.category === 'homestay' || pkg.category === 'houseboat') return (
    <main className="min-h-screen bg-white">
      <Navbar big />
      <HomestayDetail pkg={pkg} phone={phone} whatsapp={whatsapp} isMobile={isMobile} />
      <Footer />
    </main>
  )

  const waMsg = `Hi! I want to book ${pkg.title} (${pkg.id}) — ${pkg.duration} — ${fmt(pkg.salePrice)}/person`

  const occParts = [
    Number(pkg.rooms) > 0 && `${pkg.rooms} room${Number(pkg.rooms) !== 1 ? 's' : ''}`,
    Number(pkg.adults) > 0 && `${pkg.adults} adult${Number(pkg.adults) !== 1 ? 's' : ''}`,
    Number(pkg.children) > 0 && `${pkg.children} child${Number(pkg.children) !== 1 ? 'ren' : ''}`,
  ].filter(Boolean)
  const occSummary = occParts.join(', ')
  const hasBreakdown = Number(pkg.salePrice) > 0 && (Number(pkg.adults) > 0 || Number(pkg.children) > 0 || Number(pkg.childPrice) > 0)
  const childAgeLabel = (pkg.childAgeMin && pkg.childAgeMax)
    ? `${pkg.childAgeMin}–${pkg.childAgeMax} yrs`
    : pkg.childAgeMin ? `${pkg.childAgeMin}+ yrs`
    : pkg.childAgeMax ? `up to ${pkg.childAgeMax} yrs` : ''
  const waChanges = `Hi! I'd like to request changes for ${pkg.title} (${pkg.id})${occSummary ? ` — ${occSummary}` : ''}. Current rate: ₹${Number(pkg.salePrice).toLocaleString('en-IN')}/adult${Number(pkg.childPrice) > 0 ? `, ₹${Number(pkg.childPrice).toLocaleString('en-IN')}/child` : ''}.`

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[45vh] lg:h-[55vh] min-h-[280px] overflow-hidden bg-[#0f172a]">
        <img
          src={pkg.heroImage || pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: (pkg.heroImage ? pkg.heroImagePos : pkg.imagePos) || 'center' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1400&q=85' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 pb-8 lg:pb-12 w-full">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors text-sm font-medium mb-4">
              <ArrowLeft size={16} /> Back to packages
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-sm">
                <MapPin size={12} /> {pkg.destination}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                <Clock size={12} /> {pkg.duration}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
              {pkg.title}
            </h1>
            <p className="text-white/80 text-sm md:text-lg">{pkg.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left column */}
          <div className="lg:col-span-2">

            {/* Overview */}
            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{pkg.overview}</p>
            </section>

            {/* Highlights */}
            {pkg.highlights?.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-5">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-red-500" strokeWidth={3} />
                      </span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Note */}
            {pkg.note?.trim() && (
              <section className="mb-8">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
                  <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-900 text-sm leading-relaxed whitespace-pre-wrap m-0">
                    <strong>Note: </strong>{pkg.note}
                  </p>
                </div>
              </section>
            )}

            {/* Available Dates — Group Packages */}
            {pkg.category === 'group' && pkg.availableDates?.length > 0 && (() => {
              const allDates = pkg.availableDates.flatMap(g => (g.dates || []))
              const validDates = allDates.filter(dr => fmtRange(dr))
              if (!validDates.length) return null

              const monthMap = {}
              const monthOrder = []
              for (const dr of validDates) {
                const d = typeof dr === 'object' ? dr : { start: '', end: dr || '' }
                const monthKey = d.start
                  ? new Date(d.start + 'T00:00:00').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                  : 'Upcoming'
                if (!monthMap[monthKey]) { monthMap[monthKey] = []; monthOrder.push(monthKey) }
                monthMap[monthKey].push(dr)
              }

              return (
                <section className="mb-10">
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-5">Available Departures</h2>
                  <div className="border border-gray-200 rounded-[24px] overflow-hidden bg-white shadow-sm">
                    {monthOrder.map((month, mi) => (
                      <div key={month} className={mi < monthOrder.length - 1 ? "border-b border-gray-200" : ""}>
                        <div className="flex items-center gap-2 px-5 py-3 bg-red-50 border-b border-red-100">
                          <span className="text-lg">📅</span>
                          <span className="font-bold text-sm text-red-600 tracking-wide">{month}</span>
                        </div>
                        {monthMap[month].map((dr, di) => (
                          <div key={di} className={`flex items-center justify-between px-5 py-4 ${di % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${di < monthMap[month].length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                              <span className="text-[15px] text-gray-800 font-medium">{fmtRange(dr)}</span>
                            </div>
                            <a
                              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi! I want to reserve the following package:\n\nPackage: ${pkg.title}\nPackage ID: ${pkg.id}\nDate: ${fmtRange(dr)}`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs whitespace-nowrap transition-colors shadow-sm"
                            >
                              Reserve
                            </a>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              )
            })()}

            {/* Itinerary */}
            {pkg.itinerary?.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-5">Day-wise Itinerary</h2>
                <div className="flex flex-col gap-3">
                  {pkg.itinerary.map((day, i) => {
                    const acts = (day.activities || []).map(a => typeof a === 'string' ? { time: '', emoji: '', title: a, details: [], tags: [] } : a)
                    const isOpen = openDay === i
                    return (
                      <div key={i} className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${isOpen ? 'border-red-200 shadow-md bg-white' : 'border-gray-200 shadow-sm bg-white hover:border-red-200'}`}>
                        <button
                          onClick={() => setOpenDay(isOpen ? -1 : i)}
                          className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${isOpen ? 'bg-red-50/50' : 'bg-white'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                              {day.day}
                            </div>
                            <div className="text-left">
                              <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-0.5">Day {day.day}</div>
                              <div className="text-[15px] font-bold text-gray-900 leading-snug">{day.title}</div>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-5 pb-6 pt-2 border-t border-red-100/50">
                            {day.image && (
                              <div className="rounded-2xl overflow-hidden mb-5 h-[240px] md:h-[320px] shadow-sm">
                                <img src={day.image} alt={day.title} style={{ objectPosition: day.imagePos || 'center' }} className="w-full h-full object-cover" />
                              </div>
                            )}
                            {day.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mb-6">{day.description}</p>
                            )}
                            
                            {/* Timeline */}
                            {acts.length > 0 && (
                              <div className="relative pl-0 mt-4">
                                <div className="absolute left-[38px] top-0 bottom-0 w-0.5 bg-red-100 z-0" />
                                {acts.map((act, ai) => (
                                  <div key={ai} className="flex gap-4 mb-6 relative z-10">
                                    <div className="shrink-0 w-20 flex flex-col items-center gap-1">
                                      {act.time ? (
                                        <div className="bg-[#0f172a] text-white text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider whitespace-nowrap shadow-sm">
                                          {act.time}
                                        </div>
                                      ) : (
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-[3px] border-white shadow-sm mt-1.5" />
                                      )}
                                    </div>
                                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                      <div className="flex items-start gap-2.5 mb-2">
                                        {act.emoji && <span className="text-lg leading-snug">{act.emoji}</span>}
                                        <span className="font-bold text-[14px] text-gray-900 leading-snug">{act.title}</span>
                                      </div>
                                      {(act.details || []).filter(Boolean).length > 0 && (
                                        <ul className="flex flex-col gap-1.5 mb-3">
                                          {act.details.filter(Boolean).map((det, ki) => (
                                            <li key={ki} className="flex items-start gap-2 text-[13px] text-gray-600 leading-relaxed">
                                              <span className="text-green-500 font-bold shrink-0">✓</span>
                                              <span>{det}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                      {(act.tags || []).length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {act.tags.map((tag, ti) => (
                                            <span key={ti} className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">{tag}</span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {day.hotel && (
                                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 mt-2 relative z-10">
                                    <span className="text-xl">🛏</span>
                                    <span className="text-sm text-gray-600 font-medium">Overnight stay at <span className="text-gray-900 font-bold">{day.hotel}</span></span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Inclusions / Exclusions */}
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Inclusions', items: pkg.inclusions, icon: Check, color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Exclusions', items: pkg.exclusions, icon: X,     color: 'text-red-600', bg: 'bg-red-100' },
                ].map(({ label, items, icon: Icon, color, bg }) => (
                  <div key={label} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center`}>
                        <Icon size={16} className={color} strokeWidth={3} />
                      </span>
                      {label}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {items?.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed items-start">
                          <Icon size={16} className={`${color} shrink-0 mt-0.5`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right: Booking card & Enquiry (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Pricing Card */}
              <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="bg-red-500 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-white/70 line-through">{fmt(pkg.originalPrice)}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20">
                      SAVE {fmt(pkg.originalPrice - pkg.salePrice)}
                    </span>
                  </div>
                  <div className="text-4xl font-extrabold leading-none mb-1">{fmt(pkg.salePrice)}</div>
                  <div className="text-sm text-white/80">{Number(pkg.childPrice) > 0 ? 'Per Adult' : pkg.priceNote}</div>
                  
                  <div className="flex gap-2 items-start mt-4 p-3 rounded-xl bg-black/10">
                    <Info size={14} className="shrink-0 mt-0.5 text-amber-200" />
                    <span className="text-xs text-white/90 leading-relaxed">Rate may change based on your customization.</span>
                  </div>
                </div>

                <div className="p-6">
                  {(Number(pkg.rooms) > 0 || Number(pkg.adults) > 0 || Number(pkg.children) > 0) && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {[
                        { Icon: BedDouble, n: pkg.rooms, s: 'Room', p: 'Rooms' },
                        { Icon: Users, n: pkg.adults, s: 'Adult', p: 'Adults' },
                        { Icon: Baby, n: pkg.children, s: 'Child', p: 'Children' },
                      ].filter(({ n }) => Number(n) > 0).map(({ Icon, n, s, p }) => (
                        <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                          <Icon size={14} /> {n} {Number(n) !== 1 ? p : s}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {[
                    { l: 'Duration', v: pkg.duration },
                    { l: 'Destination', v: pkg.destination },
                    { l: 'Stay', v: pkg.hotels },
                  ].filter(({ v }) => v).map(({ l, v }) => (
                    <div key={l} className="flex justify-between items-start mb-3 text-[13px]">
                      <span className="text-gray-500">{l}</span>
                      <span className="font-bold text-gray-900 text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}

                  {hasBreakdown && (
                    <>
                      <hr className="my-4 border-gray-100" />
                      <div className="text-sm font-bold text-gray-900 mb-3">Price Breakdown</div>
                      {Number(pkg.salePrice) > 0 && (
                        <div className="flex justify-between items-center mb-2 text-[13px]">
                          <span className="text-gray-500">Price per adult</span>
                          <span className="font-bold text-gray-900">{fmt(pkg.salePrice)}</span>
                        </div>
                      )}
                      {Number(pkg.childPrice) > 0 && (
                        <div className="flex justify-between items-center mb-2 text-[13px]">
                          <span className="text-gray-500">Price per child{childAgeLabel ? ` (${childAgeLabel})` : ''}</span>
                          <span className="font-bold text-gray-900">{fmt(pkg.childPrice)}</span>
                        </div>
                      )}
                      <a
                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waChanges)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full mt-3 bg-green-50 text-green-600 font-bold text-[13px] hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle size={16} /> Request Changes
                      </a>
                    </>
                  )}

                  <hr className="my-5 border-gray-100" />

                  <a
                    href={`tel:+${phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-[15px] mb-3 transition-colors shadow-md shadow-red-500/20"
                  >
                    <Phone size={18} /> Call to Book
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waMsg)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] transition-colors shadow-md shadow-green-500/20"
                  >
                    <MessageCircle size={18} /> WhatsApp Enquiry
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    No booking fees · Instant confirmation
                  </p>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="bg-[#0f172a] rounded-[24px] p-6 shadow-xl text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Send size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl m-0">Send an Enquiry</h2>
                    <p className="text-xs text-gray-400 m-0 mt-0.5">We'll get back to you soon</p>
                  </div>
                </div>

                {enquiryStatus === 'sent' ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="font-bold text-green-400 text-sm m-0">Enquiry sent successfully!</p>
                    <p className="text-xs text-green-400/80 mt-1 mb-4">Our team will contact you shortly.</p>
                    <button onClick={() => setEnquiryStatus(null)} className="px-5 py-2 rounded-full bg-green-500 text-white font-bold text-xs transition-colors">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitEnquiry} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Your Name *</label>
                      <input
                        required
                        value={enquiry.name}
                        onChange={e => setEnquiry(q => ({ ...q, name: e.target.value }))}
                        placeholder="e.g. Rahul Sharma"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        value={enquiry.phone}
                        onChange={e => setEnquiry(q => ({ ...q, phone: e.target.value }))}
                        placeholder="e.g. 9876543210"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
                      <textarea
                        rows={3}
                        value={enquiry.message}
                        onChange={e => setEnquiry(q => ({ ...q, message: e.target.value }))}
                        placeholder="Any specific questions?"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      />
                    </div>
                    {enquiryStatus === 'error' && (
                      <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={enquiryStatus === 'sending'}
                      className={`w-full py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-colors mt-2 ${
                        enquiryStatus === 'sending' ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-gray-900'
                      }`}
                    >
                      {enquiryStatus === 'sending'
                        ? <><span className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" /> Sending...</>
                        : <><Send size={16} /> Send Enquiry</>
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Mobile sticky bottom bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-2 px-4 py-2 bg-amber-50 border-b border-amber-100">
            <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="text-[11px] text-amber-800 leading-tight">
              {Number(pkg.childPrice) > 0 ? `${fmt(pkg.childPrice)}/child · ` : ''}Rate may change based on your customization.
            </span>
          </div>
          <div className="px-4 py-3 flex gap-3 items-center">
            <div className="flex-1">
              <div className="text-[11px] text-gray-400 line-through leading-none">{fmt(pkg.originalPrice)}</div>
              <div className="text-xl font-extrabold text-red-500 leading-none mt-1">
                {fmt(pkg.salePrice)}<span className="text-[11px] text-gray-500 font-medium ml-1">/{Number(pkg.childPrice) > 0 ? 'adult' : 'person'}</span>
              </div>
            </div>
            <a
              href={`tel:+${phone}`}
              className="px-5 py-2.5 rounded-full bg-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-red-500/20"
            >
              <Phone size={16} /> Call
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waMsg)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-green-500 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-green-500/20"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
