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
  bookingUrl?: string;
  bookingLabel?: string;
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

// Real booking URLs - working links
function getRedBusUrl(from: string, to: string): string {
  return `https://www.redbus.in/bus-tickets/${from.toLowerCase().replace(/\s+/g, '-')}-to-${to.toLowerCase().replace(/\s+/g, '-')}`;
}

function getTSRTCUrl(): string {
  return 'https://www.tsrtconline.in/oprs-web/guest/home';
}

function getAPSRTCUrl(): string {
  return 'https://www.apsrtconline.in/oprs-web/guest/home';
}

function getKSRTCUrl(): string {
  return 'https://www.ksrtc.in/oprs-web/guest/home';
}

function getTrainBookingUrl(): string {
  return 'https://www.irctc.co.in/nget/train-search';
}

function getFlightBookingUrl(from: string, to: string): string {
  const fromCode = getCityAirportCode(from);
  const toCode = getCityAirportCode(to);
  if (fromCode && toCode) {
    return `https://www.makemytrip.com/flight/search?itinerary=${fromCode}-${toCode}-${getTomorrowDate()}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E`;
  }
  return `https://www.makemytrip.com/flights/`;
}

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}

function getCityAirportCode(city: string): string {
  const codes: Record<string, string> = {
    "Hyderabad": "HYD", "Delhi": "DEL", "Mumbai": "BOM", "Chennai": "MAA",
    "Bengaluru": "BLR", "Kolkata": "CCU", "Kochi": "COK", "Goa": "GOI",
    "Jaipur": "JAI", "Ahmedabad": "AMD", "Pune": "PNQ", "Lucknow": "LKO",
    "Varanasi": "VNS", "Visakhapatnam": "VTZ", "Vijayawada": "VGA",
    "Thiruvananthapuram": "TRV", "Kozhikode": "CCJ", "Coimbatore": "CJB",
    "Madurai": "IXM", "Mangaluru": "IXE", "Mysuru": "MYQ", "Tirupati": "TIR",
    "Amritsar": "ATQ", "Chandigarh": "IXC", "Srinagar": "SXR", "Leh": "IXL",
    "Shimla": "SLV", "Udaipur": "UDR", "Agra": "AGR", "Kannur": "CNN",
    "Guntur": "VGA", "Bagdogra": "IXB", "Dehradun": "DED",
  };
  return codes[city] || '';
}

function getStateBusInfo(from: City, to: City): { operator: string; bookingUrl: string; bookingLabel: string } {
  const states = [from.state, to.state];
  if (states.includes('Telangana')) {
    return { operator: 'TSRTC', bookingUrl: getTSRTCUrl(), bookingLabel: 'Book on TSRTC' };
  }
  if (states.includes('Andhra Pradesh')) {
    return { operator: 'APSRTC', bookingUrl: getAPSRTCUrl(), bookingLabel: 'Book on APSRTC' };
  }
  if (states.includes('Kerala')) {
    return { operator: 'KSRTC (Kerala)', bookingUrl: getKSRTCUrl(), bookingLabel: 'Book on KSRTC' };
  }
  if (states.includes('Karnataka')) {
    return { operator: 'KSRTC (Karnataka)', bookingUrl: 'https://www.ksrtc.in/oprs-web/guest/home', bookingLabel: 'Book on KSRTC' };
  }
  return { operator: 'State RTC', bookingUrl: getRedBusUrl(from.name, to.name), bookingLabel: 'Book on RedBus' };
}

