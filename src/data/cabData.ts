export interface CabOption {
  provider: string;
  type: string;
  estimatedFare: string;
  estimatedTime: string;
  bookingUrl: string;
  bookingLabel: string;
  icon: 'rapido' | 'uber' | 'ola';
}

function getRapidoUrl(fromLat: number, fromLng: number, toLat: number, toLng: number): string {
  return `https://www.rapido.bike/`;
}

function getUberUrl(fromLat: number, fromLng: number, toLat: number, toLng: number): string {
  return `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${fromLat}&pickup[longitude]=${fromLng}&dropoff[latitude]=${toLat}&dropoff[longitude]=${toLng}`;
}

function getOlaUrl(): string {
  return `https://book.olacabs.com/`;
}

function estimateFare(distKm: number, provider: string, type: string): string {
  let base = 0;
  let perKm = 0;
  if (provider === 'Rapido') {
    if (type === 'Bike') { base = 25; perKm = 5; }
    else { base = 40; perKm = 9; }
  } else if (provider === 'Uber') {
    if (type === 'Go') { base = 50; perKm = 11; }
    else if (type === 'Auto') { base = 30; perKm = 8; }
    else { base = 80; perKm = 14; }
  } else {
    if (type === 'Mini') { base = 50; perKm = 10; }
    else if (type === 'Auto') { base = 30; perKm = 7; }
    else { base = 70; perKm = 13; }
  }
  const low = Math.round(base + perKm * distKm);
  const high = Math.round(low * 1.3);
  return `₹${low}-${high}`;
}

function estimateTime(distKm: number): string {
  const mins = Math.round(distKm * 3 + 5); // ~20km/h avg city speed + wait
  return `${mins} min`;
}

export function getCabOptions(
  fromName: string,
  toName: string,
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  distKm: number
): CabOption[] {
  const options: CabOption[] = [];

  // Rapido
  options.push({
    provider: 'Rapido',
    type: 'Bike',
    estimatedFare: estimateFare(distKm, 'Rapido', 'Bike'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getRapidoUrl(fromLat, fromLng, toLat, toLng),
    bookingLabel: 'Open Rapido',
    icon: 'rapido',
  });
  options.push({
    provider: 'Rapido',
    type: 'Auto',
    estimatedFare: estimateFare(distKm, 'Rapido', 'Auto'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getRapidoUrl(fromLat, fromLng, toLat, toLng),
    bookingLabel: 'Open Rapido',
    icon: 'rapido',
  });

  // Uber
  options.push({
    provider: 'Uber',
    type: 'Auto',
    estimatedFare: estimateFare(distKm, 'Uber', 'Auto'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getUberUrl(fromLat, fromLng, toLat, toLng),
    bookingLabel: 'Open Uber',
    icon: 'uber',
  });
  options.push({
    provider: 'Uber',
    type: 'Go',
    estimatedFare: estimateFare(distKm, 'Uber', 'Go'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getUberUrl(fromLat, fromLng, toLat, toLng),
    bookingLabel: 'Open Uber',
    icon: 'uber',
  });

  // Ola
  options.push({
    provider: 'Ola',
    type: 'Auto',
    estimatedFare: estimateFare(distKm, 'Ola', 'Auto'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getOlaUrl(),
    bookingLabel: 'Open Ola',
    icon: 'ola',
  });
  options.push({
    provider: 'Ola',
    type: 'Mini',
    estimatedFare: estimateFare(distKm, 'Ola', 'Mini'),
    estimatedTime: estimateTime(distKm),
    bookingUrl: getOlaUrl(),
    bookingLabel: 'Open Ola',
    icon: 'ola',
  });

  return options;
}
