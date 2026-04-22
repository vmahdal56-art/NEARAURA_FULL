import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SovereignLogo = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // 🔱 ABR LOGIKA (Adaptive Bitrate/Sovereign Rendering)
    // Zkontrolujeme, jestli zařízení není "unavený" (low-end)
    // Pokud má uživatel zapnutý 'Reduce Motion' nebo má málo RAM, ubereme efekty
    const isPotato = 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
      (navigator as any).deviceMemory < 4;
    
    setIsLowEnd(isPotato);
  }, []);

  return (
    <div className="relative flex items-center justify-center group select-none">
      
      {/* 🔱 THE AURA FIELD (ABR Controlled) */}
      {/* Na iPhonu v NY svítí, na Nokii v Kábulu se vypne, aby nezavařila procesor */}
      {!isLowEnd && (
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.25, 0.1] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#22D3EE] blur-[80px] rounded-full"
        />
      )}

      <div className="relative z-10">
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 md:w-32 md:h-32 transition-transform duration-700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sovereignGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />   {/* Emerald */}
              <stop offset="50%" stopColor="#22D3EE" />  {/* Cyan */}
              <stop offset="100%" stopColor="#FACC15" /> {/* Gold */}
            </linearGradient>
            
            {/* 🔱 BLOOM (Only for the NY iPhones) */}
            {!isLowEnd && (
              <filter id="abr-bloom">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            )}
          </defs>

          {/* 🔱 THE OUTER SHIELD (Vector - Scales to 200 inches without loss) */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "linear" }}
            d="M50 5L92 28V72L50 95L8 72V28L50 5Z"
            fill="none"
            stroke="url(#sovereignGradient)"
            strokeWidth={isLowEnd ? "4" : "3"} // Na malé Nokii uděláme linku silnější pro viditelnost
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={!isLowEnd ? "url(#abr-bloom)" : "none"}
          />

          {/* 🔱 THE CORE CORE (The 100% Integrity Pulse) */}
          <motion.path
            animate={!isLowEnd ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
            d="M50 32L66 41V59L50 68L34 59V41L50 32Z"
            fill="url(#sovereignGradient)"
            className="filter group-hover:brightness-125 transition-all duration-500"
          />
        </svg>
      </div>

      {/* 🔱 ABR TEXT SCALE */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] text-[#22D3EE]/50 group-hover:text-[#22D3EE] transition-all duration-500">
          {isLowEnd ? "Sovereign" : "Sovereign Sanctuary"}
        </span>
      </div>
    </div>
  );
};

export default SovereignLogo;