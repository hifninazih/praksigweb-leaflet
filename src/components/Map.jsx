import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { OSMTileLayer } from "./Basemaps";

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
  const position = [-7.80045677, 110.39128023];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100dvh" }}>
      <OSMTileLayer />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "5px 0" }}>📍 Lokasi</h3>
            <p>
              Koordinat: {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </p>
            <img
              src="https://source.unsplash.com/200x100/?landscape"
              alt="Popup Image"
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <button
              onClick={() => alert("Tombol diklik!")}
              style={{
                marginTop: "5px",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Klik Saya
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
