import { City } from './indianCities';

export type TransportMode = 'bus' | 'train' | 'flight';

export interface TransportOption {
  mode: TransportMode;
  from: string;
  to: string;
  duration: string;
  price: number;
  departure: string;
  arrival: string;
  operator: string;
  available: boolean;
  note?: string;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getTransportOptions(from: City, to: City): TransportOption[] {
  const dist = haversineDistance(from.lat, from.lng, to.lat, to.lng);
  const options: TransportOption[] = [];

  // Bus - always available
  const busSpeed = 45;
  const busHours = dist / busSpeed;
  const busPrice = Math.round(dist * 1.2 + 150);
  options.push({
    mode: 'bus',
    from: from.name,
    to: to.name,
    duration: formatDuration(busHours),
    price: busPrice,
    departure: busHours > 8 ? "20:00" : "06:00",
    arrival: busHours > 8 ? `${String(Math.round(busHours + 20) % 24).padStart(2,'0')}:00` : `${String(Math.round(busHours + 6) % 24).padStart(2,'0')}:00`,
    operator: dist > 500 ? "KSRTC / Private" : "TSRTC / APSRTC",
    available: true,
  });

  // Sleeper bus for long distances
  if (busHours > 6) {
    options.push({
      mode: 'bus',
      from: from.name,
      to: to.name,
      duration: formatDuration(busHours),
      price: Math.round(busPrice * 1.5),
      departure: "21:00",
      arrival: `${String(Math.round(busHours + 21) % 24).padStart(2,'0')}:00`,
      operator: "Sleeper Bus (Private)",
      available: true,
      note: "AC Sleeper"
    });
  }

  // Train
  if (from.hasRailway && to.hasRailway) {
    const trainSpeed = 55;
    const trainHours = dist / trainSpeed;
    options.push({
      mode: 'train',
      from: from.name,
      to: to.name,
      duration: formatDuration(trainHours),
      price: Math.round(dist * 0.8 + 100),
      departure: "06:30",
      arrival: `${String(Math.round(trainHours + 6) % 24).padStart(2,'0')}:30`,
      operator: "Indian Railways (Sleeper)",
      available: true,
    });
    options.push({
      mode: 'train',
      from: from.name,
      to: to.name,
      duration: formatDuration(trainHours * 0.9),
      price: Math.round(dist * 1.5 + 200),
      departure: "16:00",
      arrival: `${String(Math.round(trainHours * 0.9 + 16) % 24).padStart(2,'0')}:00`,
      operator: "Indian Railways (AC 3-Tier)",
      available: true,
    });
  }

  // Flight
  if (from.hasAirport && to.hasAirport && dist > 200) {
    const flightHours = dist < 500 ? 1.2 : dist < 1000 ? 1.8 : 2.5;
    options.push({
      mode: 'flight',
      from: from.name,
      to: to.name,
      duration: formatDuration(flightHours),
      price: Math.round(2500 + dist * 3),
      departure: "07:00",
      arrival: `${String(Math.round(flightHours + 7) % 24).padStart(2,'0')}:${flightHours % 1 > 0 ? '15' : '00'}`,
      operator: "IndiGo / Air India",
      available: true,
    });
    options.push({
      mode: 'flight',
      from: from.name,
      to: to.name,
      duration: formatDuration(flightHours),
      price: Math.round(3500 + dist * 3.5),
      departure: "18:30",
      arrival: `${String(Math.round(flightHours + 18) % 24).padStart(2,'0')}:45`,
      operator: "SpiceJet / Vistara",
      available: true,
    });
  } else if (!from.hasAirport || !to.hasAirport) {
    // Suggest nearest airport city
    const nearestFromAirport = from.hasAirport ? from.name : getNearestAirportCity(from);
    const nearestToAirport = to.hasAirport ? to.name : getNearestAirportCity(to);
    if (nearestFromAirport && nearestToAirport && nearestFromAirport !== nearestToAirport) {
      options.push({
        mode: 'flight',
        from: nearestFromAirport,
        to: nearestToAirport,
        duration: formatDuration(1.5),
        price: Math.round(3000 + dist * 3),
        departure: "09:00",
        arrival: "10:30",
        operator: "IndiGo / Air India",
        available: true,
        note: `Fly from ${nearestFromAirport} to ${nearestToAirport}`,
      });
    }
  }

  return options;
}

function getNearestAirportCity(city: City): string {
  const airportCities: Record<string, string> = {
    "Warangal": "Hyderabad",
    "Karimnagar": "Hyderabad",
    "Nizamabad": "Hyderabad",
    "Khammam": "Hyderabad",
    "Munnar": "Kochi",
    "Alleppey": "Kochi",
    "Thekkady": "Kochi",
    "Varkala": "Thiruvananthapuram",
    "Kumarakom": "Kochi",
    "Wayanad": "Kozhikode",
    "Ooty": "Coimbatore",
    "Manali": "Chandigarh",
    "Rishikesh": "Dehradun",
    "Darjeeling": "Bagdogra",
  };
  return airportCities[city.name] || "";
}
