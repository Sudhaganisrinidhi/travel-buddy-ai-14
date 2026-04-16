import { City } from '@/data/indianCities';
import { getCityHotels, getCityFoodPlaces, getCityPlaces } from '@/data/itineraryData';
import { Bed, Utensils, MapPin, ExternalLink, ShoppingBag, Car } from 'lucide-react';

interface AccommodationSectionProps {
  city: City;
}

function getMakeMyTripHotelUrl(hotelName: string, cityName: string): string {
  return `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(cityName)}&checkin=&checkout=&roomStayQualifier=2e0e&searchText=${encodeURIComponent(hotelName)}&_uCurrency=INR`;
}

function getGoibiboUrl(cityName: string): string {
  return `https://www.goibibo.com/hotels/hotels-in-${cityName.toLowerCase().replace(/\s+/g, '-')}/`;
}

function getGoogleMapsUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}`;
}

function getBookingComUrl(cityName: string): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cityName)}&lang=en-us`;
}

const AccommodationSection = ({ city }: AccommodationSectionProps) => {
  const hotels = getCityHotels(city);
  const foodPlaces = getCityFoodPlaces(city);
  const sightPlaces = getCityPlaces(city);

  return (
    <div className="space-y-6">
      {/* Hotels */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Bed className="h-5 w-5 text-travel-coral" />
            Hotels & Stays in {city.name}
          </h3>
          <div className="flex gap-2">
            <a href={getGoibiboUrl(city.name)} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" /> Goibibo
            </a>
            <a href={getBookingComUrl(city.name)} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-travel-coral/10 text-travel-coral px-3 py-1.5 rounded-full hover:bg-travel-coral/20 transition-colors flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" /> Booking.com
            </a>
          </div>
        </div>
        <div className="grid gap-2">
          {hotels.map((hotel, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-travel-coral/10 text-travel-coral">
                  <Bed className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{hotel.name}</div>
                  <div className="text-xs text-muted-foreground">{hotel.priceRange}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={hotel.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:text-primary transition-colors" title="View on Maps">
                  <MapPin className="h-3.5 w-3.5" />
                </a>
                <a href={getMakeMyTripHotelUrl(hotel.name, city.name)} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                  Book <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Cabs */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          Local Cabs & Autos in {city.name}
        </h3>
        <div className="grid gap-2 md:grid-cols-3">
          {[
            { name: 'Rapido', desc: 'Bike & Auto', url: 'https://www.rapido.bike/', color: 'bg-travel-sun/10 text-travel-sun' },
            { name: 'Uber', desc: 'Auto, Go, Premier', url: `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${city.lat}&pickup[longitude]=${city.lng}`, color: 'bg-foreground/10 text-foreground' },
            { name: 'Ola', desc: 'Auto, Mini, Prime', url: 'https://book.olacabs.com/', color: 'bg-travel-green/10 text-travel-green' },
          ].map((cab) => (
            <a key={cab.name} href={cab.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group">
              <div className={`p-2 rounded-lg ${cab.color}`}>
                <Car className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{cab.name}</div>
                <div className="text-xs text-muted-foreground">{cab.desc}</div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
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
            <a key={i} href={place.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group">
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
            <a key={i} href={place.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors group">
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
