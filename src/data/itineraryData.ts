import { City } from './indianCities';

export interface ItineraryItem {
  time: string;
  activity: string;
  type: 'travel' | 'sightseeing' | 'food' | 'rest' | 'activity';
  cost: number;
  location?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  items: ItineraryItem[];
  totalCost: number;
}

const cityAttractions: Record<string, { places: string[]; food: string[]; activities: string[] }> = {
  "Kochi": {
    places: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace", "Jewish Synagogue", "Marine Drive"],
    food: ["Kerala Sadya lunch", "Fish curry at Fort Kochi", "Appam & stew breakfast"],
    activities: ["Kathakali show", "Backwater boat ride", "Spice market visit"],
  },
  "Munnar": {
    places: ["Tea Gardens", "Eravikulam National Park", "Mattupetty Dam", "Top Station", "Attukal Waterfalls"],
    food: ["Local Kerala meals", "Tea tasting at plantation", "Street food at Munnar town"],
    activities: ["Tea plantation tour", "Trekking", "Elephant safari"],
  },
  "Alleppey": {
    places: ["Alleppey Beach", "Backwaters", "Marari Beach", "Pathiramanal Island", "Krishnapuram Palace"],
    food: ["Houseboat lunch (fish fry)", "Toddy shop experience", "Fresh seafood dinner"],
    activities: ["Houseboat stay", "Kayaking", "Village tour"],
  },
  "Thiruvananthapuram": {
    places: ["Padmanabhaswamy Temple", "Kovalam Beach", "Napier Museum", "Ponmudi Hill Station"],
    food: ["Puttu & kadala curry", "Seafood at Kovalam", "Banana chips shopping"],
    activities: ["Beach surfing", "Ayurvedic spa", "Temple visit"],
  },
  "Wayanad": {
    places: ["Edakkal Caves", "Banasura Dam", "Chembra Peak", "Soochipara Falls", "Thirunelli Temple"],
    food: ["Bamboo rice", "Kerala meals", "Tribal food experience"],
    activities: ["Trekking to Chembra Peak", "Bamboo rafting", "Night safari"],
  },
  "Thekkady": {
    places: ["Periyar Wildlife Sanctuary", "Spice Plantation", "Chellarkovil Viewpoint"],
    food: ["Spice-infused meals", "Bamboo chicken", "Local restaurant dinner"],
    activities: ["Periyar boat ride", "Spice plantation tour", "Bamboo rafting"],
  },
  "Hyderabad": {
    places: ["Charminar", "Golconda Fort", "Hussain Sagar", "Ramoji Film City", "Salar Jung Museum"],
    food: ["Hyderabadi Biryani at Paradise", "Irani chai & Osmania biscuit", "Haleem (seasonal)"],
    activities: ["Old city walk", "Laser show at Golconda", "Shopping at Laad Bazaar"],
  },
  "Warangal": {
    places: ["Warangal Fort", "Thousand Pillar Temple", "Ramappa Temple", "Pakhal Lake"],
    food: ["Telangana meals", "Local biryani", "Street food"],
    activities: ["Temple hopping", "Lake visit", "Heritage walk"],
  },
};

const defaultAttractions = {
  places: ["City Center", "Main Temple/Church", "Local Market", "Park/Garden", "Museum"],
  food: ["Local breakfast", "Traditional lunch", "Street food dinner"],
  activities: ["City walk", "Shopping", "Cultural experience"],
};

export function generateItinerary(destination: City, days: number, arrivalTime: string = "10:00"): DayPlan[] {
  const attractions = cityAttractions[destination.name] || defaultAttractions;
  const plans: DayPlan[] = [];

  for (let d = 1; d <= days; d++) {
    const items: ItineraryItem[] = [];
    const isFirstDay = d === 1;
    const isLastDay = d === days;

    if (isFirstDay) {
      items.push({ time: arrivalTime, activity: `Arrive at ${destination.name}`, type: 'travel', cost: 0 });
      items.push({ time: addTime(arrivalTime, 1), activity: "Check-in to hotel & freshen up", type: 'rest', cost: 0 });
      items.push({ time: addTime(arrivalTime, 2), activity: attractions.food[0] || "Lunch at local restaurant", type: 'food', cost: 300 });
      items.push({ time: addTime(arrivalTime, 3.5), activity: `Visit ${attractions.places[0]}`, type: 'sightseeing', cost: 200 });
      items.push({ time: addTime(arrivalTime, 5.5), activity: `Explore ${attractions.places[1] || "nearby area"}`, type: 'sightseeing', cost: 150 });
      items.push({ time: "19:30", activity: attractions.food[2] || "Dinner at restaurant", type: 'food', cost: 400 });
      items.push({ time: "21:00", activity: "Return to hotel & rest", type: 'rest', cost: 0 });
    } else if (isLastDay) {
      items.push({ time: "07:00", activity: "Wake up & breakfast at hotel", type: 'food', cost: 200 });
      items.push({ time: "08:30", activity: `Visit ${attractions.places[d % attractions.places.length]}`, type: 'sightseeing', cost: 200 });
      items.push({ time: "10:30", activity: "Souvenir shopping", type: 'activity', cost: 500 });
      items.push({ time: "12:00", activity: "Check-out & lunch", type: 'food', cost: 350 });
      items.push({ time: "14:00", activity: `Depart from ${destination.name}`, type: 'travel', cost: 0 });
    } else {
      items.push({ time: "07:00", activity: attractions.food[d % attractions.food.length] || "Breakfast", type: 'food', cost: 250 });
      items.push({ time: "08:30", activity: `Visit ${attractions.places[(d * 2) % attractions.places.length]}`, type: 'sightseeing', cost: 250 });
      items.push({ time: "11:00", activity: attractions.activities[d % attractions.activities.length] || "Activity", type: 'activity', cost: 500 });
      items.push({ time: "13:00", activity: attractions.food[(d + 1) % attractions.food.length] || "Lunch", type: 'food', cost: 350 });
      items.push({ time: "14:30", activity: "Rest / free time", type: 'rest', cost: 0 });
      items.push({ time: "16:00", activity: `Explore ${attractions.places[(d * 2 + 1) % attractions.places.length]}`, type: 'sightseeing', cost: 200 });
      items.push({ time: "18:00", activity: attractions.activities[(d + 1) % attractions.activities.length] || "Evening activity", type: 'activity', cost: 300 });
      items.push({ time: "20:00", activity: "Dinner", type: 'food', cost: 400 });
      items.push({ time: "21:30", activity: "Return to hotel", type: 'rest', cost: 0 });
    }

    const totalCost = items.reduce((sum, i) => sum + i.cost, 0);
    plans.push({
      day: d,
      title: isFirstDay ? `Arrival & First Impressions` : isLastDay ? `Departure Day` : `Day ${d} - Full Exploration`,
      items,
      totalCost,
    });
  }

  return plans;
}

function addTime(base: string, hoursToAdd: number): string {
  const [h, m] = base.split(':').map(Number);
  const totalMinutes = h * 60 + m + hoursToAdd * 60;
  const newH = Math.floor(totalMinutes / 60) % 24;
  const newM = Math.round(totalMinutes % 60);
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}
