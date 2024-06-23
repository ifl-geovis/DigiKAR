export const getAnwesen = async () => {
  const response = await fetch(
    "https://api.geohistoricaldata.org/digikar/anwesen.geojson",
  );
  return await response.json();
};
