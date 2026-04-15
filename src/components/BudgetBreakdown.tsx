import { IndianRupee, Bed, Utensils, Bus, Ticket, ShoppingBag } from 'lucide-react';

interface BudgetBreakdownProps {
  transportCost: number;
  days: number;
  travelers: number;
}

const BudgetBreakdown = ({ transportCost, days, travelers }: BudgetBreakdownProps) => {
  const hotelPerNight = 1500;
  const foodPerDay = 800;
  const sightseeingPerDay = 500;
  const miscPerDay = 300;

  const hotelTotal = hotelPerNight * (days - 1) * Math.ceil(travelers / 2);
  const foodTotal = foodPerDay * days * travelers;
  const sightseeingTotal = sightseeingPerDay * days * travelers;
  const miscTotal = miscPerDay * days;
  const transportTotal = transportCost * travelers;
  const grandTotal = hotelTotal + foodTotal + sightseeingTotal + miscTotal + transportTotal;

  const items = [
    { label: "Transport", icon: Bus, amount: transportTotal, color: "bg-primary/10 text-primary" },
    { label: `Hotel (${days - 1} nights)`, icon: Bed, amount: hotelTotal, color: "bg-travel-coral/10 text-travel-coral" },
    { label: "Food & Drinks", icon: Utensils, amount: foodTotal, color: "bg-travel-sun/10 text-travel-sun" },
    { label: "Sightseeing & Entry", icon: Ticket, amount: sightseeingTotal, color: "bg-travel-green/10 text-travel-green" },
    { label: "Shopping & Misc", icon: ShoppingBag, amount: miscTotal, color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <IndianRupee className="h-5 w-5 text-travel-sun" />
        Budget Estimate
      </h3>
      <div className="text-sm text-muted-foreground mb-4">
        For {travelers} traveler{travelers > 1 ? 's' : ''}, {days} days
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const pct = Math.round((item.amount / grandTotal) * 100);
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${item.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">₹{item.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <span className="font-bold text-foreground">Total Estimated Budget</span>
        <span className="text-xl font-bold text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default BudgetBreakdown;
