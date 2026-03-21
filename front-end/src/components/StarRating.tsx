import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaRegStarHalfStroke } from 'react-icons/fa6';

type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        if (rating >= index + 1) {
          return <FaStar key={index} className="h-5 w-5 text-yellow-400" />;
        }

        if (rating >= index + 0.5) {
          return (
            <div key={index} className="relative h-5 w-5">
              <FaRegStarHalfStroke key={index} className="h-5 w-5 text-yellow-400" />
            </div>
          );
        }

        return <FaRegStar key={index} className="h-5 w-5 text-yellow-400" />;
      })}
    </div>
  );
}
