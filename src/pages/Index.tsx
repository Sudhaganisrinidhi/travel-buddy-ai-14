import { useState } from 'react';
import { City } from '@/data/indianCities';
import { getTransportOptions, TransportOption } from '@/data/transportData';
import { generateItinerary, DayPlan } from '@/data/itineraryData';
import CitySearch from '@/components/CitySearch';
import TransportCard from '@/components/TransportCard';
import ItineraryView from '@/components/ItineraryView';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import AccommodationSection from '@/components/AccommodationSection';
import TravelMap from '@/components/TravelMap';
import { Search, Users, CalendarDays, MapPin, Route, IndianRupee, CalendarClock, Bed } from 'lucide-react';

const Index = () => {
  const [from, setFrom] = useState<City | null>(null);
  const [to, setTo] = useState<City | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(3);
  const [searched, setSearched] = useState(false);
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'transport' | 'itinerary' | 'budget' | 'stay'>('transport');

  const handleSearch = () => {
    if (!from || !to) return;
    const options = getTransportOptions(from, to);
    setTransportOptions(options);
    setSelectedTransport(null);
    // Default itinerary based on first transport arrival
    const defaultArrival = options.length > 0 ? options[0].arrival : "10:00";
    const itin = generateItinerary(to, days, defaultArrival);
    setItinerary(itin);
    setSearched(true);
    setActiveTab('transport');
  };

  // When user selects transport, recalculate itinerary with that arrival time
  const handleSelectTransport = (idx: number) => {
    setSelectedTransport(idx);
    if (to && transportOptions[idx]) {
      const arrivalTime = transportOptions[idx].arrival;
      const itin = generateItinerary(to, days, arrivalTime);
      setItinerary(itin);
    }
  };

  const selectedPrice = selectedTransport !== null ? transportOptions[selectedTransport]?.price || 0 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-8 w-8" />
            <h1 className="text-3xl font-extrabold tracking-tight">TripTailor</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Plan your journey across India — buses, trains, flights, budget & itinerary
          </p>

          {/* Search Form */}
          <div className="bg-card/95 backdrop-blur rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <CitySearch label="From" placeholder="e.g. Warangal, Hyderabad" value={from} onChange={setFrom} />
              <CitySearch label="To" placeholder="e.g. Kochi, Kerala, Munnar" value={to} onChange={setTo} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Travelers</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <select value={travelers} onChange={e => setTravelers(Number(e.target.value))} className="w-full py-3 px-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-primary">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Days</label>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <select value={days} onChange={e => setDays(Number(e.target.value))} className="w-full py-3 px-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-primary">
                    {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} {n === 1 ? 'day' : 'days'}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleSearch} disabled={!from || !to} className="px-8 py-3 gradient-hero text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Routes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="container mx-auto px-4 py-8">
          <TravelMap from={from} to={to} />

          {/* Tabs */}
          <div className="flex gap-1 mt-6 mb-6 border-b border-border overflow-x-auto">
            {([
              { id: 'transport' as const, label: 'Transport', icon: Route },
              { id: 'itinerary' as const, label: 'Itinerary', icon: CalendarClock },
              { id: 'stay' as const, label: 'Stay & Food', icon: Bed },
              { id: 'budget' as const, label: 'Budget', icon: IndianRupee },
            ]).map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'transport' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{from?.name} → {to?.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{transportOptions.length} options — click to select, then book via official sites</p>
              <div className="grid gap-3 md:grid-cols-2">
                {transportOptions.map((opt, idx) => (
                  <TransportCard key={idx} option={opt} selected={selectedTransport === idx} onSelect={() => handleSelectTransport(idx)} />
                ))}
              </div>
              {selectedTransport !== null && (
                <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground">
                  ✅ Selected: <strong>{transportOptions[selectedTransport].operator}</strong> — arrives at {transportOptions[selectedTransport].arrival}. Itinerary updated accordingly.
                </div>
              )}
              {transportOptions.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">No transport options found. Try different cities.</div>
              )}
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{days}-Day Itinerary for {to?.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedTransport !== null
                  ? `Based on arrival at ${transportOptions[selectedTransport].arrival} — click 🔗 to open locations in Google Maps`
                  : 'Select a transport option to auto-adjust schedule times. Click 🔗 for Google Maps.'
                }
              </p>
              <ItineraryView plans={itinerary} />
            </div>
          )}

          {activeTab === 'stay' && to && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Stay & Food in {to.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">Hotels, restaurants & places — click to open in Google Maps</p>
              <AccommodationSection city={to} />
            </div>
          )}

          {activeTab === 'budget' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Budget for {to?.name} Trip</h2>
              <BudgetBreakdown transportCost={selectedPrice || (transportOptions[0]?.price || 1500)} days={days} travelers={travelers} />
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Plan Your Trip</h2>
            <p className="text-muted-foreground">Search for routes between any Indian cities. Type a city name or state like "Kerala" to find cities.</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["Warangal → Kochi", "Hyderabad → Munnar", "Delhi → Goa", "Bengaluru → Alleppey"].map(route => (
                <span key={route} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">{route}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
