import { RiSecurePaymentFill } from 'react-icons/ri';
import { TbCalendarCancel } from 'react-icons/tb';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { fr } from 'react-day-picker/locale';
import { DayPicker } from 'react-day-picker';
import { setHours, setMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { Equipment } from '../../types/Equipment';
import { useAuth } from '../../contexts/AuthContext';
import { RentalsApi } from '../../services/RentalsApi';
import { Rental } from '../../types/Rental';

type ReservationsProps = {
  equipment: Equipment;
};

export default function Reservations({ equipment }: ReservationsProps) {
  const { user_id } = useAuth();
  const { getRentalbyId } = RentalsApi();
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const navigate = useNavigate();
  const { postRental } = RentalsApi();
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('17:00');
  const [rentedDates, setRentedDates] = useState<{ from: Date; to: Date }[]>([]);
  const [error, setError] = useState('');

  const applyTime = (date: Date | undefined, time: string) => {
    if (!date) return undefined;
    const [h = 0, m = 0] = time.split(':').map((str) => parseInt(str, 10));
    return setHours(setMinutes(date, m), h);
  };

  const handleClick = async () => {
    if (!equipment) return;

    if (!from?.toISOString() || !to?.toISOString()) {
      alert('Merci de bien vouloir selectionner des dates');
      return;
    }
    try {
      const form = {
        start_date: from?.toISOString(),
        end_date: to?.toISOString(),
        total_price: totalPrice,
        status: 'pending',
        equipment_id: equipment.equipment_id,
      };
      await postRental(form);
      navigate(`/summary-rental/${equipment.equipment_id}`);
    } catch (err) {
      console.log(err);
      setError('Impossible créer la réservation');
    }
  };

  const numberOfDays = () => {
    if (!from?.toISOString() || !to?.toISOString()) return 0;
    const start = new Date(from?.toISOString());
    const end = new Date(to?.toISOString());

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffDate =
      Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    return diffDate;
  };
  const days = Math.round(numberOfDays() / (1000 * 60 * 60 * 24) + 1);
  if (!equipment) return <Loader />;
  const totalPrice = days * equipment.price;

  useEffect(() => {
    if (!equipment?.equipment_id) return;
    async function fetchRentalById() {
      try {
        const data = await getRentalbyId(equipment.equipment_id);
        const dataRanges = data.map((r: Rental) => ({
          from: new Date(r.start_date),
          to: new Date(r.end_date),
        }));

        setRentedDates(dataRanges);
      } catch (err) {
        console.log(err);
        setError("Chargement des disponibilités de l'équipement impossible");
      }
    }
    fetchRentalById();
  }, [equipment.equipment_id]);

  return (
    <>
      {equipment.owner_id && equipment.owner_id !== Number(user_id) && (
        <div className="bg-white flex flex-col gap-6 rounded-xl border sticky top-24 p-2 md:p-8 ">
          <div className=" flex-col text-center ">
            <div className="text-3xl text-primary font-semibold">{equipment.price}€</div>
            <span className=" text-gray-500"> par jour</span>
          </div>
          <hr />
          <DayPicker
            animate
            mode="range"
            required
            selected={{ from, to }}
            onSelect={(range) => {
              setFrom(applyTime(range?.from, fromTime));
              setTo(applyTime(range?.to, toTime));
            }}
            disabled={[{ before: new Date() }, ...rentedDates]}
            weekStartsOn={1}
            modifiersClassNames={{
              rented: 'bg-red-400 text-white line-through rounded-full ',
              selected: 'bg-accent text-black rounded',
              range_start: 'bg-accent text-black rounded-l-full',
              range_end: 'bg-accent text-black rounded-r-full',
              today: 'text-primary font-bold',
            }}
            className=" p-2 "
            components={{
              Chevron: ({ orientation, onClick }: any) => {
                return orientation === 'left' ? (
                  <IoChevronBack className="text-accent w-6 h-6 " onClick={onClick} />
                ) : (
                  <IoChevronForward className="text-accent w-6 h-6" onClick={onClick} />
                );
              },
            }}
            modifiers={{ rented: rentedDates }}
            navLayout="around"
            locale={fr}
          />
          <div className="flex justify-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div> En cours de réservation <br /> ou
              déjà réservé
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent rounded"></div> Votre sélection
            </span>
          </div>
          {from && (
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Heure de début</label>
                <input
                  type="time"
                  value={fromTime}
                  className="form-input"
                  onChange={(e) => {
                    setFromTime(e.target.value);
                    setFrom(applyTime(from, e.target.value));
                  }}
                />
              </div>
              {to && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Heure de fin</label>
                  <input
                    type="time"
                    value={toTime}
                    className="form-input"
                    onChange={(e) => {
                      setToTime(e.target.value);
                      setTo(applyTime(to, e.target.value));
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {from && to && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {equipment.price} € x {days} {days === 1 ? 'jour' : 'jours'}
                </span>{' '}
                <br />
                <span className="font-bold">{totalPrice} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold ">Caution </span>
                <span className="font-semibold">{equipment.caution} €</span>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <span className="font-bold text-primary text-xl ">Total </span>
                <span className="font-semibold text-3xl text-primary">{totalPrice} €</span>
              </div>
              <span className="flex text-sm text-gray-600 text-center">
                La caution sera restituée après le retour du matériel en bon état
              </span>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleClick}
            className="btn flex-1 items-center rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer"
          >
            Réserver
          </button>

          <span className="flex text-sm text-gray-600">
            <RiSecurePaymentFill className="text-xl mr-4" /> Paiement sécurisé
          </span>
          <span className="flex text-sm text-gray-600">
            <TbCalendarCancel className="text-xl mr-4" /> Annulation gratuite 24h avant
          </span>
        </div>
      )}
      {equipment.owner_id && equipment.owner_id == Number(user_id) && (
        <div className=" flex mt-48">
          <p className="text-center font-semibold">
            Vous ne pouvez pas réserver votre propre équipement{' '}
          </p>
        </div>
      )}
    </>
  );
}
