// cityContext.ts
'use client'
import { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import cities from '@/utils/cities';

interface CityContextProps {
  currentCity: string;
  setCurrentCity: (city: string) => void;
}

const CityContext = createContext<CityContextProps | null>(null);

const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [currentCity, setCurrentCity] = useState('moscow'); // defaultCity = 'moscow'

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/');
      const cityFromUrl = pathSegments[1]; // Первый сегмент пути
      if (cityFromUrl && cities[cityFromUrl]) {
        setCurrentCity(cityFromUrl);
      }
    }
  }, [pathname]);

  return (
    <CityContext.Provider value={{ currentCity, setCurrentCity }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityProvider, CityContext };
