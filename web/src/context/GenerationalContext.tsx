import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- DEFINICE SVĚTŮ DLE DNA ---
type WorldType = 'KIDS' | 'YOUTH' | 'ADULT' | 'RAINBOW' | null;

interface GenerationalContextType {
  world: WorldType;
  userAge: number;
  setWorld: (w: WorldType, age?: number) => void;
  hasSworn: boolean;
  markSworn: () => void;
  resetWorld: () => void;
}

const GenerationalContext = createContext<GenerationalContextType | undefined>(undefined);

export const GenerationalProvider = ({ children }: { children: ReactNode }) => {
  const [world, setWorldState] = useState<WorldType>(null);
  const [userAge, setUserAge] = useState<number>(0);
  const [hasSworn, setHasSworn] = useState(false);

  useEffect(() => {
    // SYNC S LOCALSTORAGE
    const savedWorld = localStorage.getItem('aura_world') as WorldType;
    const savedAge = localStorage.getItem('aura_user_age');
    const savedOath = localStorage.getItem('aura_sworn');
    
    if (savedWorld) setWorldState(savedWorld);
    if (savedAge) setUserAge(parseInt(savedAge, 10));
    if (savedOath === 'true') setHasSworn(true);
  }, []);

  const setWorld = (w: WorldType, age: number = 0) => {
    setWorldState(w);
    localStorage.setItem('aura_world', w || '');
    
    setUserAge(age);
    if (age > 0) localStorage.setItem('aura_user_age', age.toString());
    else localStorage.removeItem('aura_user_age');

    // RESET OATH PROTOKOLU
    setHasSworn(false);
    localStorage.removeItem('aura_sworn');
  };

  const markSworn = () => {
    setHasSworn(true);
    localStorage.setItem('aura_sworn', 'true');
  };

  const resetWorld = () => {
    setWorldState(null);
    setUserAge(0);
    setHasSworn(false);
    localStorage.removeItem('aura_world');
    localStorage.removeItem('aura_user_age');
    localStorage.removeItem('aura_sworn');
  };

  return (
    <GenerationalContext.Provider value={{ world, setWorld, userAge, hasSworn, markSworn, resetWorld }}>
      {children}
    </GenerationalContext.Provider>
  );
};

export const useGeneration = () => {
  const context = useContext(GenerationalContext);
  if (!context) throw new Error("useGeneration must be used within a GenerationalProvider");
  return context;
};