import { TransportOption } from '@/data/transportData';
import { Bus, Train, Plane, Clock, IndianRupee } from 'lucide-react';

interface TransportCardProps {
  option: TransportOption;
  selected: boolean;
  onSelect: () => void;
}

const modeIcons = {
  bus: Bus,
  train: Train,
  flight: Plane,
};

const modeColors = {
  bus: 'bg-travel-green/10 text-travel-green border-travel-green/30',
  train: 'bg-primary/10 text-primary border-primary/30',
  flight: 'bg-travel-coral/10 text-travel-coral border-travel-coral/30',
};

const TransportCard = ({ option, selected, onSelect }: TransportCardProps) => {
  const Icon = modeIcons[option.mode];

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${modeColors[option.mode]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-foreground capitalize">{option.mode}</div>
            <div className="text-sm text-muted-foreground">{option.operator}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 font-bold text-foreground">
            <IndianRupee className="h-4 w-4" />
            {option.price.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-muted-foreground">per person</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {option.duration}
        </div>
        <div className="text-muted-foreground">
          {option.departure} → {option.arrival}
        </div>
      </div>

      {option.note && (
        <div className="mt-2 text-xs text-travel-sun font-medium bg-travel-sun/10 px-2 py-1 rounded inline-block">
          {option.note}
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        {option.from} → {option.to}
      </div>
    </button>
  );
};

export default TransportCard;
