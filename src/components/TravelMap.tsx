import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '@/data/indianCities';

interface TravelMapProps {
  from: City | null;
  to: City | null;
}

const TravelMap = ({ from, to }: TravelMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const center: [number, number] = from && to
      ? [(from.lat + to.lat) / 2, (from.lng + to.lng) / 2]
      : from ? [from.lat, from.lng]
      : to ? [to.lat, to.lng]
      : [20.5937, 78.9629];

    const zoom = from && to ? 5 : from || to ? 8 : 5;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    const createIcon = (color: string) => L.divIcon({
      html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    if (from) {
      L.marker([from.lat, from.lng], { icon: createIcon('#0ea5e9') })
        .addTo(map)
        .bindPopup(`<b>${from.name}</b><br>${from.state}`);
    }

    if (to) {
      L.marker([to.lat, to.lng], { icon: createIcon('#ef4444') })
        .addTo(map)
        .bindPopup(`<b>${to.name}</b><br>${to.state}`);
    }

    if (from && to) {
      L.polyline(
        [[from.lat, from.lng], [to.lat, to.lng]],
        { color: '#0ea5e9', weight: 2, dashArray: '8,8', opacity: 0.7 }
      ).addTo(map);

      map.fitBounds([[from.lat, from.lng], [to.lat, to.lng]], { padding: [50, 50] });
    }

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [from, to]);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div ref={mapRef} className="h-[300px] w-full" />
    </div>
  );
};

export default TravelMap;
