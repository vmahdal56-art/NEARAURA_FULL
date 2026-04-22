import React from 'react';
import { useNavigate } from 'react-router-dom';

const RootsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-6 font-mono relative pb-32 overflow-y-auto">
      
      <div className="w-full text-center py-8 z-10">
         <h1 className="text-4xl md:text-6xl font-black italic text-zinc-500 mb-2 tracking-tighter">
           ANCESTRAL <span className="text-blue-500">ROOTS</span>
         </h1>
      </div>

      <div className="max-w-4xl w-full space-y-12 z-10 flex flex-col items-center">
        
        {/* 1. GESTAPO A PRABABICKA */}
        <div className="bg-zinc-950 p-8 md:p-12 text-center border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] w-full">
            <div className="bg-red-900/30 text-red-500 font-black tracking-widest uppercase text-xs inline-block px-4 py-1 mb-4 border border-red-800">
                ⚠️ ANCESTRAL DEFENSE PROTOCOL ⚠️
            </div>
            <p className="text-zinc-400 text-base md:text-lg italic uppercase font-bold mb-6">
               Už seděl v Mercedesu s Gestapákem. Prababička ho vytáhla za límec a zařvala do hlavně pušky:
            </p>
            <p className="text-5xl md:text-8xl font-[1000] text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-2xl">
              "TEN JE NÁŠ!!!"
            </p>
            <p className="text-zinc-500 font-bold text-[10px] uppercase">
              (HE WAS ALREADY SITTING IN THE MERCEDES WITH THE GESTAPO OFFICER. GREAT-GRANDMOTHER PULLED HIM OUT BY THE COLLAR AND SCREAMED INTO THE GUN BARREL: "THAT ONE IS OURS!!!")
            </p>
            <p className="text-red-500 font-black tracking-[0.5em] text-xs uppercase animate-pulse mt-4">
               END OF COWARDS. TRUTH PREVAILS.
            </p>
        </div>

        {/* 2. BÁNOV DIALEKT */}
        <div className="border-l-8 border-orange-600 p-8 bg-zinc-950 shadow-xl w-full">
            <h3 className="text-orange-600 font-black mb-4 text-[10px] tracking-widest uppercase"> { ">>> BÁNOV DIALECT" } </h3>
            <p className="text-xl italic font-black mb-4 leading-tight uppercase text-white">
              "ŠUA SEM ŠUA NAŠUA SEM KUS SKUA, NEBYUO TO SKUO, BYUA TO TIHUA, TOŽ SEM S TÝM ŠVIHUA"
            </p>
            <p className="text-zinc-500 font-bold text-[10px] uppercase">
              (I WENT, I WENT, I FOUND A PIECE OF GLASS, IT WASN'T GLASS, IT WAS A BRICK, SO I THREW IT)
            </p>
        </div>

        {/* 3. NIVNICKÝ OGAR */}
        <div className="border-l-8 border-emerald-500 p-8 bg-zinc-950 shadow-xl w-full">
            <h3 className="text-emerald-500 font-black mb-4 text-[10px] tracking-widest uppercase"> { ">>> NIVNICKÝ OGAR" } </h3>
            <p className="text-lg italic font-black mb-4 leading-tight uppercase text-zinc-200">
              "ŠEL JSEM KOLEM VĚTROLAMU A ČUCHAL JSEM TY SMRADY ZE SILÁŽE Z POLA A UDĚLALO SA MNE Z TOHO DOBŘE..."
            </p>
            <p className="text-zinc-500 font-bold text-[9px] uppercase">
              EN: "I WALKED PAST THE WINDBREAK AND SMELLED THE SILAGE FROM THE FIELD AND IT MADE ME FEEL GOOD..."
            </p>
        </div>

        {/* 4. EVOLUTION / DEVOLUTION */}
        <div className="w-full bg-zinc-950 border-x-4 border-blue-600 p-8 text-center mt-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <h3 className="text-blue-500 font-black text-3xl uppercase mb-6 tracking-tighter">
               EVOLUTION / DEVOLUTION
            </h3>
            <div className="flex flex-wrap justify-center items-center text-xs md:text-sm font-mono text-zinc-500 mb-6 gap-2 md:gap-4">
                <span>COMMODORE 64</span><span className="text-zinc-700">→</span>
                <span>286</span><span className="text-zinc-700">→</span>
                <span>386</span><span className="text-zinc-700">→</span>
                <span>486</span><span className="text-zinc-700">→</span>
                <span>PENTIUM</span><span className="text-zinc-700">→</span>
                <span>CORE i9</span><span className="text-zinc-700">→</span>
                <span className="text-red-500 font-bold animate-pulse">QUANTUM?</span>
            </div>
            <div className="border-t-2 border-b-2 border-white py-6 my-6 bg-blue-900/10">
                <h4 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter animate-pulse">
                    ZPĚTNÝ CHOD &gt;&gt;
                </h4>
                <p className="text-emerald-500 text-xl md:text-2xl font-bold uppercase mt-2">
                    STROMY A SLUNCE (TREES & SUN)
                </p>
            </div>
            <p className="text-zinc-400 text-[10px] uppercase">
               (REVERSE GEAR. THE ULTIMATE COMPUTING POWER IS NATURE. SILICON IS DUST. TA!)
            </p>
        </div>

        {/* 5. KPZ */}
        <div className="bg-zinc-900 border-x-8 border-orange-500 p-8 w-full text-center shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <h3 className="text-orange-500 font-black text-3xl uppercase mb-2 tracking-tighter">
                KPZ: KRABIČKA POSLEDNÍ ZÁCHRANY
            </h3>
            <p className="text-white font-bold uppercase text-sm mb-2">
                SIRKY. ŠPENDLÍK. KŘÍDA. PROVÁZEK. 5 KČS. ŽÁDNÁ WIFI, JEN PŘEŽITÍ.
            </p>
            <p className="text-zinc-500 text-[10px] uppercase mt-1">
               (ULTIMATE SURVIVAL KIT. MATCHES, PIN, CHALK, STRING, COIN. NO WIFI, JUST SURVIVAL.)
            </p>
        </div>

        {/* 6. SOUL FUEL: BÁNOVSKÁ KYSELICA & SLIVOVICA */}
        <div className="bg-zinc-900 border-y-4 border-white p-8 w-full text-center">
            <h3 className="text-white font-black text-3xl uppercase mb-4 tracking-tighter">
                SOUL FUEL: BÁNOVSKÁ KYSELICA & SLIVOVICA
            </h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="text-center">
                    <p className="text-zinc-300 font-bold uppercase text-lg mb-1">BÁNOVSKÁ KYSELICA</p>
                    <p className="text-zinc-500 text-xs uppercase">HUSTÁ ZELŇAČKA. KROUŽALA. HŘÍBKY. CIBULA.</p>
                    <p className="text-zinc-600 text-[9px] uppercase">(THICK SAUERKRAUT SOUP. LIFE GIVER.)</p>
                </div>
                <div className="text-2xl text-white font-black">+</div>
                <div className="text-center">
                    <p className="text-zinc-300 font-bold uppercase text-lg mb-1">SLIVOVICA (52%)</p>
                    <p className="text-zinc-500 text-xs uppercase">BÍLÉ ZLATO. LÉK NA VŠECHNO. DEZINFEKCE DUŠE.</p>
                    <p className="text-zinc-600 text-[9px] uppercase">(PLUM BRANDY. THE WHITE GOLD. MEDICINE. SOUL CLEANER.)</p>
                </div>
            </div>
        </div>

        {/* 7. MATRIX ORIGIN & SCI-FI */}
        <div className="w-full bg-zinc-950 border-x-4 border-green-600 p-8 text-center mt-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
             <h3 className="text-green-500 font-black text-3xl uppercase mb-6 tracking-tighter">
                THE MATRIX ORIGIN & SCI-FI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* MERKUR */}
                <div className="col-span-1 md:col-span-2 border-2 border-green-900 p-4 bg-black/50">
                     <h4 className="text-white text-xl font-bold uppercase mb-2">TV MERKUR & PODPRAHOVÉ SIGNÁLY</h4>
                     <p className="text-zinc-300 text-sm uppercase font-bold">TAM TO ZAČALO. ŠROUBEK PO ŠROUBKU. PAN VAJÍČKO. ZRNĚNÍ. PROGRAMOVÁNÍ MOZKU.</p>
                     <p className="text-zinc-500 text-[10px] uppercase mt-1">
                       (IT STARTED HERE. TV MERKUR. SUBLIMINAL MESSAGES. BRAIN PROGRAMMING.)
                     </p>
                </div>
                {/* VISITORS */}
                <div className="col-span-1 md:col-span-2 border-2 border-purple-500 p-4 relative">
                     <div className="absolute -top-3 left-4 bg-black px-2 text-purple-500 font-bold text-xs">CML ERROR FIXED</div>
                     <h4 className="text-white text-xl font-bold uppercase mb-2">DRCHLÍK & CML</h4>
                     <p className="text-zinc-300 text-sm uppercase font-bold">"HOVOŘÍ CML." DRCHLÍK VRAZÍ DŘEVĚNÝ KLÍN. STROJ JE ZACHRÁNĚN. TY JSI DRCHLÍK.</p>
                     <p className="text-zinc-500 text-[10px] uppercase mt-1">
                       (CENTRAL BRAIN SPEAKS. DRCHLIK INSERTS WOODEN WEDGE. SYSTEM SAVED. NO AMAROUNY JELLY.)
                     </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">AMAROUNY & KARAS</h4>
                    <p className="text-zinc-400 text-sm uppercase">JÍDLO BUDOUCNOSTI: TŘEPACÍ ROSOL. KARAS PIVO NENAHRADÍŠ.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (AMAROUNY JELLY FOOD. TASTELESS FUTURE. YOU CAN'T REPLACE BEER.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">SEŠIT ADAM</h4>
                    <p className="text-zinc-400 text-sm uppercase">ROVNICE SVĚTA V OBYČEJNÉM SEŠITĚ. KLÍČ K PŘEŽITÍ.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (THE ADAM NOTEBOOK. THE WORLD EQUATION. KEY TO SURVIVAL.)
                    </p>
                </div>
            </div>
        </div>

        {/* 8. ANALOG ARSENAL */}
        <div className="w-full bg-zinc-950 border-x-4 border-yellow-600 p-8 text-center mt-8 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
             <h3 className="text-yellow-500 font-black text-3xl uppercase mb-6 tracking-tighter">
                THE ANALOG ARSENAL
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">CÉČKA (THE CURRENCY)</h4>
                    <p className="text-zinc-400 text-sm uppercase">PLASTOVÉ ZLATO. DÝKY. SVÍTÍCÍ. MĚNA VÝCHODNÍHO BLOKU.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (C-LINKS. PLASTIC GOLD. THE HARDEST CURRENCY.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">KOLA: UKRAJINA & SOBI 20</h4>
                    <p className="text-zinc-400 text-sm uppercase">UKRAJINA: NEZNIČITELNÝ TANK. SOBI 20: CHOPPER STYL.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (UKRAJINA: INDESTRUCTIBLE FARM TANK. SOBI 20: CZECH CHOPPER.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">PRAKY A SKOBIČÁKY</h4>
                    <p className="text-zinc-400 text-sm uppercase">ZBRANĚ HROMADNÉ SRANDY. MUNICE: COKOLI.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (SLINGSHOTS & STAPLE GUNS. AMMO: ANYTHING.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">DRAK & PARAŠUTISTA</h4>
                    <p className="text-zinc-400 text-sm uppercase">DOMA SLEPENÝ DRAK. IGEITOVÝ PADÁK.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (HOMEMADE KITE. PLASTIC PARATROOPER TOY. HOPE AND GRAVITY.)
                    </p>
                </div>
            </div>
        </div>

        {/* 9. THE GOLDEN FUND */}
        <div className="w-full bg-zinc-950 border-x-4 border-cyan-600 p-8 text-center mt-8 shadow-[0_0_30px_rgba(8,145,178,0.3)]">
             <h3 className="text-cyan-500 font-black text-3xl uppercase mb-6 tracking-tighter">
                THE GOLDEN FUND / ZLATÝ FOND
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* KRTEČEK */}
                <div className="col-span-1 md:col-span-2 border-4 border-cyan-500 bg-black p-6 relative overflow-hidden">
                    <h4 className="text-cyan-500 text-2xl font-black uppercase mb-2">KRTEČEK (LITTLE MOLE)</h4>
                    <p className="text-zinc-300 text-sm uppercase font-bold">ZDENĚK MILER. PŘEDCHŮDCE TELETUBBIES. HELE, HELE! KALHOTKY S KAPSKAMI.</p>
                    <p className="text-zinc-500 text-[10px] uppercase mt-1">
                       (THE ORIGINAL INFLUENCER. PREDECESSOR TO TELETUBBIES. LOOK! PANTS WITH POCKETS.)
                    </p>
                </div>

                {/* NU POGODI */}
                <div className="col-span-1 md:col-span-2 border-4 border-red-500 bg-black p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest">TOP STROP</div>
                    <h4 className="text-red-500 text-2xl font-black uppercase mb-2">JEN POČKEJ, ZAJÍCI! (DIGIHRY)</h4>
                    <p className="text-zinc-300 text-sm uppercase font-bold">VLK NA LANĚ. CIGÁRO V HUBĚ. PÁD Z BALKÓNU. SMÍCHY PADALY BARÁKY.</p>
                    <p className="text-zinc-500 text-[10px] uppercase mt-1">
                       (WOLF ON ROPE. CIGARETTE IN MOUTH. FALL FROM BALCONY. BUILDINGS FELL FROM LAUGHTER.)
                    </p>
                </div>

                {/* MRAZÍK */}
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">MRAZÍK (FATHER FROST)</h4>
                    <p className="text-zinc-400 text-sm uppercase">JE TI TEPLO DĚVČE? NASTĚNKA. IVÁNEK. MARFUŠA LOUSKÁ OŘECHY ZUBAMA.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (ARE YOU WARM, GIRL? IVAN THE NARCISSIST. MARFUSHA CRACKING NUTS WITH TEETH.)
                    </p>
                </div>

                {/* POPELKA */}
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">TŘI OŘÍŠKY PRO POPELKU</h4>
                    <p className="text-zinc-400 text-sm uppercase">LIBUŠKA. JURÁŠEK. KUŠE A ŠIŠKA. ŽÁDNÝ DISNEY, ALE SNÍH A SKUTEČNÁ LÁSKA.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (NO DISNEY. REAL SNOW. CROSSBOW SKILLS. PURE MAGIC.)
                    </p>
                </div>

                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">KRKONOŠSKÉ POHÁDKY</h4>
                    <p className="text-zinc-400 text-sm uppercase">TRAUTENBERK: HIMELHERGOTDONRVETRKRUCJAJSELEMENT! KRAKONOŠ. SOJKA.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (FEUDAL LORD VS MOUNTAIN SPIRIT. THE JAY BIRD DRONE.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">HORÁČEK A PAŽOUT</h4>
                    <p className="text-zinc-400 text-sm uppercase">ZÁKLAD MANUÁLU GEEZERA. KDO NEZNÁ, NEPOCHOPÍ. MACH A ŠEBESTOVÁ.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (GEEZER MANUAL FOUNDATION. THE CLASS REBELS.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">JÁJA A PÁJA</h4>
                    <p className="text-zinc-400 text-sm uppercase">DĚDA LEBEDA. ŘEZNÍK KRKOVIČKA. BOJ O ŽIVANEC.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (GENERATIONAL WARFARE. GRANDPA VS. THE GREEDY BUTCHER.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">POTKALI SE U KOLÍNA</h4>
                    <p className="text-zinc-400 text-sm uppercase">PANE, POJĎTE, BUDEME SI HRÁT! VYPEČENÍ MEDVĚDI.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (HEY SIR, LET'S PLAY! THE BEARS OF KOLIN. DECEPTIVELY CUTE.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">RODINA SMOLÍKOVA</h4>
                    <p className="text-zinc-400 text-sm uppercase">MZPU. LÁDÍNEK A JEHO RAKETA. GÁBI.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (THE MÉZGA FAMILY. FUTURE COMMUNICATOR.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">PAT A MAT</h4>
                    <p className="text-zinc-400 text-sm uppercase">MANUÁLNÍ ZRUČNOST LEVEL: EXPERT. A JE TO!</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (DIY DISASTERS. A JE TO!)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">RÁKOSNÍČEK & KŘEMÍLEK</h4>
                    <p className="text-zinc-400 text-sm uppercase">ZA MLHOU HUSTOU TAK, ŽE BY SE DALA KRÁJET. PAŘEZOVÁ CHALOUPKA.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (BEHIND THE THICK FOG. THE POND SPIRIT. MOSS AND FERN.)
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-xl font-bold uppercase mb-2">TIP A TAP</h4>
                    <p className="text-zinc-400 text-sm uppercase">DVA PSI, CO VĚDÍ, KUDY BĚŽET. DOBRODRUŽSTVÍ.</p>
                    <p className="text-zinc-600 text-[10px] uppercase mt-1">
                       (TWO DOGS, ONE MISSION. ADVENTURE SEEKERS.)
                    </p>
                </div>
            </div>
        </div>

        {/* LEMON KEITH'S VERDICT (THE FINAL WORD) */}
        <div className="w-full bg-zinc-950 border-y-8 border-red-600 p-8 text-center mt-12 shadow-[0_0_50px_rgba(220,38,38,0.4)]">
            <h3 className="text-red-500 font-black text-3xl md:text-5xl uppercase mb-4 tracking-tighter leading-none">
                ⚡ LEMON KEITH'S VERDICT ⚡
            </h3>
            <p className="text-white text-lg md:text-2xl font-black uppercase tracking-wide leading-tight mb-4">
                "TOHLE NENÍ NOSTALGIE. TOHLE JE MANUÁL. POKUD SE SVĚT ZÍTRA ZHROUTÍ (CML ERROR), TI, CO ZNAJÍ DRCHLÍKA, KPZ A VLKA, PŘEŽIJÍ. TI OSTATNÍ, CO JEDÍ AMAROUNY... TI JSOU V HÁJI."
            </p>
            <div className="w-20 h-1 bg-red-600 mx-auto my-4"></div>
            <p className="text-zinc-500 text-xs md:text-sm uppercase font-bold tracking-widest">
                (THIS AIN'T NOSTALGIA. THIS IS A MANUAL. IF THE WORLD CRASHES TOMORROW, THOSE WHO KNOW DRCHLIK, THE SURVIVAL KIT AND THE WOLF WILL SURVIVE. THE OTHERS EATING AMAROUNY JELLY... THEY ARE DOOMED.)
            </p>
        </div>

        {/* 10. FUTURE / REVERSE GEAR */}
        <div className="w-full bg-zinc-900 p-8 border-t-4 border-[#F97316] text-center mt-8">
             <h3 className="text-[#F97316] font-black text-3xl uppercase mb-4 tracking-tighter">
                FUTURE: REVERSE GEAR
            </h3>
            <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">NO PLAST • NO CHEMS</p>
            <p className="text-zinc-400 text-sm uppercase">ZPÁTKY KE KOŘENŮM. PŘÍRODA NEPOTŘEBUJE PLAST.</p>
            <p className="text-zinc-600 text-[10px] uppercase mt-1">
               (BACK TO ROOTS. NATURE NEEDS NO PLASTIC.)
            </p>
        </div>

      </div>

      <button onClick={() => navigate('/gateway')} className="mt-16 border-2 border-zinc-800 px-14 py-5 text-xs font-black tracking-widest text-zinc-500 hover:text-white hover:border-white transition-all uppercase">
        { "← RETURN TO GATEWAY" }
      </button>

      
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-2 z-[200] text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
            <p className="text-[#22D3EE] font-black italic uppercase text-[10px] tracking-[0.3em] animate-pulse">
               V PAMÁTCE JARMILY A HELENKY — NEARAURA.COM — PRAVDA A LÁSKA VÍTĚZÍ
            </p>
         </div>
      </div>
    </div>
  );
};
export default RootsPage;