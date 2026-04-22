import React from 'react';
import { Twitter, Instagram, Youtube, Facebook, Linkedin, MessageCircle, Twitch } from 'lucide-react';

export default function SocialDock() {
  const icons = [
    { i: Twitter, c: 'hover:text-[#1DA1F2]' },
    { i: Instagram, c: 'hover:text-[#E1306C]' },
    { i: Youtube, c: 'hover:text-[#FF0000]' },
    { i: Facebook, c: 'hover:text-[#1877F2]' },
    { i: Linkedin, c: 'hover:text-[#0A66C2]' },
    { i: MessageCircle, c: 'hover:text-[#25D366]' }, // WhatsApp/Telegram
    { i: Twitch, c: 'hover:text-[#9146FF]' }
  ];

  return (
    <div className="flex gap-6 mt-10 justify-center md:justify-start">
      {icons.map((Icon, idx) => (
        <Icon.i key={idx} size={24} className={`text-slate-500 transition-colors cursor-pointer ${Icon.c}`} />
      ))}
    </div>
  );
}
