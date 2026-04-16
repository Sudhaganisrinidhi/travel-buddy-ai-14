import { City } from './indianCities';

export interface ItineraryItem {
  time: string;
  activity: string;
  type: 'travel' | 'sightseeing' | 'food' | 'rest' | 'activity';
  cost: number;
  location?: string;
  mapsQuery?: string; // Google Maps search query
}

export interface DayPlan {
  day: number;
  title: string;
  items: ItineraryItem[];
  totalCost: number;
}

interface CityData {
  places: { name: string; query: string }[];
  food: { name: string; query: string }[];
  activities: { name: string; query: string }[];
  hotels: { name: string; query: string; priceRange: string }[];
}

const cityData: Record<string, CityData> = {
  "Kochi": {
    places: [
      { name: "Fort Kochi Beach", query: "Fort Kochi Beach, Kochi" },
      { name: "Chinese Fishing Nets", query: "Chinese Fishing Nets, Fort Kochi" },
      { name: "Mattancherry Palace", query: "Mattancherry Palace, Kochi" },
      { name: "Jewish Synagogue Kochi", query: "Paradesi Synagogue, Kochi" },
      { name: "Marine Drive Kochi", query: "Marine Drive, Ernakulam, Kochi" },
      { name: "St. Francis Church", query: "St Francis Church, Fort Kochi" },
      { name: "Bolgatty Palace", query: "Bolgatty Palace, Kochi" },
      { name: "Hill Palace Museum", query: "Hill Palace Museum, Tripunithura" },
      { name: "Cherai Beach", query: "Cherai Beach, Kochi" },
      { name: "Lulu Mall Kochi", query: "Lulu Mall, Kochi" },
    ],
    food: [
      { name: "Kayees Rahmathulla Hotel (Biryani)", query: "Kayees Rahmathulla Hotel, Kochi" },
      { name: "Dal Roti Fort Kochi", query: "Dal Roti, Fort Kochi" },
      { name: "Fusion Bay Marine Drive", query: "Fusion Bay, Marine Drive, Kochi" },
      { name: "Dhe Puttu Restaurant", query: "Dhe Puttu, Kochi" },
      { name: "Paragon Restaurant Kochi", query: "Paragon Restaurant, Kochi" },
      { name: "Fort House Restaurant", query: "Fort House Restaurant, Fort Kochi" },
      { name: "Grand Pavilion", query: "Grand Pavilion, MG Road, Kochi" },
      { name: "Kashi Art Cafe", query: "Kashi Art Cafe, Fort Kochi" },
      { name: "Sri Krishna Inn (Dosa)", query: "Sri Krishna Inn, Kochi" },
      { name: "Sree Muruga Cafe", query: "Sree Muruga Cafe, Ernakulam" },
    ],
    activities: [
      { name: "Kathakali Show", query: "Kerala Kathakali Centre, Fort Kochi" },
      { name: "Backwater Boat Ride", query: "Kochi Backwater Cruise" },
      { name: "Spice Market Visit", query: "Mattancherry Spice Market, Kochi" },
      { name: "Sunset Cruise at Marine Drive", query: "Marine Drive Boat Jetty, Kochi" },
    ],
    hotels: [
      { name: "Zostel Kochi", query: "Zostel Kochi, Fort Kochi", priceRange: "₹500-800/night" },
      { name: "Old Harbour Hotel", query: "Old Harbour Hotel, Fort Kochi", priceRange: "₹3000-5000/night" },
      { name: "Fragrant Nature Kochi", query: "Fragrant Nature Kochi", priceRange: "₹4000-7000/night" },
      { name: "Hotel Excellency Kochi", query: "Hotel Excellency, Kochi", priceRange: "₹1200-2000/night" },
      { name: "Trident Cochin", query: "Trident Hotel, Cochin", priceRange: "₹5000-8000/night" },
    ],
  },
  "Munnar": {
    places: [
      { name: "Tea Gardens Munnar", query: "Munnar Tea Gardens" },
      { name: "Eravikulam National Park", query: "Eravikulam National Park, Munnar" },
      { name: "Mattupetty Dam", query: "Mattupetty Dam, Munnar" },
      { name: "Top Station Munnar", query: "Top Station, Munnar" },
      { name: "Attukal Waterfalls", query: "Attukal Waterfalls, Munnar" },
      { name: "Echo Point Munnar", query: "Echo Point, Munnar" },
      { name: "Kundala Lake", query: "Kundala Lake, Munnar" },
      { name: "Pothamedu View Point", query: "Pothamedu View Point, Munnar" },
      { name: "Blossom Park", query: "Blossom International Park, Munnar" },
      { name: "Photo Point Munnar", query: "Photo Point, Munnar" },
    ],
    food: [
      { name: "Rapsy Restaurant", query: "Rapsy Restaurant, Munnar" },
      { name: "SN Restaurant Munnar", query: "SN Restaurant, Munnar" },
      { name: "Saravana Bhavan Munnar", query: "Saravana Bhavan, Munnar" },
      { name: "Al Buhari Munnar", query: "Al Buhari Restaurant, Munnar" },
      { name: "Copper Castle Restaurant", query: "Copper Castle Restaurant, Munnar" },
    ],
    activities: [
      { name: "Tea Plantation Tour", query: "KDHP Tea Museum, Munnar" },
      { name: "Trekking at Meesapulimala", query: "Meesapulimala Trek, Munnar" },
      { name: "Shikara Ride at Kundala", query: "Kundala Lake Boating, Munnar" },
    ],
    hotels: [
      { name: "Zostel Munnar", query: "Zostel Munnar", priceRange: "₹500-900/night" },
      { name: "Bracknell Forest Munnar", query: "Bracknell Forest, Munnar", priceRange: "₹2500-4000/night" },
      { name: "The Fog Munnar", query: "The Fog Munnar Resort", priceRange: "₹3000-6000/night" },
      { name: "Green Valley Vista", query: "Green Valley Vista, Munnar", priceRange: "₹1500-2500/night" },
    ],
  },
  "Alleppey": {
    places: [
      { name: "Alleppey Beach", query: "Alappuzha Beach" },
      { name: "Alleppey Backwaters", query: "Alleppey Backwaters" },
      { name: "Marari Beach", query: "Marari Beach, Alleppey" },
      { name: "Pathiramanal Island", query: "Pathiramanal Island, Alleppey" },
      { name: "Krishnapuram Palace", query: "Krishnapuram Palace, Alleppey" },
      { name: "Ambalapuzha Temple", query: "Ambalapuzha Sri Krishna Temple" },
      { name: "Revi Karunakaran Museum", query: "Revi Karunakaran Museum, Alleppey" },
      { name: "Alleppey Lighthouse", query: "Alleppey Lighthouse" },
    ],
    food: [
      { name: "Mushroom Alleppey", query: "Mushroom Restaurant, Alleppey" },
      { name: "Halais Restaurant", query: "Halais Restaurant, Alleppey" },
      { name: "Dreamers Cafe", query: "Dreamers Cafe & Restaurant, Alleppey" },
      { name: "Thaff Restaurant", query: "Thaff Restaurant, Alleppey" },
      { name: "Harbour Restaurant", query: "Harbour Restaurant, Alleppey" },
    ],
    activities: [
      { name: "Houseboat Stay", query: "Alleppey Houseboat, Kerala" },
      { name: "Kayaking Backwaters", query: "Kayaking Alleppey Backwaters" },
      { name: "Village Tour Alleppey", query: "Alleppey Village Tour" },
    ],
    hotels: [
      { name: "Art Hostel Alleppey", query: "Art Hostel, Alleppey", priceRange: "₹500-800/night" },
      { name: "Ramada Alleppey", query: "Ramada Resort, Alleppey", priceRange: "₹5000-8000/night" },
      { name: "Palm Grove Lake Resort", query: "Palm Grove Lake Resort, Alleppey", priceRange: "₹2500-4000/night" },
    ],
  },
  "Hyderabad": {
    places: [
      { name: "Charminar", query: "Charminar, Hyderabad" },
      { name: "Golconda Fort", query: "Golconda Fort, Hyderabad" },
      { name: "Hussain Sagar Lake", query: "Hussain Sagar, Hyderabad" },
      { name: "Ramoji Film City", query: "Ramoji Film City, Hyderabad" },
      { name: "Salar Jung Museum", query: "Salar Jung Museum, Hyderabad" },
      { name: "Birla Mandir", query: "Birla Mandir, Hyderabad" },
      { name: "Chowmahalla Palace", query: "Chowmahalla Palace, Hyderabad" },
      { name: "NTR Gardens", query: "NTR Gardens, Hyderabad" },
      { name: "Durgam Cheruvu", query: "Durgam Cheruvu, Hyderabad" },
      { name: "Nehru Zoo Park", query: "Nehru Zoological Park, Hyderabad" },
    ],
    food: [
      { name: "Paradise Biryani", query: "Paradise Restaurant, Secunderabad" },
      { name: "Bawarchi Restaurant", query: "Bawarchi Restaurant, RTC Cross Roads, Hyderabad" },
      { name: "Shah Ghouse", query: "Shah Ghouse Hotel, Hyderabad" },
      { name: "Nimrah Cafe (Irani Chai)", query: "Nimrah Cafe, Charminar, Hyderabad" },
      { name: "Chutneys Restaurant", query: "Chutneys Restaurant, Hyderabad" },
      { name: "Shadab Restaurant", query: "Hotel Shadab, Hyderabad" },
      { name: "Pista House", query: "Pista House, Hyderabad" },
      { name: "Cream Stone", query: "Cream Stone, Hyderabad" },
      { name: "Sarvi Restaurant", query: "Sarvi Restaurant, Hyderabad" },
      { name: "Cafe Bahar", query: "Cafe Bahar, Hyderabad" },
    ],
    activities: [
      { name: "Laad Bazaar Shopping", query: "Laad Bazaar, Charminar, Hyderabad" },
      { name: "Laser Show at Golconda", query: "Golconda Fort Light and Sound Show" },
      { name: "Tank Bund Walk", query: "Tank Bund, Hyderabad" },
      { name: "Old City Heritage Walk", query: "Charminar Old City Walk, Hyderabad" },
    ],
    hotels: [
      { name: "Zostel Hyderabad", query: "Zostel Hyderabad", priceRange: "₹500-800/night" },
      { name: "Novotel Hyderabad", query: "Novotel Hyderabad Convention Centre", priceRange: "₹4000-7000/night" },
      { name: "Treebo Trip Hotel", query: "Treebo Trip Hotel, Hyderabad", priceRange: "₹1200-2000/night" },
      { name: "ITC Kakatiya", query: "ITC Kakatiya, Hyderabad", priceRange: "₹7000-12000/night" },
      { name: "OYO Rooms Hyderabad", query: "OYO Rooms, Hyderabad", priceRange: "₹800-1500/night" },
    ],
  },
  "Warangal": {
    places: [
      { name: "Warangal Fort", query: "Warangal Fort" },
      { name: "Thousand Pillar Temple", query: "Thousand Pillar Temple, Warangal" },
      { name: "Ramappa Temple", query: "Ramappa Temple, Warangal" },
      { name: "Pakhal Lake", query: "Pakhal Lake, Warangal" },
      { name: "Bhadrakali Temple", query: "Bhadrakali Temple, Warangal" },
      { name: "Kakatiya Musical Garden", query: "Kakatiya Musical Garden, Warangal" },
      { name: "Warangal Zoo", query: "Kakatiya Zoological Park, Warangal" },
      { name: "Eturnagaram Wildlife", query: "Eturnagaram Wildlife Sanctuary" },
    ],
    food: [
      { name: "Hotel Suprabhat", query: "Hotel Suprabhat, Warangal" },
      { name: "Sri Sai Grand", query: "Sri Sai Grand, Warangal" },
      { name: "Haritha Hotel", query: "Haritha Hotel, Warangal" },
      { name: "Bawarchi Warangal", query: "Bawarchi Restaurant, Warangal" },
      { name: "Pakka Hyderabadi Biryani", query: "Pakka Hyderabadi, Warangal" },
    ],
    activities: [
      { name: "Heritage Walk", query: "Warangal Heritage Walk" },
      { name: "Ramappa Lake Boating", query: "Ramappa Lake, Warangal" },
      { name: "Shopping at Govinda Rajula Gutta", query: "Govinda Rajula Gutta, Warangal" },
    ],
    hotels: [
      { name: "Hotel Ratna", query: "Hotel Ratna, Warangal", priceRange: "₹800-1200/night" },
      { name: "Haritha Kakatiya Hotel", query: "Haritha Kakatiya Hotel, Warangal", priceRange: "₹1500-2500/night" },
      { name: "Hotel Ashoka Warangal", query: "Hotel Ashoka, Warangal", priceRange: "₹1000-1800/night" },
    ],
  },
  "Guntur": {
    places: [
      { name: "Kondaveedu Fort", query: "Kondaveedu Fort, Guntur" },
      { name: "Amaravathi Buddhist Stupa", query: "Amaravathi Buddhist Stupa, Guntur" },
      { name: "Undavalli Caves", query: "Undavalli Caves, Guntur" },
      { name: "Mangalagiri Temple", query: "Mangalagiri Panakala Narasimha Temple" },
      { name: "Kotappakonda Temple", query: "Kotappakonda Temple, Guntur" },
      { name: "Uppalapadu Bird Sanctuary", query: "Uppalapadu Bird Sanctuary, Guntur" },
      { name: "Prakasam Barrage", query: "Prakasam Barrage, Vijayawada" },
      { name: "Ethipothala Waterfalls", query: "Ethipothala Waterfalls, Guntur" },
      { name: "Nagarjuna Sagar Dam", query: "Nagarjuna Sagar Dam" },
      { name: "Phansalkar Museum", query: "Phansalkar Museum, Guntur" },
    ],
    food: [
      { name: "Ram Ki Bandi (Dosa)", query: "Ram Ki Bandi, Guntur" },
      { name: "Babai Hotel (Guntur Biryani)", query: "Babai Hotel, Guntur" },
      { name: "Sri Sai Ram Parlour", query: "Sri Sai Ram Parlour, Guntur" },
      { name: "Hotel Sindoora", query: "Hotel Sindoora, Guntur" },
      { name: "Guntur Idly", query: "Guntur Famous Idly, Guntur" },
      { name: "Subbayya Gari Hotel", query: "Subbayya Gari Hotel, Guntur" },
      { name: "Karachi Bakery Guntur", query: "Karachi Bakery, Guntur" },
      { name: "Sri Krishna Lunch Home", query: "Sri Krishna Lunch Home, Guntur" },
      { name: "Minerva Coffee Shop", query: "Minerva Coffee Shop, Guntur" },
      { name: "Chutneys Guntur", query: "Chutneys, Guntur" },
    ],
    activities: [
      { name: "Guntur Chilli Market Visit", query: "Guntur Mirchi Yard" },
      { name: "Amaravathi Heritage Walk", query: "Amaravathi Heritage, Guntur" },
      { name: "Boating at Nagarjuna Sagar", query: "Nagarjuna Sagar Boating" },
    ],
    hotels: [
      { name: "Hotel Namo", query: "Hotel Namo, Guntur", priceRange: "₹800-1500/night" },
      { name: "Hotel Sindoora Grand", query: "Hotel Sindoora Grand, Guntur", priceRange: "₹1200-2000/night" },
      { name: "Fortune Murali Park", query: "Fortune Murali Park, Guntur", priceRange: "₹3000-5000/night" },
      { name: "Hotel Vijay Grand", query: "Hotel Vijay Grand, Guntur", priceRange: "₹1000-1800/night" },
      { name: "OYO Rooms Guntur", query: "OYO Rooms, Guntur", priceRange: "₹600-1200/night" },
    ],
  },
};

