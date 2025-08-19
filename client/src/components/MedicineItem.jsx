import React, { useState } from 'react';
import { ShoppingCart, Thermometer, Building2, IndianRupee, Heart, Star, Clock } from 'lucide-react';

export default function MedicineItem({ item}) {
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(item)
  
  const { status } = item;
  
  if (status === 'Expired') {
    return null;
  }

  return (
    <div 
      className="relative w-full max-w-sm mx-auto overflow-hidden"
      
    >
      {/* Animated background orbs */}
      <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-violet-500/20 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-4 w-12 h-12 bg-cyan-500/20 rounded-full blur-md animate-pulse delay-700"></div>
      </div>

      {/* Main card */}
      <div className='relative group overflow-hidden transition-all duration-500'>
        
        {/* Glassmorphic container */}
        <div className="relative  bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-black/80 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Animated border glow */}
          <div className='absolute inset-0 rounded-3xl transition-all duration-500'>
            <div className="w-full h-full bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black/90 rounded-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative overflow-hidden z-10 p-6">
            
            {/* Header with favorite button */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-300 uppercase tracking-widest">Available</span>
              </div>
              
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="group/heart p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <Heart 
                  className={`w-4 h-4 transition-all duration-300 ${
                    isFavorite 
                      ? 'text-red-400 fill-red-400 scale-110' 
                      : 'text-gray-400 group-hover/heart:text-red-400 group-hover/heart:scale-110'
                  }`} 
                />
              </button>
            </div>

            {/* Medicine name and quantity */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                {item.Mname}
              </h2>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full border border-violet-500/30">
                  <span className="text-sm font-medium text-violet-300">
                    {item.Mquantity} Units
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400">4.8</span>
                </div>
              </div>
            </div>

            {/* Medicine image with overlay effects */}
            <div className="relative mb-6 group/img">
              <div className="relative overflow-hidden rounded-2xl">
                {/* Image glow effect */}
                
                <img 
                  className="w-full h-44 object-cover transition-all duration-5" 
                  src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`} 
                  alt={`${item.Mname} package`}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMkQzNzQ4Ii8+Cjx0ZXh0IHg9IjE0MCIgeT0iOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TWVkaWNpbmU8L3RleHQ+Cjwvc3ZnPgo=";
                  }}
                />
                
                {/* Overlay gradient */}
                
                {/* Floating info badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs text-white font-medium">Fast Acting</span>
                </div>
              </div>
            </div>

            {/* Info sections */}
            <div className="space-y-3 mb-6">
              
              {/* Storage condition */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                  <Thermometer className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-300 uppercase tracking-wide">Storage</p>
                  <p className="text-sm text-white">{item.storageCondition}</p>
                </div>
              </div>

              {/* Supplier */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                <div className="p-2 bg-emerald-500/20 rounded-lg backdrop-blur-sm">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-emerald-300 uppercase tracking-wide">Supplier</p>
                  <p className="text-sm text-white truncate">{item.Msupplier}</p>
                </div>
              </div>
            </div>

            {/* Price and action button */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Price</p>
                  <p className="text-2xl font-bold text-white">₹{item.Mprice}</p>
                </div>
              </div>
              
              {/* Add to cart button with advanced effects */}
              <button className="group/btn relative overflow-hidden">
                {/* Button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-purple-600/50 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
                
                {/* Button background */}
                <div className="relative px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/25">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ShoppingCart className="w-4 h-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300" />
                    <span>Add</span>
                  </div>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -top-full bg-gradient-to-b from-white/20 to-transparent group-hover/btn:top-full transition-all duration-700 rounded-xl"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-8 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}