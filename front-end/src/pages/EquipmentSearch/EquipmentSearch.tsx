import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ItemCard from '../../components/equipment/ItemCard';
import { useNavigate } from 'react-router-dom';
import { CategoriesApi } from '../../services/CategoriesApi';
import { Category } from '../../types/Category';
import { EquipmentApi } from '../../services/EquipmentsApi';
import { Equipment } from '../../types/Equipment';
import Loader from '../../components/Loader';
import CoordinatesApi from '../../services/CoordinatesApi';
import SearchBar from '../../components/SearchBar';
import SidebarFilter from '../../components/SidebarFilter';
import Pagination from '../../components/Pagination';

export default function EquipmentSearch() {
  const { getCategories } = CategoriesApi();
  const { getSearchEquipment } = EquipmentApi();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [price, setPrice] = useState<number>(300);
  const [debouncedPrice, setDebouncedPrice] = useState<number>(300);
  const [distance, setDistance] = useState<number>(30);
  const [debouncedDistance, setDebouncedDistance] = useState<number>(30);
  const [results, setResults] = useState<Equipment[]>([]);
  const [cityResults, setCityResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState('');
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const limit = 9;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    const qCategory = searchParams.get('categorie');
    setSearch(q);
    if (qCategory) {
      setSelectedCategories(qCategory.split(',').map(Number));
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit };
      if (debouncedSearch) params.q = debouncedSearch;
      if (selectedCategories.length) params.categories = selectedCategories;
      const activeLocation = userLocation
        ? { latitude: userLocation.latitude, longitude: userLocation.longitude }
        : selectedCity
          ? { latitude: selectedCity.latitude, longitude: selectedCity.longitude }
          : null;
      if (activeLocation && debouncedDistance > 0) {
        params.latitude = activeLocation.latitude;
        params.longitude = activeLocation.longitude;
        params.distance = debouncedDistance;
      }
      if (debouncedPrice) params.maxPrice = debouncedPrice;
      console.log(params);
      const data = await getSearchEquipment(params);
      setResults(Array.isArray(data) ? data : []);
      setLoading(false);
      setHasSearched(true);
    } catch (err) {
      console.log(err);
      setResults([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchResults();
  }, [
    debouncedSearch,
    selectedCategories,
    debouncedPrice,
    debouncedDistance,
    userLocation,
    selectedCity,
    page,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPrice(price);
      setDebouncedDistance(distance);
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [price, distance, search]);

  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      navigate(`/rechercher?q=${encodeURIComponent(debouncedSearch)}`);
    }
  }, [debouncedSearch, navigate]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, debouncedPrice, userLocation, debouncedDistance]);

  function handleChangeCategory(category_id: number) {
    setSelectedCategories((prev) =>
      prev.includes(category_id) ? prev.filter((id) => id !== category_id) : [...prev, category_id],
    );
  }
  function handleSelectCity(city: any) {
    setSelectedCity({
      name: `${city.properties.city} (${city.properties.postcode})`,
      latitude: city.geometry.coordinates[1],
      longitude: city.geometry.coordinates[0],
    });
    setCityResults([]);
    setUserLocation(null);
  }

  function handleLocation() {
    if (!navigator.geolocation) {
      setLocationError('Géolocalisation impossible sur ce navigateur');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setSelectedCity(null);
        setLocationError('');
      },
      () => setLocationError('Impossible de récupérer votre position'),
    );
  }
  function handleResetLocation() {
    setUserLocation(null);
    setSelectedCity(null);
  }

  async function fetchCityCoordinates(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    try {
      const results = await CoordinatesApi(query, 3, true);
      setCityResults(results);
    } catch (err) {
      console.error(err);
    }
  }
  function resetFilters() {
    setSelectedCategories([]);
    setPrice(300);
    setDistance(30);
    setSelectedCity(null);
    setUserLocation(null);
    setSearch('');
    setPage(1);
  }
  function resetCity() {
    setSelectedCity(null);
    handleResetLocation();
  }

  if (loading) return <Loader />;

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex w-full gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                navigate(`/rechercher?q=${encodeURIComponent(value)}`);
              }
            }}
            onSubmit={() => navigate(`/rechercher?q=${encodeURIComponent(search)}`)}
          />
        </div>

        <div className="text-gray-600 text-sm">
          {results.length}
          {results.length > 1 ? ' résultats trouvés' : ' résultat trouvé'}
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-80 md:block">
          <div className="border rounded-lg p-6 space-y-6 bg-white">
            <SidebarFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onChangeCategories={(category_id) => handleChangeCategory(category_id)}
              price={price}
              setPrice={setPrice}
              distance={distance}
              setDistance={setDistance}
              fetchCityCoordinates={fetchCityCoordinates}
              handleLocation={handleLocation}
              handleResetLocation={handleResetLocation}
              locationError={locationError}
              resetFilters={resetFilters}
              handleSelectCity={handleSelectCity}
              cityResults={cityResults}
              selectedCityName={selectedCity?.name || null}
              userLocation={userLocation}
              resetCity={resetCity}
            />
          </div>
        </aside>

        <div className="flex-1">
          {hasSearched && results.length === 0 && (
            <div className="text-center p-2 text-gray-500 ">
              Aucun matériel ne correspond à votre recherche
            </div>
          )}
          <div className="loop-div">
            {results.map((equipment) => (
              <Link key={equipment.equipment_id} to={`/equipment/${equipment.equipment_id}`}>
                <ItemCard equipment={equipment} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <Pagination page={page} setPage={setPage} results={results} limit={limit} />
      </div>
    </div>
  );
}
