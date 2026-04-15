import { useState } from 'react';
import { IndianRupee, Bed, Utensils, Bus, Ticket, ShoppingBag, Edit3 } from 'lucide-react';

interface BudgetBreakdownProps {
  transportCost: number;
  days: number;
  travelers: number;
}

const BudgetBreakdown = ({ transportCost, days, travelers }: BudgetBreakdownProps) => {
  const [userBudget, setUserBudget] = useState<number | null>(null);
  const [budgetInput, setBudgetInput] = useState('');
  const [editingBudget, setEditingBudget] = useState(false);

  const hotelPerNight = 1500;
  const foodPerDay = 800;
  const sightseeingPerDay = 500;
  const miscPerDay = 300;

  const hotelTotal = hotelPerNight * (days - 1) * Math.ceil(travelers / 2);
  const foodTotal = foodPerDay * days * travelers;
  const sightseeingTotal = sightseeingPerDay * days * travelers;
  const miscTotal = miscPerDay * days;
  const transportTotal = transportCost * travelers;
  const estimatedTotal = hotelTotal + foodTotal + sightseeingTotal + miscTotal + transportTotal;

  // If user entered a budget, scale everything proportionally
  const budget = userBudget || estimatedTotal;
  const scale = userBudget ? userBudget / estimatedTotal : 1;

  const items = [
    { label: "Transport", icon: Bus, amount: Math.round(transportTotal * scale), color: "bg-primary/10 text-primary", tip: scale < 0.7 ? "Consider bus over flight" : "" },
    { label: `Hotel (${days - 1} nights)`, icon: Bed, amount: Math.round(hotelTotal * scale), color: "bg-travel-coral/10 text-travel-coral", tip: scale < 0.7 ? "Try hostels/dormitories" : "" },
    { label: "Food & Drinks", icon: Utensils, amount: Math.round(foodTotal * scale), color: "bg-travel-sun/10 text-travel-sun", tip: scale < 0.7 ? "Eat at local dhabas" : "" },
    { label: "Sightseeing & Entry", icon: Ticket, amount: Math.round(sightseeingTotal * scale), color: "bg-travel-green/10 text-travel-green", tip: "" },
    { label: "Shopping & Misc", icon: ShoppingBag, amount: Math.round(miscTotal * scale), color: "bg-muted text-muted-foreground", tip: "" },
  ];

  const grandTotal = items.reduce((s, i) => s + i.amount, 0);

  const handleSetBudget = () => {
    const val = parseInt(budgetInput);
    if (val > 0) {
      setUserBudget(val);
      setEditingBudget(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <IndianRupee className="h-5 w-5 text-travel-sun" />
        Budget Estimate
      </h3>

      {/* User Budget Input */}
      <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
        {!editingBudget && !userBudget ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Enter your total budget for personalized breakdown</span>
            <button
              onClick={() => setEditingBudget(true)}
              className="text-sm font-medium text-primary flex items-center gap-1 hover:text-primary/80"
            >
              <Edit3 className="h-3.5 w-3.5" /> Set Budget
            </button>
          </div>
        ) : editingBudget ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">₹</span>
            <input
              type="number"
              value={budgetInput}
              onChange={e => setBudgetInput(e.target.value)}
              placeholder="e.g. 15000"
              className="flex-1 py-2 px-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSetBudget()}
            />
            <button
              onClick={handleSetBudget}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              Apply
            </button>
            <button
              onClick={() => setEditingBudget(false)}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              Your Budget: <strong className="text-primary">₹{userBudget?.toLocaleString('en-IN')}</strong>
              {scale < 0.8 && <span className="text-travel-coral ml-2 text-xs">(Tight budget - see tips below)</span>}
              {scale > 1.2 && <span className="text-travel-green ml-2 text-xs">(Comfortable budget ✓)</span>}
            </span>
            <button
              onClick={() => { setEditingBudget(true); setBudgetInput(String(userBudget || '')); }}
              className="text-sm font-medium text-primary flex items-center gap-1 hover:text-primary/80"
            >
              <Edit3 className="h-3.5 w-3.5" /> Change
            </button>
          </div>
        )}
      </div>

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
              {item.tip && userBudget && (
                <div className="text-xs text-travel-sun mt-0.5">💡 {item.tip}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <span className="font-bold text-foreground">Total Estimated Budget</span>
        <span className="text-xl font-bold text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
      </div>

      {userBudget && Math.abs(grandTotal - userBudget) > 100 && (
        <div className={`mt-2 text-sm ${grandTotal > userBudget ? 'text-travel-coral' : 'text-travel-green'}`}>
          {grandTotal > userBudget
            ? `⚠️ ₹${(grandTotal - userBudget).toLocaleString('en-IN')} over budget`
            : `✅ ₹${(userBudget - grandTotal).toLocaleString('en-IN')} under budget`
          }
        </div>
      )}
    </div>
  );
};

export default BudgetBreakdown;
