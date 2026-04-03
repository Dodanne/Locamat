import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { ReviewsApi } from '../../services/ReviewsApi';
import { Rental } from '../../types/Rental';
import { useAuth } from '../../contexts/AuthContext';

type ReviewProps = {
  rental: Rental;
  reviewSubmitted: () => void;
};

export default function Reviews({ rental, reviewSubmitted }: ReviewProps) {
  const [ratingEquipment, setRatingEquipment] = useState(5);
  const [ratingUser, setRatingUser] = useState(5);
  const [commentEquipment, setCommentEquipment] = useState('');
  const [commentUser, setCommentUser] = useState('');
  const [error, setError] = useState('');
  const { postUserReview, postEquipmentReviews } = ReviewsApi();
  const { user_id } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formUser = {
        rental_id: rental.rental_id,
        rating: ratingUser,
        comment: commentUser,
        status: rental.renter?.user_id === user_id ? 'renter' : 'owner',
      };
      await postUserReview(formUser);

      const formEquipment = {
        rental_id: rental.rental_id,
        rating: ratingEquipment,
        comment: commentEquipment,
      };
      await postEquipmentReviews(formEquipment);
      reviewSubmitted();
    } catch (err) {
      console.log(err);
      setError("Impossible d'envoyer votre avis");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white py-8 w-3/4 mx-auto">
        {rental.renter?.user_id === user_id && (
          <div className="w-full ">
            <h2 className="text-[1.1rem] font-semibold text-center py-4">
              {' '}
              Laisser un avis sur le materiel
            </h2>

            <div className="flex gap-6 py-4">
              <label className="font-medium"> Notez le materiel </label>

              <div className="flex gap-2 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((starEquipment) => (
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="ratingEquipment"
                      value={starEquipment}
                      className="hidden"
                      onChange={() => setRatingEquipment(starEquipment)}
                    />
                    <FaStar
                      className={
                        starEquipment <= ratingEquipment ? 'text-yellow-400' : 'text-gray-300'
                      }
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Votre commentaire </label>
              <textarea
                value={commentEquipment}
                onChange={(e) => setCommentEquipment(e.target.value)}
                className="border rounded p-2 resize-none mr-4"
                placeholder="Partagez votre expérience avec le matériel ..."
                required
              />
            </div>
          </div>
        )}
        <div className=" w-full ">
          <h2 className="text-[1.1rem] font-semibold text-center py-4">
            {' '}
            Partagez votre expérience avec cette personne{' '}
          </h2>

          <div className="flex gap-6 py-4">
            <label className="font-medium"> Notez l'utilisateur </label>

            <div className="flex gap-2 text-2xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((starUser) => (
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="ratingUser"
                    value={starUser}
                    className="hidden"
                    onChange={() => setRatingUser(starUser)}
                  />
                  <FaStar
                    className={starUser <= ratingUser ? 'text-yellow-400' : 'text-gray-300'}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium"> Votre commentaire</label>
            <textarea
              value={commentUser}
              onChange={(e) => setCommentUser(e.target.value)}
              className="border rounded p-2 resize-none mr-4"
              placeholder="Partagez votre expérience sur la personne..."
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center">
          <button type="submit" className="btn bg-accent text-white hover:bg-[#0087BB] w-3/4">
            Envoyer l'avis
          </button>
        </div>
      </form>
    </>
  );
}
