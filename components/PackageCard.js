'use client'
import { useRouter } from 'next/navigation'
import { Phone, Clock, MapPin, Share2 } from 'lucide-react'

function formatPrice(n) {
  return '₹' + Number(n).toLocaleString('en-IN')
}

export default function PackageCard({ pkg, phone = '919846034558' }) {
  const router = useRouter()

  return (
    <div
      className="h-full flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => router.push(`/packages/${pkg.id}`)}
    >
      {/* Image Section */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
            {pkg.badge || 'Popular'}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
           <span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
             {pkg.duration}
           </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium mb-2">
          <Clock size={14} className="text-gray-400" />
          <span>{pkg.duration}</span>
        </div>
        
        <h3 className="font-bold text-[17px] text-gray-900 mb-2 leading-snug line-clamp-2">{pkg.title}</h3>
        
        <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-4">
          <MapPin size={14} className="text-gray-400" />
          <span>{pkg.destination}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
             <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Price</div>
             <div className="flex items-baseline gap-1">
               <span className="text-[22px] font-extrabold text-gray-900">{formatPrice(pkg.salePrice)}</span>
               {pkg.originalPrice > pkg.salePrice && (
                 <span className="text-[13px] text-red-400 line-through font-medium ml-1">
                   {formatPrice(pkg.originalPrice)}
                 </span>
               )}
             </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-3 mt-4">
          <button 
            onClick={e => { e.stopPropagation(); window.open(`tel:+${phone}`, '_self') }}
            className="w-12 h-12 shrink-0 rounded-xl border-2 border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-amber-500 transition-colors"
          >
            <Phone size={20} />
          </button>
          <button className="flex-1 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-[15px] transition-colors shadow-sm shadow-red-500/30">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
