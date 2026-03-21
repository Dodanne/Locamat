import { Category } from '../types/Category';
import Slider from './Slider';
type SidebarFilterProps = {
  categories: Category[];
  selectedCategories: number[];
  onChangeCategories: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  setPrice: (value: number) => void;
  distance: number;
  setDistance: (value: number) => void;
  userLocation: { latitude: number; longitude: number } | null;
  setUserLocation: (loc: { latitude: number; longitude: number } | null) => void;
  fetchCityCoordinates: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: () => void;
  handleResetLocation: () => void;
  locationError: string;
  resetFilters: () => void;
  cityResults: {
    properties: { city: string; postcode: string };
    geometry: { coordinates: [number, number] };
  }[];
  setCityResults: (
    res: {
      properties: { city: string; postcode: string };
      geometry: { coordinates: [number, number] };
    }[],
  ) => void;
};

export default function SidebarFilter({
  categories,
  selectedCategories,
  onChangeCategories,
  price,
  setPrice,
  distance,
  setDistance,
  userLocation,
  setUserLocation,
  fetchCityCoordinates,
  handleLocation,
  handleResetLocation,
  locationError,
  resetFilters,
  cityResults,
  setCityResults,
}: SidebarFilterProps) {
  return (
    <div>
      <h3 className="text-lg mb-4 text-gray-900">Catégories</h3>
      <div className="space-y-3">
        {categories.map((cat) => (
          <label
            key={cat.category_id}
            className="flex items-center gap-1 text-sm font-semibold select-none cursor-pointer"
          >
            <input
              type="checkbox"
              value={cat.category_id}
              checked={selectedCategories.includes(cat.category_id)}
              onChange={onChangeCategories}
            />
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-lg mt-6 text-gray-900">Prix par jour</h3>
        <Slider
          max={300}
          value={price}
          onChange={(value: number | string) => setPrice(Number(value))}
        />
      </div>
      <div>
        <h3 className="text-lg mt-6 text-gray-900">Localisation</h3>
        <label className="flex flex-col justify-center gap-4 mt-2 cursor-pointer">
          <input
            className="p-1 text-blackText bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-gray-600"
            type="text"
            placeholder="Rechercher par lieu..."
            onChange={(e) => {
              fetchCityCoordinates(e);
            }}
          />
          {cityResults.length > 0 && (
            <ul className="border rounded-md mt-1 max-h-40 overflow-auto bg-white">
              {cityResults.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setUserLocation({
                      latitude: city.geometry.coordinates[1],
                      longitude: city.geometry.coordinates[0],
                    });
                    setCityResults([]);
                  }}
                >
                  {city.properties.city} ({city.properties.postcode})
                </li>
              ))}
            </ul>
          )}
          <div className=" flex gap-4">
            <input
              type="checkbox"
              checked={!!userLocation}
              onChange={(e) => (e.target.checked ? handleLocation() : handleResetLocation())}
            />
            <span className="text-sm font-semibold">Utiliser ma position</span>
          </div>
        </label>
        {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
        <div className="mt-2">
          <Slider
            max={200}
            unit="km"
            value={distance}
            onChange={(value) => setDistance(Number(value))}
          />
        </div>
      </div>
      <button
        onClick={resetFilters}
        className="w-full mt-6 h-9 rounded-md border text-sm font-medium hover:bg-gray-100"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
