import ItemCard from '../equipment/ItemCard';
import { useEffect } from 'react';
import AddEquipmentBtn from '../AddEquipmentBtn';
import { useAuth } from '../../contexts/AuthContext';
import { EquipmentApiContext } from '../../contexts/EquipmentContext';

export default function EquipmentUserProfile() {
  const { getUserEquipments, deleteEquipment, userEquipments, patchEquipment } =
    EquipmentApiContext();
  const { user_id } = useAuth();

  useEffect(() => {
    if (!user_id) return;
    getUserEquipments(user_id);
  }, [user_id]);

  const handleDeleteEquipment = async (id: number) => {
    if (!confirm('Supprimer cet équipement ?')) return;
    await deleteEquipment(id);
  };
  const handleUpdateEquipment = async (id: number, formData: FormData) => {
    await patchEquipment(id, formData);
  };
  if (!userEquipments) return null;
  return (
    <>
      {userEquipments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <p className="text-lg mb-4"> Vous n’avez pas encore commencé à louer. </p>
          <p className="mb-6"> Commencez dès à présent en ajoutant votre premier matériel </p>
          <AddEquipmentBtn />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900 my-4">Mon matériel</h2>
            <AddEquipmentBtn />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {userEquipments.map((e) => (
              <ItemCard
                key={e.equipment_id}
                equipment={e}
                editable
                onUpdate={handleUpdateEquipment}
                onDelete={handleDeleteEquipment}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
