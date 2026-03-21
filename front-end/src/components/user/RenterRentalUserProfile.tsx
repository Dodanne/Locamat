import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import getInitials from '../GetInitials';
import { useStatus } from '../../context/StatusContext';
import Loader from '../Loader';
import { RentalsApi } from '../../services/RentalsApi';
import { Rental } from '../../types/Rental';
import StripePaiement from '../StripePaiement';
import Reviews from '../reviews/Reviews';
import { ReviewsApi } from '../../services/ReviewsApi';
import FormatDate from '../FormatDate';

export default function RenterRentalsUserProfile() {
  const [renterRentals, setRenterRentals] = useState<Rental[]>([]);
  const [showReview, setShowReview] = useState<{ [rental_id: number]: boolean }>({});
  const [hasReview, setHasReview] = useState<{ [rental_id: number]: boolean }>({});
  const { getEquipmentIsReview, getUserIsReview } = ReviewsApi();
  const { getRenterRentals } = RentalsApi();
  const { user_id } = useAuth();
  const { status } = useStatus();

  useEffect(() => {
    if (!user_id) return;
    const id = user_id;
    async function fetchRenterRental() {
      try {
        const data = await getRenterRentals(id);
        setRenterRentals(data || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRenterRental();
  }, [user_id]);

  useEffect(() => {
    async function isReview() {
      for (const rental of renterRentals)
        try {
          const resUser = await getUserIsReview(rental.rental_id);
          const resEquipment = await getEquipmentIsReview(rental.rental_id);
          setHasReview((prev) => ({
            ...prev,
            [rental.rental_id]: resUser.hasReview && resEquipment.hasReview,
          }));
        } catch (err) {
          console.log(err);
        }
    }
    isReview();
  }, [renterRentals]);

  const handleClick = () => {
    confirm('Êtes-vous sûr de vouloir annuler cette location ?');
  };
  if (!renterRentals) return <Loader />;
  return (
    <>
      {renterRentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <p className="text-lg mb-4"> Vous n’avez pas encore commencé à louer. </p>
          <p className="mb-6"> Commencez dès à présent à louer du materiel près de chez vous. </p>
          <Link to="/rechercher">
            {' '}
            <div className="btn p-3 bg-accent text-white">
              {' '}
              Trouver du materiel à emprunter{' '}
            </div>{' '}
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl text-gray-900 my-4"> Matériel que j’ai loué</h2>
          </div>
          <div className="space-y-4">
            {renterRentals &&
              renterRentals.map((r) => (
                <div key={r.rental_id} className="bg-white rounded-xl border p-4 space-y-4">
                  <div className="flex gap-4 items-start">
                    <Link to={`/equipment/${r.equipment?.equipment_id}`}>
                      <img
                        src={r.equipment?.photo}
                        alt={r.equipment?.title}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-gray-900">{r.equipment?.title}</h3>
                      <span
                        className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm font-medium w-fit ${status[r.status].className}`}
                      >
                        {status[r.status].label}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center gap-3">
                    {r.equipment?.owner?.photo && r.equipment?.owner?.photo !== 'NULL' ? (
                      <img
                        src={r.equipment?.owner?.photo}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full">
                        {getInitials(r.equipment?.owner)}
                      </span>
                    )}
                    <div>
                      <p className="text-gray-700 text-sm">
                        {r.equipment?.owner?.first_name} {r.equipment?.owner?.last_name}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <IoLocationOutline />
                        <span>{r.equipment?.owner?.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 text-sm">
                      <p>Du {FormatDate(r.start_date)}</p>
                      <p>Au {FormatDate(r.end_date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-primary">{r.total_price} €</p>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-sm text-gray-500">Caution : {r.equipment?.caution} €</p>
                    </div>
                  </div>

                  {r.status === 'accepted' && (
                    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 text-center">
                        {r.equipment?.owner?.last_name} a accepté votre demande. Pour confirmer,
                        payez dès maintenant :
                      </p>
                      <StripePaiement rental_id={Number(r.rental_id)} />
                    </div>
                  )}

                  {r.status === 'confirmed' && (
                    <div className="flex justify-end">
                      <button onClick={handleClick} className="btn border-red-400 bg-red-200">
                        Annuler la location
                      </button>
                    </div>
                  )}

                  {r.status === 'completed' && (
                    <>
                      {!showReview[r.rental_id] ? (
                        hasReview[r.rental_id] ? (
                          <p className="text-gray-500 text-sm">Vous avez déjà laissé un avis.</p>
                        ) : (
                          <button
                            onClick={() =>
                              setShowReview((prev) => ({ ...prev, [r.rental_id]: true }))
                            }
                            className="btn hover:bg-gray-300 w-full"
                          >
                            Laisser un avis
                          </button>
                        )
                      ) : (
                        <Reviews
                          rental={r}
                          reviewSubmitted={() => {
                            setShowReview((prev) => ({ ...prev, [r.rental_id]: false }));
                            setHasReview((prev) => ({ ...prev, [r.rental_id]: true }));
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}