const defaultData: CityData = {
  places: [
    { name: "City Center", query: "" },
    { name: "Main Temple", query: "" },
    { name: "Local Market", query: "" },
    { name: "Park/Garden", query: "" },
    { name: "Museum", query: "" },
  ],
  food: [
    { name: "Local Restaurant (Breakfast)", query: "" },
    { name: "Traditional Thali (Lunch)", query: "" },
    { name: "Street Food Area (Dinner)", query: "" },
  ],
  activities: [
    { name: "City Walk", query: "" },
    { name: "Shopping", query: "" },
    { name: "Cultural Experience", query: "" },
  ],
  hotels: [
    { name: "Budget Hotel", query: "", priceRange: "₹800-1200/night" },
    { name: "Mid-Range Hotel", query: "", priceRange: "₹2000-3500/night" },
  ],
};

function getGoogleMapsUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}`;
}

export function getCityHotels(city: City): { name: string; mapsUrl: string; priceRange: string }[] {
  const data = cityData[city.name] || defaultData;
  return data.hotels.map(h => ({
    name: h.name,
    mapsUrl: getGoogleMapsUrl(h.query || `${h.name}, ${city.name}`),
    priceRange: h.priceRange,
  }));
}

export function getCityFoodPlaces(city: City): { name: string; mapsUrl: string }[] {
  const data = cityData[city.name] || defaultData;
  return data.food.map(f => ({
    name: f.name,
    mapsUrl: getGoogleMapsUrl(f.query || `${f.name}, ${city.name}`),
  }));
}

export function getCityPlaces(city: City): { name: string; mapsUrl: string }[] {
  const data = cityData[city.name] || defaultData;
  return data.places.map(p => ({
    name: p.name,
    mapsUrl: getGoogleMapsUrl(p.query || `${p.name}, ${city.name}`),
  }));
}

export function generateItinerary(destination: City, days: number, arrivalTime: string = "10:00"): DayPlan[] {
  const data = cityData[destination.name] || defaultData;
  const plans: DayPlan[] = [];

  for (let d = 1; d <= days; d++) {
    const items: ItineraryItem[] = [];
    const isFirstDay = d === 1;
    const isLastDay = d === days;

    if (isFirstDay) {
      const place0 = data.places[0];
      const place1 = data.places[1];
      const food0 = data.food[0];
      const food2 = data.food[2] || data.food[0];
      items.push({ time: arrivalTime, activity: `Arrive at ${destination.name}`, type: 'travel', cost: 0 });
      items.push({ time: addTime(arrivalTime, 0.5), activity: "Check-in to hotel & freshen up", type: 'rest', cost: 0 });
      items.push({ time: addTime(arrivalTime, 1.5), activity: `Lunch at ${food0.name}`, type: 'food', cost: 300, mapsQuery: food0.query || `${food0.name}, ${destination.name}` });
      items.push({ time: addTime(arrivalTime, 3), activity: `Visit ${place0.name}`, type: 'sightseeing', cost: 200, mapsQuery: place0.query || `${place0.name}, ${destination.name}` });
      items.push({ time: addTime(arrivalTime, 5), activity: `Explore ${place1.name}`, type: 'sightseeing', cost: 150, mapsQuery: place1.query || `${place1.name}, ${destination.name}` });
      items.push({ time: "19:30", activity: `Dinner at ${food2.name}`, type: 'food', cost: 400, mapsQuery: food2.query || `${food2.name}, ${destination.name}` });
      items.push({ time: "21:00", activity: "Return to hotel & rest", type: 'rest', cost: 0 });
    } else if (isLastDay) {
      const placeIdx = d % data.places.length;
      const foodIdx = d % data.food.length;
      items.push({ time: "07:00", activity: "Wake up & breakfast at hotel", type: 'food', cost: 200 });
      items.push({ time: "08:30", activity: `Visit ${data.places[placeIdx].name}`, type: 'sightseeing', cost: 200, mapsQuery: data.places[placeIdx].query || `${data.places[placeIdx].name}, ${destination.name}` });
      items.push({ time: "10:30", activity: "Souvenir shopping", type: 'activity', cost: 500 });
      items.push({ time: "12:00", activity: `Lunch at ${data.food[foodIdx].name}`, type: 'food', cost: 350, mapsQuery: data.food[foodIdx].query || `${data.food[foodIdx].name}, ${destination.name}` });
      items.push({ time: "14:00", activity: `Depart from ${destination.name}`, type: 'travel', cost: 0 });
    } else {
      const p1 = data.places[(d * 2) % data.places.length];
      const p2 = data.places[(d * 2 + 1) % data.places.length];
      const f1 = data.food[d % data.food.length];
      const f2 = data.food[(d + 1) % data.food.length];
      const a1 = data.activities[d % data.activities.length];
      const a2 = data.activities[(d + 1) % data.activities.length];
      items.push({ time: "07:00", activity: `Breakfast at ${f1.name}`, type: 'food', cost: 250, mapsQuery: f1.query || `${f1.name}, ${destination.name}` });
      items.push({ time: "08:30", activity: `Visit ${p1.name}`, type: 'sightseeing', cost: 250, mapsQuery: p1.query || `${p1.name}, ${destination.name}` });
      items.push({ time: "11:00", activity: a1.name, type: 'activity', cost: 500, mapsQuery: a1.query || `${a1.name}, ${destination.name}` });
      items.push({ time: "13:00", activity: `Lunch at ${f2.name}`, type: 'food', cost: 350, mapsQuery: f2.query || `${f2.name}, ${destination.name}` });
      items.push({ time: "14:30", activity: "Rest / free time", type: 'rest', cost: 0 });
      items.push({ time: "16:00", activity: `Explore ${p2.name}`, type: 'sightseeing', cost: 200, mapsQuery: p2.query || `${p2.name}, ${destination.name}` });
      items.push({ time: "18:00", activity: a2.name, type: 'activity', cost: 300, mapsQuery: a2.query || `${a2.name}, ${destination.name}` });
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

export function getNearbySuggestions(city: City, extraHours: number, dayNum: number): { name: string; query: string; type: string }[] {
  const data = cityData[city.name] || defaultData;
  const suggestions: { name: string; query: string; type: string }[] = [];
  
  // Pick places not likely already in that day's itinerary
  const offset = dayNum * 3;
  
  if (extraHours >= 1) {
    const placeIdx = (offset + 4) % data.places.length;
    suggestions.push({ name: data.places[placeIdx].name, query: data.places[placeIdx].query || `${data.places[placeIdx].name}, ${city.name}`, type: 'sightseeing' });
  }
  if (extraHours >= 1) {
    const foodIdx = (offset + 3) % data.food.length;
    suggestions.push({ name: `Snack at ${data.food[foodIdx].name}`, query: data.food[foodIdx].query || `${data.food[foodIdx].name}, ${city.name}`, type: 'food' });
  }
  if (extraHours >= 2) {
    const actIdx = (offset + 2) % data.activities.length;
    suggestions.push({ name: data.activities[actIdx].name, query: data.activities[actIdx].query || `${data.activities[actIdx].name}, ${city.name}`, type: 'activity' });
  }
  if (extraHours >= 2) {
    const placeIdx2 = (offset + 6) % data.places.length;
    suggestions.push({ name: data.places[placeIdx2].name, query: data.places[placeIdx2].query || `${data.places[placeIdx2].name}, ${city.name}`, type: 'sightseeing' });
  }
  if (extraHours >= 3) {
    const placeIdx3 = (offset + 8) % data.places.length;
    suggestions.push({ name: data.places[placeIdx3].name, query: data.places[placeIdx3].query || `${data.places[placeIdx3].name}, ${city.name}`, type: 'sightseeing' });
    const foodIdx2 = (offset + 5) % data.food.length;
    suggestions.push({ name: `Dinner at ${data.food[foodIdx2].name}`, query: data.food[foodIdx2].query || `${data.food[foodIdx2].name}, ${city.name}`, type: 'food' });
  }
  
  return suggestions;
}
