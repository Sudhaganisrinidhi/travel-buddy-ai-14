import { useState, useRef, useEffect } from 'react';
import { searchCities, City } from '@/data/indianCities';
import { MapPin } from 'lucide-react';

interface CitySearchProps {
  label: string;
  placeholder: string;
  value: City | null;
  onChange: (city: City) => void;
}

const CitySearch = ({ label, placeholder, value, onChange }: CitySearchProps) => {
  const [query, setQuery] = useState(value?.name || '');
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    const res = searchCities(val);
    setResults(res);
    setOpen(res.length > 0);
  };

  const selectCity = (city: City) => {
    setQuery(city.name);
    onChange(city);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex-1">
      <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => handleInput(e.target.value)}
          onFocus={() => query && handleInput(query)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((city) => (
            <button
              key={`${city.name}-${city.state}`}
              onClick={() => selectCity(city)}
              className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-foreground">{city.name}</span>
                <span className="text-sm text-muted-foreground ml-2">{city.state}</span>
              </div>
              <div className="flex gap-1">
                {city.hasAirport && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">✈️</span>}
                {city.hasRailway && <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">🚂</span>}
              </div>
            </button>
          ))}
          {results.length === 0 && query.length > 0 && (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              Tip: Search by city name or state (e.g. "Kerala", "Kochi")
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
