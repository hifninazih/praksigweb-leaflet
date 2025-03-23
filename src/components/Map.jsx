import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { StadiaAlidadeSmoothTileLayer } from "./Basemaps";

// Atur icon marker secara manual
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

export default function Basemaps() {
  const position = [-3, 120];

  return (
    <MapContainer center={position} zoom={5} style={{ height: "100dvh" }}>
      <StadiaAlidadeSmoothTileLayer />
    </MapContainer>
  );
}
