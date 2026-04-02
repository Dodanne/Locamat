import { Link, useParams } from 'react-router-dom';
import ContactButton from '../../components/contact-button';
import { EquipmentApi } from '../../services/EquipmentsApi';
import { useEffect, useState } from 'react';
import { Equipment } from '../../types/Equipment';
import Loader from '../../components/Loader';

export default function PaiementSuccess() {
  const { id } = useParams();
  const { getEquipmentById } = EquipmentApi();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const equipment_id = id ? Number(id) : null;

  useEffect(() => {
    if (!equipment_id) return;
    async function fetchEquipment() {
      try {
        const equipment = await getEquipmentById(Number(equipment_id));
        setEquipment(equipment);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEquipment();
  }, [equipment_id]);

  if (!equipment) return <Loader />;
  return (
    <div className="py-20 bg-gradient-to-r from-accent to-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary text-3xl font-bold">
            ✓
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
          Votre paiement a été validé avec succès !
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 mb-10">
          Vous pouvez dès à présent communiquer avec votre loueur. Celui-ci vous communiquera
          l'adresse de retrait ansi que l'heure du rendez-vous.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/user-profile"
            className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition"
          >
            Voir mon profil
          </Link>

          <ContactButton equipment={equipment} />
        </div>
      </div>
    </div>
  );
}
