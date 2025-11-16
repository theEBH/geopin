import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ onLocationSelect }) {
  const [errorEstimate, setErrorEstimate] = useState(100);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = () => {
    if (!selectedLocation) return;
    
    onLocationSelect({
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      error_estimate: Number(errorEstimate)
    });
    
    setSelectedLocation(null);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="w-full h-[60vh] rounded-lg overflow-hidden">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationSelect={handleLocationClick} />
          </MapContainer>
        </div>
      </Card>

      {selectedLocation && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-900">Selected coordinates:</p>
          <p className="text-sm text-blue-700 mt-1">
            Latitude: {selectedLocation.lat.toFixed(6)}° | Longitude: {selectedLocation.lng.toFixed(6)}°
          </p>
        </div>
      )}

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="error">Error Estimate (meters)</Label>
          <Input
            id="error"
            type="number"
            min="0"
            value={errorEstimate}
            onChange={(e) => setErrorEstimate(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedLocation}
          className="bg-green-600 hover:bg-green-700"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Submit Location
        </Button>
      </div>
    </div>
  );
}