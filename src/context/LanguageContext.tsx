import React, { createContext, useContext, useState, ReactNode } from 'react';

// POCTIVÉ TYPY - PŘIDÁNA FR
export type LangType = 'EN' | 'CZ' | 'DE' | 'FR';

interface LanguageContextType {
  lang: LangType;
  setLang: (l: LangType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LangType>(() => {
    const saved = localStorage.getItem('aura_lang');
    return (saved === 'EN' || saved === 'CZ' || saved === 'DE' || saved === 'FR') ? saved : 'EN';
  });

  const setLang = (l: LangType) => {
    setLangState(l);
    localStorage.setItem('aura_lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Tohle je ta hláška, co ti teď vyskakuje!
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};