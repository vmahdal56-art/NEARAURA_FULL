import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: { title: "GLOBAL RESET IN", days: "DAYS", hours: "HOURS", min: "MIN", sec: "SEC" },
  CZ: { title: "GLOBÁLNÍ RESET ZA", days: "DNÍ", hours: "HODIN", min: "MIN", sec: "SEK" },
  DE: { title: "GLOBALER RESET IN", days: "TAGE", hours: "STDN", min: "MIN", sec: "SEK" }
};

export default function LaunchTimer() {
  const { lang } = useLanguage();
  const txt = T[lang];
  const [timeLeft, setTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0});

  useEffect(() => {
    const timer = setInterval(() => {
        const diff = new Date("2026-12-31").getTime() - new Date().getTime();
        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-zinc-900 py-3 z-50 hidden md:flex justify-center items-center gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <span className="text-[10px] font-black text-[#cd5c09] uppercase tracking-[0.2em] animate-pulse">{txt.title}</span>
        <div className="flex gap-4 text-white font-mono text-xl font-bold">
            <div>{timeLeft.days} <span className="text-[9px] text-zinc-600 block text-center">{txt.days}</span></div>:
            <div>{timeLeft.hours} <span className="text-[9px] text-zinc-600 block text-center">{txt.hours}</span></div>:
            <div>{timeLeft.minutes} <span className="text-[9px] text-zinc-600 block text-center">{txt.min}</span></div>:
            <div className="text-[#cd5c09]">{timeLeft.seconds} <span className="text-[9px] text-zinc-600 block text-center">{txt.sec}</span></div>
        </div>
    </div>
  );
}