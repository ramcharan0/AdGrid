import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Screen } from '../types';
import { formatCurrency } from '../lib/utils';
import { Monitor, Users, MapPin } from 'lucide-react';
import React, { useEffect } from 'react';

// Use CDN for Leaflet assets to avoid Vite/Webpack resolution issues in this environment
const markerIcon = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const markerShadow = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface DiscoveryMapProps {
  screens: Screen[];
  center?: [number, number] | null;
  zoom?: number;
}

const lcdHotspots = [
  {
    name: 'Select CITYWALK',
    city: 'Delhi',
    kind: 'Mall',
    center: [28.5284, 77.2198] as [number, number],
    confidence: 0.96,
    note: 'Premium mall atrium and fashion retail cluster',
  },
  {
    name: 'Huda City Centre',
    city: 'Delhi',
    kind: 'Metro',
    center: [28.4595, 77.0724] as [number, number],
    confidence: 0.9,
    note: 'High commuter density and platform-facing spots',
  },
  {
    name: 'DLF Avenue',
    city: 'Delhi',
    kind: 'Mall',
    center: [28.5244, 77.2067] as [number, number],
    confidence: 0.92,
    note: 'Premium shopping corridor with branded LCD slots',
  },
  {
    name: 'Rajiv Chowk Metro',
    city: 'Delhi',
    kind: 'Metro',
    center: [28.6328, 77.2197] as [number, number],
    confidence: 0.98,
    note: 'Central interchange with massive daily throughput',
  },
  {
    name: 'Connaught Place',
    city: 'Delhi',
    kind: 'Street Retail',
    center: [28.6315, 77.2167] as [number, number],
    confidence: 0.94,
    note: 'Circular retail hub with prime façade inventory',
  },
  {
    name: 'Phoenix Marketcity',
    city: 'Mumbai',
    kind: 'Mall',
    center: [19.0993, 72.9166] as [number, number],
    confidence: 0.95,
    note: 'Large retail catchment and weekend footfall',
  },
  {
    name: 'Andheri Metro',
    city: 'Mumbai',
    kind: 'Metro',
    center: [19.1197, 72.8468] as [number, number],
    confidence: 0.88,
    note: 'Transfer heavy station with dwell time',
  },
  {
    name: 'High Street Phoenix',
    city: 'Mumbai',
    kind: 'Mall',
    center: [18.9986, 72.8184] as [number, number],
    confidence: 0.91,
    note: 'Lifestyle retail with premium brand adjacency',
  },
  {
    name: 'Bandra Station',
    city: 'Mumbai',
    kind: 'Rail Hub',
    center: [19.0553, 72.8406] as [number, number],
    confidence: 0.89,
    note: 'Dense commuter exchange with billboard visibility',
  },
  {
    name: 'Phoenix Palladium',
    city: 'Mumbai',
    kind: 'Mall',
    center: [18.9948, 72.8244] as [number, number],
    confidence: 0.93,
    note: 'Luxury mall audience and premium dwell time',
  },
  {
    name: 'Vashi Station',
    city: 'Mumbai',
    kind: 'Rail Hub',
    center: [19.0802, 73.0112] as [number, number],
    confidence: 0.87,
    note: 'Navi Mumbai rail corridor with LCD board potential',
  },
  {
    name: 'R City Mall',
    city: 'Mumbai',
    kind: 'Mall',
    center: [19.1077, 72.9209] as [number, number],
    confidence: 0.9,
    note: 'Retail cluster with high shopping dwell time',
  },
  {
    name: 'Kurla Station',
    city: 'Mumbai',
    kind: 'Rail Hub',
    center: [19.0741, 72.8816] as [number, number],
    confidence: 0.88,
    note: 'Busy interchange for commuter-facing screens',
  },
  {
    name: 'GVK One Mall',
    city: 'Hyderabad',
    kind: 'Mall',
    center: [17.4214, 78.4504] as [number, number],
    confidence: 0.89,
    note: 'Affluent shopping zone with premium audience',
  },
  {
    name: 'Ameerpet Metro',
    city: 'Hyderabad',
    kind: 'Metro',
    center: [17.4375, 78.4483] as [number, number],
    confidence: 0.91,
    note: 'One of the busiest interchange stations',
  },
  {
    name: 'Sarath City Capital Mall',
    city: 'Hyderabad',
    kind: 'Mall',
    center: [17.4721, 78.3616] as [number, number],
    confidence: 0.95,
    note: 'Tech corridor mall with high retail spend',
  },
  {
    name: 'HITEC City Metro',
    city: 'Hyderabad',
    kind: 'Metro',
    center: [17.4483, 78.3915] as [number, number],
    confidence: 0.94,
    note: 'IT workforce transit node and premium screen zone',
  },
  {
    name: 'Inorbit Mall Hitech City',
    city: 'Hyderabad',
    kind: 'Mall',
    center: [17.4344, 78.3818] as [number, number],
    confidence: 0.9,
    note: 'Mall-side facades and atrium screens',
  },
  {
    name: 'Miyapur Metro',
    city: 'Hyderabad',
    kind: 'Metro',
    center: [17.4948, 78.357] as [number, number],
    confidence: 0.93,
    note: 'Outer-ring transit zone with large commuter flow',
  },
  {
    name: 'Secunderabad Junction',
    city: 'Hyderabad',
    kind: 'Rail Hub',
    center: [17.4333, 78.5] as [number, number],
    confidence: 0.95,
    note: 'Major rail station with billboard visibility',
  },
  {
    name: 'Forum Sujana Mall',
    city: 'Hyderabad',
    kind: 'Mall',
    center: [17.4942, 78.3855] as [number, number],
    confidence: 0.88,
    note: 'Retail anchor with premium LCD opportunities',
  },
  {
    name: 'Warangal Junction',
    city: 'Warangal',
    kind: 'Rail Hub',
    center: [17.9705, 79.5941] as [number, number],
    confidence: 0.84,
    note: 'Regional commuter node with billboard potential',
  },
  {
    name: 'Kakatiya Mall',
    city: 'Warangal',
    kind: 'Mall',
    center: [17.9821, 79.6034] as [number, number],
    confidence: 0.86,
    note: 'Local shopping hub with screen-friendly storefronts',
  },
  {
    name: 'Hanamkonda Bus Stand',
    city: 'Warangal',
    kind: 'Transit',
    center: [18.0064, 79.5667] as [number, number],
    confidence: 0.82,
    note: 'Bus interchange with dwell and drop-off visibility',
  },
  {
    name: 'Bangalore Central Mall',
    city: 'Bengaluru',
    kind: 'Mall',
    center: [12.9716, 77.5946] as [number, number],
    confidence: 0.92,
    note: 'Urban retail node in the city core',
  },
  {
    name: 'Majestic Metro',
    city: 'Bengaluru',
    kind: 'Metro',
    center: [12.9766, 77.5712] as [number, number],
    confidence: 0.96,
    note: 'Largest transit interchange and commuter density',
  },
  {
    name: 'Forum Mall Koramangala',
    city: 'Bengaluru',
    kind: 'Mall',
    center: [12.9352, 77.6245] as [number, number],
    confidence: 0.9,
    note: 'Retail destination with youth audience',
  },
  {
    name: 'Chennai Central',
    city: 'Chennai',
    kind: 'Rail Hub',
    center: [13.0827, 80.2767] as [number, number],
    confidence: 0.95,
    note: 'High-volume rail traffic and facade visibility',
  },
  {
    name: 'Phoenix Marketcity Chennai',
    city: 'Chennai',
    kind: 'Mall',
    center: [12.9949, 80.2181] as [number, number],
    confidence: 0.91,
    note: 'Large mall footprint with premium screens',
  },
  {
    name: 'Vadapalani Metro',
    city: 'Chennai',
    kind: 'Metro',
    center: [13.0493, 80.2123] as [number, number],
    confidence: 0.89,
    note: 'Busy metro stop with pedestrian flow',
  },
  {
    name: 'Pune Railway Station',
    city: 'Pune',
    kind: 'Rail Hub',
    center: [18.5285, 73.8745] as [number, number],
    confidence: 0.92,
    note: 'Rail frontage with consistent commuter exposure',
  },
  {
    name: 'Phoenix Marketcity Pune',
    city: 'Pune',
    kind: 'Mall',
    center: [18.5613, 73.9254] as [number, number],
    confidence: 0.9,
    note: 'Retail audience and premium shopping environment',
  },
  {
    name: 'Swargate Bus Terminal',
    city: 'Pune',
    kind: 'Transit',
    center: [18.5018, 73.8634] as [number, number],
    confidence: 0.84,
    note: 'Intercity bus movement and dwell time',
  },
  {
    name: 'City Centre Salt Lake',
    city: 'Kolkata',
    kind: 'Mall',
    center: [22.5797, 88.4141] as [number, number],
    confidence: 0.9,
    note: 'Eastern metro retail and family audience',
  },
  {
    name: 'Howrah Station',
    city: 'Kolkata',
    kind: 'Rail Hub',
    center: [22.585, 88.3426] as [number, number],
    confidence: 0.96,
    note: 'One of the busiest rail stations in India',
  },
  {
    name: 'Esplanade Metro',
    city: 'Kolkata',
    kind: 'Metro',
    center: [22.5641, 88.3493] as [number, number],
    confidence: 0.91,
    note: 'Central interchange for premium commuter screens',
  },
  {
    name: 'AlphaOne Mall',
    city: 'Ahmedabad',
    kind: 'Mall',
    center: [23.0066, 72.5123] as [number, number],
    confidence: 0.89,
    note: 'City retail node with large frontage potential',
  },
  {
    name: 'Kalupur Station',
    city: 'Ahmedabad',
    kind: 'Rail Hub',
    center: [23.0271, 72.5962] as [number, number],
    confidence: 0.93,
    note: 'Central rail access and station-side screens',
  },
  {
    name: 'Noida Sector 18 Metro',
    city: 'Noida',
    kind: 'Metro',
    center: [28.5703, 77.3255] as [number, number],
    confidence: 0.94,
    note: 'Retail-heavy metro stop with strong visibility',
  },
  {
    name: 'DLF Mall of India',
    city: 'Noida',
    kind: 'Mall',
    center: [28.5706, 77.3176] as [number, number],
    confidence: 0.95,
    note: 'Massive mall environment with premium LCD inventory',
  },
  {
    name: 'Lucknow Charbagh',
    city: 'Lucknow',
    kind: 'Rail Hub',
    center: [26.839, 80.9231] as [number, number],
    confidence: 0.92,
    note: 'Classic station frontage with high commuter visibility',
  },
  {
    name: 'Phoenix Palassio',
    city: 'Lucknow',
    kind: 'Mall',
    center: [26.8222, 80.8984] as [number, number],
    confidence: 0.9,
    note: 'Premium retail audience and event traffic',
  },
  {
    name: 'Jaipur Junction',
    city: 'Jaipur',
    kind: 'Rail Hub',
    center: [26.9124, 75.7873] as [number, number],
    confidence: 0.91,
    note: 'Major rail access with billboard exposure',
  },
  {
    name: 'World Trade Park',
    city: 'Jaipur',
    kind: 'Mall',
    center: [26.8547, 75.8059] as [number, number],
    confidence: 0.93,
    note: 'Destination mall for premium brand screens',
  },
  {
    name: 'Indore Junction',
    city: 'Indore',
    kind: 'Rail Hub',
    center: [22.7196, 75.8577] as [number, number],
    confidence: 0.89,
    note: 'Central station with strong daily movement',
  },
  {
    name: 'Treasure Island Mall',
    city: 'Indore',
    kind: 'Mall',
    center: [22.7186, 75.8595] as [number, number],
    confidence: 0.9,
    note: 'Mall-side screen inventory and premium dwell',
  },
  {
    name: 'Bhopal Habibganj Station',
    city: 'Bhopal',
    kind: 'Rail Hub',
    center: [23.2293, 77.4317] as [number, number],
    confidence: 0.91,
    note: 'Modern station zone with LCD-ready plazas',
  },
  {
    name: 'DB City Mall',
    city: 'Bhopal',
    kind: 'Mall',
    center: [23.2357, 77.4067] as [number, number],
    confidence: 0.88,
    note: 'Central retail cluster for advertiser reach',
  },
  {
    name: 'Surat Railway Station',
    city: 'Surat',
    kind: 'Rail Hub',
    center: [21.2046, 72.8406] as [number, number],
    confidence: 0.91,
    note: 'High traffic station frontage and concourse screens',
  },
  {
    name: 'VR Surat',
    city: 'Surat',
    kind: 'Mall',
    center: [21.1844, 72.8084] as [number, number],
    confidence: 0.9,
    note: 'Strong retail audience with high dwell time',
  },
  {
    name: 'Nagpur Junction',
    city: 'Nagpur',
    kind: 'Rail Hub',
    center: [21.1585, 79.0882] as [number, number],
    confidence: 0.9,
    note: 'Rail junction and central India connectivity',
  },
  {
    name: 'Empress Mall',
    city: 'Nagpur',
    kind: 'Mall',
    center: [21.1449, 79.086] as [number, number],
    confidence: 0.87,
    note: 'Retail node with screen-friendly plazas',
  },
  {
    name: 'Vizag Railway Station',
    city: 'Visakhapatnam',
    kind: 'Rail Hub',
    center: [17.6868, 83.2185] as [number, number],
    confidence: 0.9,
    note: 'Coastal city rail exposure with commuter dwell',
  },
  {
    name: 'CMR Central',
    city: 'Visakhapatnam',
    kind: 'Mall',
    center: [17.7094, 83.3126] as [number, number],
    confidence: 0.86,
    note: 'Retail footfall and premium screen placements',
  },
  {
    name: 'Brookefields Mall',
    city: 'Coimbatore',
    kind: 'Mall',
    center: [11.0178, 76.9553] as [number, number],
    confidence: 0.88,
    note: 'Tier-2 premium shopping destination',
  },
  {
    name: 'Coimbatore Junction',
    city: 'Coimbatore',
    kind: 'Rail Hub',
    center: [11.0045, 76.9619] as [number, number],
    confidence: 0.91,
    note: 'Central rail traffic with banner potential',
  },
];

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function DiscoveryMap({ screens, center = null, zoom = 5 }: DiscoveryMapProps) {
  // Default to India (Delhi area) if we have multiple locations or India specifically
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  const defaultZoom = zoom || 5;
  const mapCenter = center ?? defaultCenter;

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
      <MapContainer 
        center={mapCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        attributionControl={false}
        className="h-full w-full"
      >
        {center && <ChangeView center={mapCenter} zoom={defaultZoom} />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lcdHotspots.map((spot) => (
          <CircleMarker
            key={spot.name}
            center={spot.center}
            radius={10 + Math.round(spot.confidence * 8)}
            pathOptions={{
              color: '#fb923c',
              fillColor: '#f97316',
              fillOpacity: 0.35,
              weight: 2,
              opacity: 0.95,
            }}
          >
          </CircleMarker>
        ))}
        {screens.map((screen) => (
          <Marker 
            key={screen.id} 
            position={[screen.location.latitude, screen.location.longitude]}
          >
            <Popup className="custom-popup">
              <div className="w-64 p-2">
                <img 
                  src={screen.imageUrl} 
                  alt={screen.name} 
                  className="w-full h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="font-bold text-lg mb-1">{screen.name}</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
                  <MapPin size={12} className="text-orange-500" />
                  <span className="truncate">{screen.location.address}</span>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Footfall</span>
                    <span className="text-xs font-bold flex items-center gap-1">
                      <Users size={12} /> {screen.dailyFootfall.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Starting at</span>
                    <p className="text-sm font-black text-orange-600">{formatCurrency(screen.pricing.daily)}/day</p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
