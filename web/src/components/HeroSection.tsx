import React, { useState } from 'react';
import { Play, Apple, Globe, Mail, ShieldCheck, Share2, Users } from 'lucide-react';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <section className="relative w-full py-16 bg-black text-white overflow-hidden border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* STATUS */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 mb-10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Aura SI (ASI) Protocol • Online</span>
        </div>

        {/* === ACTION AREA: THE BIG 5 === */}
        <div className="flex flex-col items-center gap-12">
          
          {/* ROW 1: APPS & DEMO (3 Buttons) */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* 1. ANDROID */}
            <a href="https://play.google.com/store/apps/details?id=com.aura.app" target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-6 py-4 bg-[#F97316] text-black rounded-xl hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <Play className="w-6 h-6 fill-current" />
              <div className="text-left">
                 <div className="text-[9px] font-black uppercase tracking-wider opacity-80">Get it on</div>
                 <div className="text-sm font-black leading-none">Google Play</div>
              </div>
            </a>
            
            {/* 2. iOS */}
            <button disabled className="group flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xl cursor-not-allowed opacity-60 grayscale">
              <Apple className="w-6 h-6 fill-current" />
              <div className="text-left">
                 <div className="text-[9px] font-bold uppercase tracking-wider">Coming Soon</div>
                 <div className="text-sm font-bold leading-none">App Store</div>
              </div>
            </button>

            {/* 3. DEMO APP */}
            <a href="/demo" className="group flex items-center gap-3 px-6 py-4 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700">
              <Globe className="w-6 h-6" />
              <div className="text-left">
                 <div className="text-[9px] font-bold uppercase tracking-wider opacity-80">Launch</div>
                 <div className="text-sm font-bold leading-none">Web Demo</div>
              </div>
            </a>
          </div>

          {/* ROW 2: WAITLIST FORM (Centerpiece) */}
          <div className="w-full max-w-lg mx-auto relative">
            {!joined ? (
              <form onSubmit={handleWaitlist} className="relative flex items-center group shadow-2xl">
                <Mail className="absolute left-5 w-5 h-5 text-zinc-500 group-focus-within:text-[#F97316] transition-colors" />
                <input 
                  type="email" 
                  placeholder="Enter email to join the Orchard..." 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-14 pr-36 py-5 bg-black border-2 border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] font-mono text-sm transition-all" 
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 bg-zinc-800 text-white rounded-xl hover:bg-[#F97316] hover:text-black font-black uppercase text-xs tracking-widest transition-all">
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 p-5 bg-green-900/10 border border-green-900 rounded-2xl text-green-500 font-mono text-sm font-bold animate-pulse">
                 <ShieldCheck className="w-6 h-6" /><span>YOU ARE ON THE LIST, GEEZER!</span>
              </div>
            )}
          </div>

          {/* ROW 3: REFERRALS (The 5th Element) */}
          <div className="flex justify-center">
             <button className="flex items-center gap-3 px-8 py-3 rounded-full border border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE] hover:text-black transition-all uppercase font-black text-xs tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Users size={16} />
                Referrals Program (Earn Badges)
             </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;