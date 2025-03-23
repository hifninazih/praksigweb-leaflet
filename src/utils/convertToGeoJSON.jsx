const convertToGeoJSON = (data) => {
  return {
    type: "FeatureCollection",
    features: data.Infogempa.gempa.map((gempa) => ({
      type: "Feature",
      properties: {
        tanggal: gempa.Tanggal,
        jam: gempa.Jam,
        magnitude: parseFloat(gempa.Magnitude),
        kedalaman: gempa.Kedalaman,
        wilayah: gempa.Wilayah,
        dirasakan: gempa.Dirasakan,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(gempa.Bujur), parseFloat(gempa.Lintang)],
      },
    })),
  };
};

export default convertToGeoJSON;
