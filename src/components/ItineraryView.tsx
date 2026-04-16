import { DayPlan } from '@/data/itineraryData';
import { Clock, MapPin, Utensils, Camera, Bed, Activity, ExternalLink } from 'lucide-react';

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
}

const ItineraryView = ({ plans }: ItineraryViewProps) => {
  return (
    <div className="space-y-6">
      {plans.map((day) => (
        <div key={day.day} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-foreground">
              Day {day.day}: {day.title}
            </h3>
            <span className="text-sm font-medium text-travel-sun bg-travel-sun/10 px-3 py-1 rounded-full">
              ₹{day.totalCost.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-1">
            {day.items.map((item, idx) => {
              const Icon = typeIcons[item.type];
              const mapsUrl = item.mapsQuery
                ? `https://maps.google.com/maps?q=${encodeURIComponent(item.mapsQuery)}`
                : null;
              return (
                <div key={idx} className="flex items-start gap-3 py-2">
                  <div className="flex items-center gap-2 min-w-[60px]">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                  </div>
                  <div className={`p-1.5 rounded-md ${typeColors[item.type]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-foreground">{item.activity}</span>
                    {item.cost > 0 && (
                      <span className="text-xs text-muted-foreground">~₹{item.cost}</span>
                    )}
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryView;
