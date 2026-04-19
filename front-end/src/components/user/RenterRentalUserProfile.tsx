import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import getInitials from '../GetInitials';
import { useStatus } from '../../contexts/StatusContext';
import Loader from '../Loader';
import { RentalsApi } from '../../services/RentalsApi';
import { Rental } from '../../types/Rental';
import StripePaiement from '../StripePaiement';
import Reviews from '../reviews/Reviews';
import { ReviewsApi } from '../../services/ReviewsApi';
import FormatDate from '../FormatDate';
import Modal from '../Modals';
import { FaFilter } from 'react-icons/fa';
import ContactButton from '../contact-button';

export default function RenterRentalsUserProfile() {
  const [renterRentals, setRenterRentals] = useState<Rental[]>([]);
  const [showReview, setShowReview] = useState<number | null>(null);
  const [hasReview, setHasReview] = useState<{ [rental_id: number]: boolean }>({});
  const { getEquipmentIsReview, getUserIsReview } = ReviewsApi();
  const { getRenterRentals } = RentalsApi();
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [filterByDate, setFilterByDate] = useState<'asc' | 'desc'>('desc');
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
  const filtredRentals = (
    filterByStatus === 'all'
      ? renterRentals
      : renterRentals.filter((r) => r.status === filterByStatus)
  ).sort((a, b) => {
    const diff = new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
    return filterByDate === 'desc' ? diff : -diff;
  });

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
              Trouver du matériel à emprunter{' '}
            </div>{' '}
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl text-gray-900 my-4"> Matériel que j’ai loué</h2>
            <div className="flex items-center  gap-4">
              <label className="flex items-center gap-2 text-sm text-primary">
                <FaFilter /> Filtrer par date :
              </label>
              <select
                value={filterByDate}
                onChange={(e) => setFilterByDate(e.target.value as 'desc' | 'asc')}
                className=" border rounded-lg px-3 py-1 text-sm text-gray-700"
              >
                <option value="desc">Plus recent</option>
                <option value="asc">Plus ancien</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-primary">
                <FaFilter /> Filtrer par status :
              </label>
              <select
                value={filterByStatus}
                onChange={(e) => setFilterByStatus(e.target.value)}
                className=" border rounded-lg px-3 py-1 text-sm text-gray-700"
              >
                <option value="all">Tous</option>
                <option value="pending">En attente</option>
                <option value="accepted">Accepté</option>
                <option value="confirmed">Confirmé</option>
                <option value="completed">Terminé</option>
                <option value="refused">Refusé</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {filtredRentals &&
              filtredRentals.map((r) => (
                <div key={r.rental_id} className="bg-white rounded-xl border p-4 space-y-4">
                  <div className="flex gap-4 items-start">
                    <Link to={`/equipment/${r.equipment?.equipment_id}`}>
                      <img
                        src={r.equipment?.photo}
                        alt={r.equipment?.title}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                      />
                    </Link>
                    <div className="flex gap-2 w-full items-start">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {r.equipment?.title}
                        </h3>
                        <div className="text-gray-600 text-sm">
                          <p>Du {FormatDate(r.start_date)}</p>
                          <p>Au {FormatDate(r.end_date)}</p>
                        </div>
                      </div>
                      <span
                        className={`ml-auto inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm font-medium w-fit ${status[r.status].className}`}
                      >
                        {status[r.status].label}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between">
                    <Link to={`/user-profile/${r.renter?.user_id}`}>
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
                          <p className="text-gray-00 text-sm">
                            {r.equipment?.owner?.first_name} {r.equipment?.owner?.last_name}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <IoLocationOutline />
                            <span>{r.equipment?.owner?.city}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {r.equipment && <ContactButton equipment={r.equipment} />}
                    {r.status === 'completed' && (
                      <>
                        {showReview !== r.rental_id &&
                          (hasReview[r.rental_id] ? (
                            <p className="text-gray-500 text-sm">Vous avez déjà laissé un avis.</p>
                          ) : (
                            <div className="flex justify-center">
                              <button
                                onClick={() => setShowReview(r.rental_id)}
                                className="btn p-3 bg-gray-100 hover:bg-gray-200  text-gray-900"
                              >
                                Laisser un avis
                              </button>
                            </div>
                          ))}
                      </>
                    )}

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
                </div>
              ))}
          </div>
        </>
      )}
      <Modal isOpen={showReview !== null} onClose={() => setShowReview(null)}>
        {showReview !== null && (
          <Reviews
            rental={renterRentals.find((r) => r.rental_id === showReview)!}
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
