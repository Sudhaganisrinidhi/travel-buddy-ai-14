import { useState } from 'react';
import { City } from '@/data/indianCities';
import { getTransportOptions, TransportOption } from '@/data/transportData';
import { generateItinerary, DayPlan } from '@/data/itineraryData';
import CitySearch from '@/components/CitySearch';
import TransportCard from '@/components/TransportCard';
import ItineraryView from '@/components/ItineraryView';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import TravelMap from '@/components/TravelMap';
import { Search, Users, CalendarDays, MapPin, Route, IndianRupee, CalendarClock } from 'lucide-react';

const Index = () => {
  const [from, setFrom] = useState<City | null>(null);
  const [to, setTo] = useState<City | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(3);
  const [searched, setSearched] = useState(false);
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'transport' | 'itinerary' | 'budget'>('transport');

  const handleSearch = () => {
    if (!from || !to) return;
    const options = getTransportOptions(from, to);
    setTransportOptions(options);
    setSelectedTransport(null);
    const itin = generateItinerary(to, days);
    setItinerary(itin);
    setSearched(true);
    setActiveTab('transport');
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
              <CitySearch
                label="From"
                placeholder="e.g. Warangal, Hyderabad"
                value={from}
                onChange={setFrom}
              />
              <CitySearch
                label="To"
                placeholder="e.g. Kochi, Kerala, Munnar"
                value={to}
                onChange={setTo}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Travelers</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={travelers}
                    onChange={e => setTravelers(Number(e.target.value))}
                    className="w-full py-3 px-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Days</label>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={days}
                    onChange={e => setDays(Number(e.target.value))}
                    className="w-full py-3 px-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1,2,3,4,5,6,7].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'day' : 'days'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={!from || !to}
                className="px-8 py-3 gradient-hero text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
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
          {/* Map */}
          <TravelMap from={from} to={to} />

          {/* Tabs */}
          <div className="flex gap-2 mt-6 mb-6 border-b border-border">
            {([
              { id: 'transport' as const, label: 'Transport Options', icon: Route },
              { id: 'itinerary' as const, label: 'Day-wise Itinerary', icon: CalendarClock },
              { id: 'budget' as const, label: 'Budget Breakdown', icon: IndianRupee },
            ]).map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'transport' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {from?.name} → {to?.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {transportOptions.length} options found — buses, trains & flights
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {transportOptions.map((opt, idx) => (
                  <TransportCard
                    key={idx}
                    option={opt}
                    selected={selectedTransport === idx}
                    onSelect={() => setSelectedTransport(idx)}
                  />
                ))}
              </div>
              {transportOptions.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No transport options found. Try different cities.
                </div>
              )}
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {days}-Day Itinerary for {to?.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Time-wise schedule with activities, meals & sightseeing
              </p>
              <ItineraryView plans={itinerary} />
            </div>
          )}

          {activeTab === 'budget' && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Budget for {to?.name} Trip
              </h2>
              <BudgetBreakdown
                transportCost={selectedPrice || (transportOptions[0]?.price || 1500)}
                days={days}
                travelers={travelers}
              />
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Plan Your Trip</h2>
            <p className="text-muted-foreground">
              Search for routes between any Indian cities. Type a city name or even a state like "Kerala" to find cities in that state.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["Warangal → Kochi", "Hyderabad → Munnar", "Delhi → Goa", "Bengaluru → Alleppey"].map(route => (
                <span key={route} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
