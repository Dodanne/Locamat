import { useState, useEffect, useRef } from 'react';
import Modal from '../Modals'; // ← votre Modal existant
import { Rental } from '../../types/Rental';
import { RentalsApi } from '../../services/RentalsApi';
import { useAuth } from '../../contexts/AuthContext';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Tab = 'profile' | 'manual' | 'map';

interface OwnerAddress {
  address: string;
  lat: number;
  lng: number;
}

interface Props {
  rental: Rental;
  isOpen: boolean;
  onSaved: (point: MeetingPoint) => void;
  onClose: () => void;
}
interface MeetingPoint {
  address: string;
  lat: number;
  lng: number;
}
export default function MeetingPointModal({ rental, isOpen, onSaved, onClose }: Props) {
  const { user_id } = useAuth();
  const { patchRentalMeetingPoint } = RentalsApi();

  const [tab, setTab] = useState<Tab>('profile');
  const [ownerAddress, setOwnerAddress] = useState<OwnerAddress | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [manualResult, setManualResult] = useState<MeetingPoint | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [mapPoint, setMapPoint] = useState<MeetingPoint | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!isOpen || !user_id) return;
    async function fetchOwnerAddress() {
      setLoadingAddress(true);
      try {
        const res = await fetch(`/api/user/${user_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        setOwnerAddress({
          address: `${data.number} ${data.street}, ${data.postal_code} ${data.city}`,
          lat: Number(data.latitude),
          lng: Number(data.longitude),
        });
      } catch {
        setOwnerAddress(null);
      } finally {
        setLoadingAddress(false);
      }
    }
    fetchOwnerAddress();
  }, [isOpen, user_id]);

  useEffect(() => {
    if (tab !== 'map' || !mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([46.8, 2.3], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = L.marker([lat, lng]).addTo(map);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { 'Accept-Language': 'fr' } },
        );
        const data = await res.json();
        setMapPoint({ address: data.display_name || `${lat}, ${lng}`, lat, lng });
      } catch {
        setMapPoint({ address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng });
      }
    });

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [tab]);

  useEffect(() => {
    if (tab === 'map' && mapInstanceRef.current && ownerAddress) {
      mapInstanceRef.current.setView([ownerAddress.lat, ownerAddress.lng], 13);
    }
  }, [tab, ownerAddress]);

  async function handleGeocode() {
    if (!manualAddress.trim()) return;
    setGeocoding(true);
    setError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(manualAddress)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'fr' } },
      );
      const data = await res.json();
      if (!data[0]) {
        setError('Adresse introuvable, essayez avec plus de détails.');
        setManualResult(null);
        return;
      }
      setManualResult({
        address: data[0].display_name,
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      });
    } catch {
      setError('Erreur lors de la recherche.');
    } finally {
      setGeocoding(false);
    }
  }

  async function handleSave() {
    setError('');
    let point: MeetingPoint | null = null;

    if (tab === 'profile') {
      if (!ownerAddress) {
        setError('Adresse de profil introuvable.');
        return;
      }
      point = ownerAddress;
    } else if (tab === 'manual') {
      if (!manualResult) {
        setError("Validez d'abord votre adresse.");
        return;
      }
      point = manualResult;
    } else {
      if (!mapPoint) {
        setError('Cliquez sur la carte pour choisir un point.');
        return;
      }
      point = mapPoint;
    }

    setSaving(true);
    try {
      await patchRentalMeetingPoint(rental.rental_id, point);
      onSaved(point);
    } catch {
      setError('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  }

  function handleClose() {
    setTab('profile');
    setManualAddress('');
    setManualResult(null);
    setMapPoint(null);
    setError('');
    onClose();
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Mon domicile', icon: '🏠' },
    { id: 'manual', label: 'Saisir une adresse', icon: '✏️' },
    { id: 'map', label: 'Choisir sur la carte', icon: '🗺️' },
  ];

  const selectedPoint =
    tab === 'profile' ? ownerAddress : tab === 'manual' ? manualResult : mapPoint;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-lg mx-auto space-y-4">
        {' '}
        {/* ← max-w ici */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Point de rendez-vous</h2>
          <p className="text-sm text-gray-500 mt-1">
            Pour la location de{' '}
            <span className="font-medium text-gray-700">{rental.equipment?.title}</span>
          </p>
        </div>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setError('');
              }}
              className={`flex-1 py-2.5 text-sm font-medium transition-all flex flex-col items-center gap-0.5 ${
                tab === t.id
                  ? 'bg-white text-primary border-b-2 border-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="min-h-[200px]">
          {tab === 'profile' && (
            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
              {loadingAddress ? (
                <p className="text-sm text-gray-400 animate-pulse">
                  Chargement de votre adresse...
                </p>
              ) : ownerAddress ? (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm">📍</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Adresse de votre profil</p>
                    <p className="text-sm text-gray-600 mt-0.5">{ownerAddress.address}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-500">Aucune adresse trouvée sur votre profil.</p>
              )}
            </div>
          )}

          {tab === 'manual' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => {
                    setManualAddress(e.target.value);
                    setManualResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleGeocode()}
                  placeholder="Ex : 12 rue de la Paix, Paris"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleGeocode}
                  disabled={geocoding || !manualAddress.trim()}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {geocoding ? '...' : 'Valider'}
                </button>
              </div>
              {manualResult && (
                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-sm text-green-800">{manualResult.address}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'map' && (
            <div className="space-y-2">
              <p className="text-xs text-gray-400">
                Cliquez sur la carte pour placer le point de rendez-vous.
              </p>
              <div
                ref={mapRef}
                className="w-full h-64 rounded-xl border border-gray-200"
                style={{ zIndex: 0 }}
              />
              {mapPoint && (
                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <p className="text-xs text-green-800 break-words">{mapPoint.address}</p>
                </div>
              )}
            </div>
          )}
        </div>
        {selectedPoint && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-sm text-primary">
            <span className="font-medium">Point de RDV : </span>
            {selectedPoint.address}
          </div>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !selectedPoint}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {saving ? 'Enregistrement...' : 'Confirmer le point de RDV'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
