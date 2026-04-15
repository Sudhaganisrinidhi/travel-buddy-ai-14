import { City } from '@/data/indianCities';
import { getCityHotels, getCityFoodPlaces, getCityPlaces } from '@/data/itineraryData';
import { Bed, Utensils, MapPin, ExternalLink } from 'lucide-react';

interface AccommodationSectionProps {
  city: City;
}

const AccommodationSection = ({ city }: AccommodationSectionProps) => {
  const hotels = getCityHotels(city);
  const foodPlaces = getCityFoodPlaces(city);
  const sightPlaces = getCityPlaces(city);

  return (
    <div className="space-y-6">
      {/* Hotels */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Bed className="h-5 w-5 text-travel-coral" />
          Hotels & Stays in {city.name}
        </h3>
        <div className="grid gap-2">
          {hotels.map((hotel, i) => (
            <a
              key={i}
              href={hotel.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-travel-coral/10 text-travel-coral">
                  <Bed className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{hotel.name}</div>
                  <div className="text-xs text-muted-foreground">{hotel.priceRange}</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Food Places */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-travel-sun" />
          Food & Restaurants ({foodPlaces.length} places)
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          {foodPlaces.map((place, i) => (
            <a
              key={i}
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-travel-sun/10 text-travel-sun">
                  <Utensils className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-foreground">{place.name}</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Sightseeing Places */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-travel-green" />
          Places to Visit ({sightPlaces.length} spots)
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          {sightPlaces.map((place, i) => (
            <a
              key={i}
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-travel-green/10 text-travel-green">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-foreground">{place.name}</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationSection;
