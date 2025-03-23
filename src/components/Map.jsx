import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import LayerGempa from "./LayerGempa";
import { OSMTileLayer } from "./Basemaps";

export default function Basemaps() {
  const position = [0, 120];

  return (
    <MapContainer center={position} zoom={5} style={{ height: "100dvh" }}>
      <OSMTileLayer />
      <LayerGempa />
    </MapContainer>
  );
}
