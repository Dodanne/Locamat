import { Category } from '../types/Category';
import Slider from './Slider';
import { MdCancel } from 'react-icons/md';
type SidebarFilterProps = {
  categories: Category[];
  selectedCategories: number[];
  onChangeCategories: (categorie_id: number) => void;
  price: number;
  setPrice: (value: number) => void;
  distance: number;
  setDistance: (value: number) => void;
  fetchCityCoordinates: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: () => void;
  handleResetLocation: () => void;
  locationError: string;
  resetFilters: () => void;
  cityResults: {
    properties: { city: string; postcode: string };
    geometry: { coordinates: [number, number] };
  }[];
  selectedCityName: string | null;
  userLocation: { latitude: number; longitude: number } | null;
  resetCity: () => void;
  handleSelectCity: (city: {
    properties: { city: string; postcode: string };
    geometry: { coordinates: [number, number] };
  }) => void;
};

export default function SidebarFilter({
  categories,
  selectedCategories,
  onChangeCategories,
  price,
  setPrice,
  distance,
  setDistance,
  fetchCityCoordinates,
  handleLocation,
  handleResetLocation,
  locationError,
  resetFilters,
  cityResults,
  handleSelectCity,
  selectedCityName,
  userLocation,
  resetCity,
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
              onChange={() => onChangeCategories(cat.category_id)}
            />
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-lg mt-6 text-gray-900">Prix par jour</h3>
        <Slider max={300} value={price} onChange={(value) => setPrice(Number(value))} />
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
              {cityResults.map((city) => (
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleSelectCity(city);
                  }}
                >
                  {city.properties.city} ({city.properties.postcode} )
                </li>
              ))}
            </ul>
          )}
          {selectedCityName && (
            <div className="flex items-center gap-2">
              <MdCancel className="cursor-pointer" onClick={resetCity} />
              <span>{selectedCityName}</span>
            </div>
          )}
          <div className=" flex gap-4">
            <input
              type="checkbox"
              checked={!!userLocation}
              onChange={(e) => {
                if (e.target.checked) {
                  (resetCity(), handleLocation());
                } else {
                  handleResetLocation();
                }
              }}
            />
            <span className="text-sm font-semibold">Utiliser ma position</span>
          </div>
        </label>
        {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
        {selectedCityName || userLocation ? (
          <div className="mt-2">
            <Slider
              max={300}
              unit="km"
              value={distance}
              onChange={(value) => setDistance(Number(value))}
            />
          </div>
        ) : (
          ''
        )}
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
