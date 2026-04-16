import { useState } from 'react';
import { DayPlan } from '@/data/itineraryData';
import { Clock, MapPin, Utensils, Camera, Bed, Activity, ExternalLink, Plus, Timer, Car } from 'lucide-react';
import { City } from '@/data/indianCities';
import { getNearbySuggestions } from '@/data/itineraryData';
import { getCabOptions, CabOption } from '@/data/cabData';

const typeIcons = {
  travel: MapPin,
  sightseeing: Camera,
  food: Utensils,
  rest: Bed,
  activity: Activity,
};

const typeColors = {
  travel: 'bg-primary/10 text-primary',
  sightseeing: 'bg-travel-coral/10 text-travel-coral',
  food: 'bg-travel-sun/10 text-travel-sun',
  rest: 'bg-muted text-muted-foreground',
  activity: 'bg-travel-green/10 text-travel-green',
};

interface ItineraryViewProps {
  plans: DayPlan[];
  destination?: City | null;
}

const ItineraryView = ({ plans, destination }: ItineraryViewProps) => {
  const [extraTimeDay, setExtraTimeDay] = useState<number | null>(null);
  const [extraHours, setExtraHours] = useState<number>(2);
  const [suggestions, setSuggestions] = useState<{ name: string; query: string; type: string }[]>([]);
  const [showCabsFor, setShowCabsFor] = useState<string | null>(null);

  const handleExtraTime = (dayNum: number) => {
    if (extraTimeDay === dayNum) { setExtraTimeDay(null); setSuggestions([]); return; }
    setExtraTimeDay(dayNum);
    if (destination) {
      setSuggestions(getNearbySuggestions(destination, extraHours, dayNum));
    }
  };

  const handleHoursChange = (hours: number, dayNum: number) => {
    setExtraHours(hours);
    if (destination) setSuggestions(getNearbySuggestions(destination, hours, dayNum));
  };

  // Estimate ~5km between places in a city
  const cabOptions = destination ? getCabOptions('', '', destination.lat, destination.lng, destination.lat + 0.02, destination.lng + 0.02, 5) : [];

  return (
    <div className="space-y-6">
      {plans.map((day) => (
        <div key={day.day} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-foreground">Day {day.day}: {day.title}</h3>
            <span className="text-sm font-medium text-travel-sun bg-travel-sun/10 px-3 py-1 rounded-full">₹{day.totalCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="space-y-1">
            {day.items.map((item, idx) => {
              const Icon = typeIcons[item.type];
              const mapsUrl = item.mapsQuery ? `https://maps.google.com/maps?q=${encodeURIComponent(item.mapsQuery)}` : null;
              const showCabHere = item.type === 'sightseeing' || item.type === 'food';
              return (
                <div key={idx}>
                  <div className="flex items-start gap-3 py-2">
                    <div className="flex items-center gap-2 min-w-[60px]">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                    </div>
                    <div className={`p-1.5 rounded-md ${typeColors[item.type]}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-foreground">{item.activity}</span>
                      {item.cost > 0 && <span className="text-xs text-muted-foreground">~₹{item.cost}</span>}
                      {mapsUrl && (
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors flex-shrink-0" title="Open in Google Maps">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {showCabHere && (
                        <button
                          onClick={() => setShowCabsFor(showCabsFor === `${day.day}-${idx}` ? null : `${day.day}-${idx}`)}
                          className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full hover:text-primary transition-colors flex items-center gap-1"
                        >
                          <Car className="h-3 w-3" /> Cab
                        </button>
                      )}
                    </div>
                  </div>
                  {showCabsFor === `${day.day}-${idx}` && (
                    <div className="ml-[76px] mb-2 p-3 bg-muted/30 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-2">🚗 Get a cab to this location:</p>
                      <div className="grid gap-1.5 sm:grid-cols-3">
                        {cabOptions.slice(0, 3).map((cab, ci) => (
                          <a key={ci} href={cab.bookingUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg bg-card hover:bg-muted/50 transition-colors text-xs group">
                            <Car className="h-3.5 w-3.5 text-primary" />
                            <div className="flex-1">
                              <span className="font-medium text-foreground">{cab.provider} {cab.type}</span>
                              <span className="text-muted-foreground ml-1">{cab.estimatedFare} · {cab.estimatedTime}</span>
                            </div>
                            <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Extra Time Section */}
          <div className="mt-4 border-t border-border pt-3">
            <button onClick={() => handleExtraTime(day.day)}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${extraTimeDay === day.day ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              <Plus className="h-4 w-4" /> Extra time left? Get suggestions
            </button>

            {extraTimeDay === day.day && (
              <div className="mt-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Timer className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground font-medium">How many extra hours?</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(h => (
                      <button key={h} onClick={() => handleHoursChange(h, day.day)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${extraHours === h ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{h}h</button>
                    ))}
                  </div>
                </div>
                {suggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">With {extraHours} extra hours, you could visit:</p>
                    {suggestions.map((s, i) => (
                      <a key={i} href={`https://maps.google.com/maps?q=${encodeURIComponent(s.query)}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg bg-card hover:bg-muted/50 transition-colors group">
                        <div className={`p-1 rounded ${s.type === 'food' ? 'bg-travel-sun/10 text-travel-sun' : s.type === 'activity' ? 'bg-travel-green/10 text-travel-green' : 'bg-travel-coral/10 text-travel-coral'}`}>
                          {s.type === 'food' ? <Utensils className="h-3.5 w-3.5" /> : s.type === 'activity' ? <Activity className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-sm text-foreground flex-1">{s.name}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryView;
