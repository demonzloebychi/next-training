'use client';

import { useRouter } from 'next/navigation';
import cities from '@/utils/cities';

export default function CitySelector() {
  const router = useRouter();

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityKey = event.target.value;
    if (cityKey) {
      router.push(`/${cityKey}`);
    }
  };

  return (
    <select onChange={handleCityChange}>
      <option value="">Город</option>
      {Object.entries(cities).map(([key, city]) => (
        <option key={key} value={key}>
          {city.nominative}
        </option>
      ))}
    </select>
  );
}