export function getTransportOptions(from: City, to: City): TransportOption[] {
  const dist = haversineDistance(from.lat, from.lng, to.lat, to.lng);
  const options: TransportOption[] = [];
  const busInfo = getStateBusInfo(from, to);

  // State RTC Bus
  const busSpeed = 45;
  const busHours = dist / busSpeed;
  const busPrice = Math.round(dist * 1.2 + 150);
  options.push({
    mode: 'bus', from: from.name, to: to.name,
    duration: formatDuration(busHours),
    price: busPrice,
    departure: busHours > 8 ? "20:00" : "06:00",
    arrival: busHours > 8 ? `${String(Math.round(busHours + 20) % 24).padStart(2,'0')}:00` : `${String(Math.round(busHours + 6) % 24).padStart(2,'0')}:00`,
    operator: busInfo.operator,
    available: true,
    bookingUrl: busInfo.bookingUrl,
    bookingLabel: busInfo.bookingLabel,
  });

  // RedBus Private
  options.push({
    mode: 'bus', from: from.name, to: to.name,
    duration: formatDuration(busHours),
    price: Math.round(busPrice * 1.1),
    departure: "22:00",
    arrival: `${String(Math.round(busHours + 22) % 24).padStart(2,'0')}:00`,
    operator: "Private (Via RedBus)",
    available: true,
    bookingUrl: getRedBusUrl(from.name, to.name),
    bookingLabel: 'Book on RedBus',
  });

  // AC Sleeper for long
  if (busHours > 6) {
    options.push({
      mode: 'bus', from: from.name, to: to.name,
      duration: formatDuration(busHours),
      price: Math.round(busPrice * 1.5),
      departure: "21:00",
      arrival: `${String(Math.round(busHours + 21) % 24).padStart(2,'0')}:00`,
      operator: "AC Sleeper (Via RedBus)",
      available: true,
      note: "AC Sleeper",
      bookingUrl: getRedBusUrl(from.name, to.name),
      bookingLabel: 'Book on RedBus',
    });
  }

  // Train
  if (from.hasRailway && to.hasRailway) {
    const trainSpeed = 55;
    const trainHours = dist / trainSpeed;
    options.push({
      mode: 'train', from: from.name, to: to.name,
      duration: formatDuration(trainHours),
      price: Math.round(dist * 0.8 + 100),
      departure: "06:30", arrival: `${String(Math.round(trainHours + 6) % 24).padStart(2,'0')}:30`,
      operator: "Indian Railways (Sleeper)",
      available: true,
      bookingUrl: getTrainBookingUrl(),
      bookingLabel: 'Book on IRCTC',
    });
    options.push({
      mode: 'train', from: from.name, to: to.name,
      duration: formatDuration(trainHours * 0.9),
      price: Math.round(dist * 1.5 + 200),
      departure: "16:00", arrival: `${String(Math.round(trainHours * 0.9 + 16) % 24).padStart(2,'0')}:00`,
      operator: "Indian Railways (AC 3-Tier)",
      available: true,
      bookingUrl: getTrainBookingUrl(),
      bookingLabel: 'Book on IRCTC',
    });
    options.push({
      mode: 'train', from: from.name, to: to.name,
      duration: formatDuration(trainHours * 0.85),
      price: Math.round(dist * 2 + 300),
      departure: "20:00", arrival: `${String(Math.round(trainHours * 0.85 + 20) % 24).padStart(2,'0')}:00`,
      operator: "Indian Railways (AC 2-Tier)",
      available: true,
      note: "Tatkal Available",
      bookingUrl: getTrainBookingUrl(),
      bookingLabel: 'Book on IRCTC',
    });
  }

  // Flight
  if (from.hasAirport && to.hasAirport && dist > 200) {
    const flightHours = dist < 500 ? 1.2 : dist < 1000 ? 1.8 : 2.5;
    options.push({
      mode: 'flight', from: from.name, to: to.name,
      duration: formatDuration(flightHours),
      price: Math.round(2500 + dist * 3),
      departure: "07:00",
      arrival: `${String(Math.round(flightHours + 7) % 24).padStart(2,'0')}:${flightHours % 1 > 0 ? '15' : '00'}`,
      operator: "IndiGo",
      available: true,
      bookingUrl: getFlightBookingUrl(from.name, to.name),
      bookingLabel: 'Book on MakeMyTrip',
    });
    options.push({
      mode: 'flight', from: from.name, to: to.name,
      duration: formatDuration(flightHours),
      price: Math.round(3500 + dist * 3.5),
      departure: "18:30",
      arrival: `${String(Math.round(flightHours + 18) % 24).padStart(2,'0')}:45`,
      operator: "Air India / Vistara",
      available: true,
      bookingUrl: getFlightBookingUrl(from.name, to.name),
      bookingLabel: 'Book on MakeMyTrip',
    });
  } else if (!from.hasAirport || !to.hasAirport) {
    const nearestFrom = from.hasAirport ? from.name : getNearestAirportCity(from);
    const nearestTo = to.hasAirport ? to.name : getNearestAirportCity(to);
    if (nearestFrom && nearestTo && nearestFrom !== nearestTo) {
      options.push({
        mode: 'flight', from: nearestFrom, to: nearestTo,
        duration: formatDuration(1.5),
        price: Math.round(3000 + dist * 3),
        departure: "09:00", arrival: "10:30",
        operator: "IndiGo / Air India",
        available: true,
        note: `Fly ${nearestFrom} → ${nearestTo}`,
        bookingUrl: getFlightBookingUrl(nearestFrom, nearestTo),
        bookingLabel: 'Book on MakeMyTrip',
      });
    }
  }

  return options;
}

function getNearestAirportCity(city: City): string {
  const airportCities: Record<string, string> = {
    "Warangal": "Hyderabad", "Karimnagar": "Hyderabad", "Nizamabad": "Hyderabad",
    "Khammam": "Hyderabad", "Guntur": "Vijayawada",
    "Munnar": "Kochi", "Alleppey": "Kochi", "Thekkady": "Kochi",
    "Varkala": "Thiruvananthapuram", "Kumarakom": "Kochi", "Wayanad": "Kozhikode",
    "Ooty": "Coimbatore", "Manali": "Chandigarh", "Rishikesh": "Dehradun",
    "Darjeeling": "Bagdogra", "Amaravati": "Vijayawada",
  };
  return airportCities[city.name] || "";
}
