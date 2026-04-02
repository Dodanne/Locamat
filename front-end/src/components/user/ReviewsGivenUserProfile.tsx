import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ReviewsApi } from '../../services/ReviewsApi';
import { ReviewUser } from '../../types/Review_user';
import Loader from '../Loader';
import getInitials from '../GetInitials';
import FormatDate from '../FormatDate';
import { IoLocationOutline } from 'react-icons/io5';
import StarRating from '../StarRating';
import { Link } from 'react-router-dom';
import { ReviewEquipment } from '../../types/Review_equipment';
import { FaStar } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

export default function ReviewsGivenUserProfile() {
  const { user_id } = useAuth();
  const { getUserGivenReviews, patchUserReview, patchEquipmentReview } = ReviewsApi();
  const [userReviews, setUserReviews] = useState<ReviewUser[]>([]);
  const [equipmentReviews, setEquipmentReviews] = useState<ReviewEquipment[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [updateUserReview, setUpdateUserReview] = useState<number | null>(null);
  const [updateEquipmentReview, setUpdateEquipmentReview] = useState<number | null>(null);

  useEffect(() => {
    if (!user_id) return;
    async function fetchUserGivenReviews() {
      try {
        const data = await getUserGivenReviews(Number(user_id));
        setEquipmentReviews(data.equipmentReviews);
        setUserReviews(data.userReviews);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserGivenReviews();
  }, [user_id]);

  async function handleUserReviewUpdate(reviewed_user_id: number, comment: string, rating: number) {
    try {
      await patchUserReview(reviewed_user_id, { comment, rating });

      setUserReviews((prev) =>
        prev.map((r) => (r.reviews_user_id === reviewed_user_id ? { ...r, comment, rating } : r)),
      );
      setUpdateUserReview(null);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleEquipmentReviewUpdate(
    reviewed_equipment_id: number,
    comment: string,
    rating: number,
  ) {
    try {
      await patchEquipmentReview(reviewed_equipment_id, { comment, rating });

      setEquipmentReviews((prev) =>
        prev.map((r) =>
          r.reviews_equipment_id === reviewed_equipment_id ? { ...r, comment, rating } : r,
        ),
      );
      setUpdateEquipmentReview(null);
    } catch (err) {
      console.log(err);
    }
  }

  if (!user_id) return <Loader />;

  return (
    <>
      <div className="space-y-6 mt-3">
        {userReviews.length > 0 ? (
          <div className="flex flex-col gap-4 ">
            {userReviews.map((r) => (
              <div key={r.reviews_user_id} className="bg-white rounded-xl border p-4 space-y-4">
                <div className="flex  flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    {r.reviewedUser?.photo && r.reviewedUser?.photo !== 'NULL' ? (
                      <img
                        src={r.reviewedUser?.photo}
                        className="w-10 h-10 object-cover rounded-full shrink-0"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full shrink-0">
                        {getInitials(r.reviewedUser)}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 whitespace-nowrap">
                        {r.reviewedUser
                          ? `${r.reviewedUser.first_name} ${r.reviewedUser.last_name}`
                          : 'Utilisateur supprimé'}
                      </p>

                      <p className="text-gray-500 text-sm">{FormatDate(r.createdAt)}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <IoLocationOutline />
                        <span>{r.reviewedUser?.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="bg-gray-100 rounded-lg p-4 pb-12 relative border-l-4 border-accent text-center w-full md:w-2/3 ">
                      {updateUserReview === r.reviews_user_id ? (
                        <textarea
                          className="w-full p-2 rounded border"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900 italic text-lg">"{r.comment}"</p>
                      )}
                      {!updateUserReview && (
                        <span className="text-sm text-gray-500 mt-2 block">
                          {r.status === 'renter'
                            ? 'En tant que locataire'
                            : 'En tant que propriétaire'}
                        </span>
                      )}
                      <div className="absolute right-1 bottom-1 ">
                        {updateUserReview === r.reviews_user_id ? (
                          <>
                            <button
                              className="btn bg-white p-2 border-gray-400"
                              onClick={() =>
                                handleUserReviewUpdate(r.reviews_user_id, comment, rating)
                              }
                            >
                              <FiSave />
                              <span className="hidden md:block">Sauvegarder</span>
                            </button>
                            <button
                              onClick={() => setUpdateUserReview(null)}
                              className="btn bg-white p-2 border-gray-400"
                            >
                              <MdCancel />
                              <span className="hidden md:block">Annuler</span>
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn bg-white p-2 border-gray-400"
                            onClick={() => {
                              setUpdateUserReview(r.reviews_user_id);
                              setComment(r.comment);
                              setRating(r.rating);
                            }}
                          >
                            <FaEdit />
                            <span className="hidden md:block">Modifier </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 shrink-0">
                    {updateUserReview === r.reviews_user_id ? (
                      <div className="flex  gap-2 text-2xl cursor-pointer">
                        {[1, 2, 3, 4, 5].map((starUser) => (
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              name="ratingUser"
                              value={starUser}
                              className="hidden"
                              onChange={() => setRating(starUser)}
                            />
                            <FaStar
                              className={starUser <= rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          </label>
                        ))}
                      </div>
                    ) : (
                      <StarRating rating={r.rating} />
                    )}

                    <span className="text-sm text-gray-600">({rating}/5)</span>
                  </div>
                </div>

                <hr />
                <div className="flex  flex-col md:flex-row gap-4 items-center ">
                  <div className="flex  flex-col md:flex-row gap-4">
                    <Link to={`/equipment/${r.rental?.equipment?.equipment_id}`}>
                      <img
                        src={r.rental?.equipment?.photo}
                        alt={r.rental?.equipment?.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                    </Link>
                    <div className="flex-col ">
                      <h3 className="text-gray-900 font-medium">{r.rental?.equipment?.title}</h3>
                      <p className="text-gray-500 text-sm">Du {FormatDate(r.rental?.start_date)}</p>
                      <p className="text-gray-500 text-sm">Au {FormatDate(r.rental?.end_date)}</p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full items-center md:flex-row flex-col ">
                    {equipmentReviews
                      .filter((er) => er.rental_id === r.rental_id)
                      .map((er) => (
                        <>
                          <div className="flex gap-3 w-full md:flex-row justify-center flex-col ">
                            <div className="bg-gray-100 rounded-lg p-4 relative pb-12 border-l-4 border-accent text-center  w-full md:w-2/3 ">
                              {updateEquipmentReview === er.reviews_equipment_id ? (
                                <textarea
                                  className="w-full p-2 rounded border"
                                  rows={3}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              ) : (
                                <p className="text-gray-900 italic text-lg">"{er.comment}"</p>
                              )}
                              <div className=" absolute right-1 bottom-1">
                                {updateEquipmentReview === er.reviews_equipment_id ? (
                                  <>
                                    <button
                                      className="btn bg-white p-2 border-gray-400"
                                      onClick={() =>
                                        handleEquipmentReviewUpdate(
                                          er.reviews_equipment_id,
                                          comment,
                                          rating,
                                        )
                                      }
                                    >
                                      <FiSave />
                                      <span className="hidden md:block">Sauvegarder</span>
                                    </button>
                                    <button
                                      onClick={() => setUpdateEquipmentReview(null)}
                                      className="btn bg-white p-2 border-gray-400"
                                    >
                                      <MdCancel />
                                      <span className="hidden md:block">Annuler</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn bg-white p-2 border-gray-400"
                                    onClick={() => {
                                      setUpdateEquipmentReview(er.reviews_equipment_id);
                                      setComment(er.comment);
                                      setRating(er.rating);
                                    }}
                                  >
                                    <FaEdit />
                                    <span className="hidden md:block">Modifier</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex  items-center  gap-1 ">
                            {updateEquipmentReview === er.reviews_equipment_id ? (
                              <div className="flex gap-2 text-2xl cursor-pointer">
                                {[1, 2, 3, 4, 5].map((starEquipment) => (
                                  <label className="cursor-pointer">
                                    <input
                                      type="radio"
                                      name="ratingUser"
                                      value={starEquipment}
                                      className="hidden"
                                      onChange={() => setRating(starEquipment)}
                                    />
                                    <FaStar
                                      className={
                                        starEquipment <= rating
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }
                                    />
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <StarRating rating={er.rating} />
                            )}

                            <span className="text-sm text-gray-600">({rating}/5)</span>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <p>Aucun avis donné pour le moment</p>
          </div>
        )}
      </div>
    </>
  );
}
