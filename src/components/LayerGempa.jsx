import { GeoJSON, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import convertToGeoJSON from "../utils/convertToGeoJSON";
import L from "leaflet";
import * as d3 from "d3";

export default function LayerGempa() {
  const [dataGempa, setDataGempa] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const fetchGempa = async () => {
    try {
      const res = await fetch(
        "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
      );
      if (!res.ok) throw new Error("Gagal mengambil data gempa");

      const data = await res.json();
      const gempaGeoJSON = convertToGeoJSON(data);
      console.log("Data API BMKG:", gempaGeoJSON);
      setDataGempa(gempaGeoJSON);
    } catch (error) {
      console.error("Error fetching gempa data:", error);
    }
  };

  useEffect(() => {
    fetchGempa();
  }, []);

  // Skala warna berdasarkan Modified Mercalli Intensity (MMI)
  const colorScale = d3
    .scaleThreshold()
    .domain([2, 3, 4, 5, 6, 7, 8, 9, 10])
    .range([
      "#ADD8E6", // I - Biru Muda
      "#87CEEB", // II-III - Biru Langit
      "#32CD32", // IV - Hijau Terang
      "#9ACD32", // V - Kuning-Hijau
      "#FFD700", // VI - Emas
      "#FFA500", // VII - Oranye
      "#FF4500", // VIII - Merah-Oranye
      "#B22222", // IX - Merah Tua
      "#8B0000", // X+ - Merah Gelap
    ]);

  const getColor = (magnitude) => colorScale(magnitude);

  return (
    <>
      <GeoJSON
        key={JSON.stringify(dataGempa)}
        data={dataGempa}
        attribution="&copy; BMKG - Badan Meteorologi, Klimatologi, dan Geofisika"
        pointToLayer={(feature, latlng) => {
          const magnitude = feature.properties.magnitude || 0;

          const marker = L.circleMarker(latlng, {
            radius: Math.pow(magnitude, 1.5), // Skala eksponensial
            fillColor: getColor(magnitude), // Warna dinamis berdasarkan skala MMI
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9,
          });

          marker.bindPopup(
            `<b>Gempa ${magnitude} SR</b><br />
            <b>Lokasi:</b> ${feature.properties.wilayah}<br />
            <b>Tanggal:</b> ${feature.properties.tanggal}<br />
            <b>Waktu:</b> ${feature.properties.jam}<br />
            <b>Kedalaman:</b> ${feature.properties.kedalaman}<br />
            <b>Dirasakan:</b> ${feature.properties.dirasakan}`
          );

          return marker;
        }}
      />

      <Legend />
    </>
  );
}

// Komponen Legend dengan Skala MMI
function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const colors = [
        "#ADD8E6",
        "#87CEEB",
        "#32CD32",
        "#9ACD32",
        "#FFD700",
        "#FFA500",
        "#FF4500",
        "#B22222",
        "#8B0000",
      ];
      const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

      // Buat gradient color scale untuk legend
      const gradientColors = colors
        .map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`)
        .join(", ");
      const gradientStyle = `linear-gradient(to right, ${gradientColors})`;

      div.innerHTML = `
        <strong>Kekuatan Gempa (SR)</strong>
        <div style="width: 150px; height: 15px; background: ${gradientStyle}; border: 1px solid #000;"></div>
        <div style="display: flex; justify-content: space-between;">
          ${labels.map((label) => `<span>${label}</span>`).join("")}
        </div>
      `;
      return div;
    };

    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}
