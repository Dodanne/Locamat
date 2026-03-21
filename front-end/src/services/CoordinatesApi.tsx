export default async function CoordinatesApi(
  query: string,
  limit: number,
  municipalityType: boolean,
) {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://data.geopf.fr/geocodage/search/?q=${encodeURIComponent(query)}&limit=${limit}${municipalityType ? '&type=municipality' : []}`,
    );
    const data = await res.json();
    return data.features ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
