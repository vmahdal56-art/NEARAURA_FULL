import React from 'react';

type Props = { title: string; desc: string; iconPath: string; onClick?: () => void };

export const JuniorPanel = React.memo(({ title, desc, iconPath, onClick }: Props) => (
  <button
    onClick={onClick}
    className="border-4 border-zinc-800 bg-zinc-900 p-6 flex flex-col items-center text-center w-full
               active:scale-95 transition-transform duration-75 select-none hover:border-[#cd5c09]"
  >
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cd5c09" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
      <path d={iconPath} />
    </svg>
    <h3 className="text-2xl font-black uppercase text-white mb-2">{title}</h3>
    <p className="text-zinc-400 font-serif leading-tight">{desc}</p>
  </button>
));