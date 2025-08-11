"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import L from "leaflet";

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = encodeURIComponent(
          `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
        );
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address}&addressdetails=1&limit=1`
        );

        if (!response.ok) {
          throw new Error("Geocoding request failed");
        }

        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lon } = data[0];
        setLat(parseFloat(lat));
        setLng(parseFloat(lon));
        setLoading(false);
      } catch (error) {
        console.error("Geocode error:", error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    lat &&
    lng && (
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {property.location.street}, {property.location.city}
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default PropertyMap;
