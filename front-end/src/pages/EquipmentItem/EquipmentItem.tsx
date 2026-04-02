import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { EquipmentApi } from '../../services/EquipmentsApi';
import Loader from '../../components/Loader';
import 'react-day-picker/dist/style.css';
import Reservations from '../../components/equipment/Reservation';
import { Equipment } from '../../types/Equipment';
import getInitials from '../../components/GetInitials';
import { ReviewsApi } from '../../services/ReviewsApi';
import { ReviewEquipment } from '../../types/Review_equipment';
import { IoLocationOutline } from 'react-icons/io5';
import StarRating from '../../components/StarRating';
import { CgProfile } from 'react-icons/cg';
import FormatDate from '../../components/FormatDate';

import ContactButton from '../../components/contact-button';

export default function EquipmentItem() {
  const [equipment, setEquipmentById] = useState<Equipment>({} as Equipment);
  const [equipmentReview, setEquipmentReview] = useState<ReviewEquipment[]>([]);
  const { id } = useParams();
  const { getEquipmentById } = EquipmentApi();
  const { getEquipmentReviews } = ReviewsApi();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    async function fetchEquipmentById() {
      try {
        const data = await getEquipmentById(id);
        setEquipmentById(data);
      } catch (err) {
        console.log(err);
        setError('Equipement introuvable');
      }
    }
    fetchEquipmentById();
  }, [id]);

  useEffect(() => {
    if (!equipment?.equipment_id) return;
    const id = equipment.equipment_id;
    async function fetchEquipmentReviews() {
      try {
        const data = await getEquipmentReviews(id);
        setEquipmentReview(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEquipmentReviews();
  }, [equipment?.equipment_id]);

  if (error) return <div className="container py-8 text-center text-red-500">{error}</div>;
  if (!equipment) return <Loader />;
  console.log(equipment);
  return (
    <div className="container py-8">
      <Link to="/rechercher">
        <button className="btn p-3 bg-white hover:bg-gray-200">
          {' '}
          <IoArrowBack /> Retour aux résultats
        </button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden py-4">
            <img
              src={equipment.photo}
              alt={equipment.title}
              className="img-cover w-full rounded-xl h-96"
            />
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 m-2 text-xs font-medium w-fit bg-white text-primary absolute top-4 right-1">
              {equipment.owner?.user_type}
            </span>
          </div>
          <div className="flex  justify-between mb-4 items-center">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">{equipment.title}</h1>
              <div className="flex items-center gap-4 justify-between text-gray-600">
                <div className="flex items-center gap-1">
                  <IoLocationSharp />
                  <span>{equipment.owner?.city} </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-900">{equipment.rating_avg} </span>
                  <span className="text-gray-500">({equipment.rating_count})</span>
                </div>
              </div>
            </div>
            <div className="flex text-center">
              <span className=" border rounded-3xl p-2 bg-gray-200">
                {' '}
                {equipment.category?.icon} {equipment.category?.name}{' '}
              </span>
            </div>
          </div>

          <div className="flex flex-col  gap-6 rounded-xl border bg-white p-6 mt-8">
            <div className="flex items-center gap-4 relative justify-between ">
              <div className="flex">
                <Link to={`/user-profile/${equipment.owner_id}`}>
                  <span className="relative flex size-10 shrink-0 overflow-hidden h-16 w-16">
                    {equipment.owner?.photo && equipment.owner?.photo !== 'NULL' ? (
                      <img
                        src={equipment.owner?.photo}
                        alt={equipment.owner?.first_name}
                        className="w-12 h-12 object-cover rounded-full "
                      />
                    ) : (
                      <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">
                        {getInitials(equipment.owner)}
                      </span>
                    )}
                  </span>
                </Link>
                <div>
                  <div className="text-lg text-gray-900">
                    {equipment.owner?.first_name} {equipment.owner?.last_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-gray-900">{equipment.owner?.rating_avg} </span>
                      <span className="text-gray-500">({equipment.owner?.rating_count} avis)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex  gap-3 ">
                <Link to={`/user-profile/${equipment.owner_id}`}>
                  <button className="btn p-3 bg-gray-100 hover:bg-gray-200 ">
                    {' '}
                    <CgProfile className="text-xl" />{' '}
                    <span className="hidden md:block">Voir profil</span>{' '}
                  </button>
                </Link>
                <ContactButton equipment={equipment} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
            <h4 className=" font-semibold text-gray-900 mb-1">Description</h4>
            <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
          </div>
          <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
            <h4 className=" font-semibold text-gray-900 mb-1">Avis </h4>
            {equipmentReview.length > 0 ? (
              equipmentReview?.map((r) => (
                <div key={r.reviewed_user_id} className="bg-white rounded-xl border p-4 space-y-4">
                  <div className="flex items-center  justify-between gap-4 flex-col md:flex-row">
                    <div className="flex items-center gap-3">
                      {r.reviewer?.photo && r.reviewer?.photo !== 'NULL' ? (
                        <img
                          src={r.reviewer?.photo}
                          className="w-10 h-10 object-cover rounded-full shrink-0"
                        />
                      ) : (
                        <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full shrink-0">
                          {getInitials(r.reviewer)}
                        </span>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {r.reviewer
                            ? `${r.reviewer.first_name} ${r.reviewer.last_name}`
                            : 'Utilisateur supprimé'}
                        </p>
                        <p className="text-gray-500 text-sm">{FormatDate(r.createdAt)}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <IoLocationOutline />
                          <span>{r.reviewer?.city}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <StarRating rating={r.rating} />
                      <span className="text-sm text-gray-600">({r.rating}/5)</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-accent text-center md:w-2/3">
                      <p className="text-gray-900 italic text-lg">"{r.comment}"</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-600">
                <p>Aucun avis reçu pour le moment</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1 ">
          <Reservations equipment={equipment} />
        </div>
      </div>
    </div>
  );
}
