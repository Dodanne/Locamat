import AddEquipmentBtn from '../AddEquipmentBtn';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useStatus } from '../../contexts/StatusContext';
import { Link } from 'react-router-dom';
import { RentalsApi } from '../../services/RentalsApi';
import Loader from '../Loader';
import { Rental, RentalStatus } from '../../types/Rental';
import getInitials from '../GetInitials';
import { IoLocationOutline } from 'react-icons/io5';
import Reviews from '../reviews/Reviews';
import { ReviewsApi } from '../../services/ReviewsApi';
import FormatDate from '../FormatDate';
import ContactButton from '../contact-button';
import Modal from '../Modals';

export default function OwnerRentalsUserProfile() {
  const { status } = useStatus();
  const { getOwnerRentals, patchStatusRental } = RentalsApi();
  const [showReview, setShowReview] = useState<number | null>(null);
  const [hasReview, setHasReview] = useState<{ [rental_id: number]: boolean }>({});
  const [ownerRentals, setOwnerRentals] = useState<Rental[]>([]);
  const { getUserIsReview } = ReviewsApi();
  const { user_id } = useAuth();

  useEffect(() => {
    if (!user_id) return;
    const id = user_id;
    async function fetchRenterRental() {
      try {
        const data = await getOwnerRentals(id);
        setOwnerRentals(data || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRenterRental();
  }, [user_id]);

  function handleChangeStatus(id: number, newStatus: RentalStatus) {
    patchStatusRental(id, newStatus);
    setOwnerRentals((prev) =>
      prev.map((r) => (r.rental_id === id ? { ...r, status: newStatus } : r)),
    );
  }

  useEffect(() => {
    async function isReview() {
      for (const rental of ownerRentals)
        try {
          const resUser = await getUserIsReview(rental.rental_id);

          setHasReview((prev) => ({
            ...prev,
            [rental.rental_id]: resUser.hasReview,
          }));
        } catch (err) {
          console.log(err);
        }
    }
    isReview();
  }, [ownerRentals]);

  const handleClick = () => {
    confirm('Êtes-vous sûr de vouloir annuler cette location ?');
  };
  if (!ownerRentals) return <Loader />;
  return (
    <>
      {ownerRentals.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <p className="text-lg mb-4"> Vous n’avez pas encore commencé à louer. </p>
            <p className="mb-6"> Commencez dès à présent en ajoutant votre premier matériel </p>
            <AddEquipmentBtn />
          </div>
        </>
      ) : (
        <>
          <div className="flex equipments-center justify-between">
            <h2 className="text-2xl text-gray-900 my-4"> Matériel que j’ai prêté</h2>
          </div>
          <div className="space-y-4">
            {ownerRentals &&
              ownerRentals.map((e) => (
                <div key={e.rental_id} className="bg-white rounded-xl border p-4 space-y-4">
                  <div className="flex gap-4 items-start">
                    <Link to={`/equipment/${e.equipment?.equipment_id}`}>
                      <img
                        src={e.equipment?.photo}
                        alt={e.equipment?.title}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                      />
                    </Link>
                    <div className="flex gap-2 w-full items-start">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {e.equipment?.title}
                        </h3>
                        <div className="text-gray-600 text-sm">
                          <p>Du {FormatDate(e.start_date)}</p>
                          <p>Au {FormatDate(e.end_date)}</p>
                        </div>
                      </div>
                      <span
                        className={`ml-auto inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm font-medium ${status[e.status].className}`}
                      >
                        {status[e.status].label}
                      </span>
                    </div>
                  </div>

                  <hr />

                  <div className="flex items-center justify-between">
                    <Link to={`/user-profile/${e.renter?.user_id}`}>
                      <div className="flex items-center gap-3">
                        {e.renter?.photo && e.renter?.photo !== 'NULL' ? (
                          <img
                            src={e.renter?.photo}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        ) : (
                          <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full">
                            {getInitials(e.renter)}
                          </span>
                        )}
                        <div>
                          <p className="text-gray-900 text-sm">
                            {e.renter?.first_name} {e.renter?.last_name}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <IoLocationOutline />
                            <span>{e.renter?.city}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {e.equipment && <ContactButton equipment={e.equipment} />}
                    {e.status === 'completed' && (
                      <>
                        {showReview !== e.rental_id &&
                          (hasReview[e.rental_id] ? (
                            <p className="text-gray-500 text-sm">Vous avez déjà laissé un avis.</p>
                          ) : (
                            <div className="flex justify-center">
                              <button
                                onClick={() => setShowReview(e.rental_id)}
                                className="btn p-3 bg-gray-100 hover:bg-gray-200  text-gray-900"
                              >
                                Laisser un avis
                              </button>
                            </div>
                          ))}
                      </>
                    )}
                    <div className="text-right">
                      <p className="text-2xl text-primary">{e.total_price} €</p>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>

                  {e.status === 'pending' && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-600">
                        Veuillez confirmer ou refuser la demande :
                      </p>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
                          onClick={() => handleChangeStatus(e.rental_id, 'accepted')}
                        >
                          ✓ Confirmer
                        </button>
                        <button
                          className="flex-1 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                          onClick={() => handleChangeStatus(e.rental_id, 'refused')}
                        >
                          ✕ Refuser
                        </button>
                      </div>
                    </div>
                  )}

                  {e.status === 'confirmed' && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleClick}
                        className="btn font-normal border-red-400 bg-red-200"
                      >
                        Annuler la location
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
      <Modal isOpen={showReview !== null} onClose={() => setShowReview(null)}>
        {showReview !== null && (
          <Reviews
            rental={ownerRentals.find((r) => r.rental_id === showReview)!}
            reviewSubmitted={() => {
              if (showReview !== null) {
                setHasReview((prev) => ({
                  ...prev,
                  [showReview]: true,
                }));
              }
              setShowReview(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
