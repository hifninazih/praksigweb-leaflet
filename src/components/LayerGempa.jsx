import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { convertToGeoJSON } from "../utils/convertToGeoJSON";

export default function LayerGempa() {
  const [dataGempa, setDataGempa] = useState({
    type: "FeatureCollection",
    features: [],
  });
  // Fetch api
  const fetchGempa = async () => {
    const res = await fetch(
      "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json"
    );
    const data = await res.json();
    setDataGempa(convertToGeoJSON(data));
  };

  useEffect(() => {
    fetchGempa();
  }, []);
  return (
    <>
      <GeoJSON data={dataGempa} attribution="BMKG" />
    </>
  );
}
