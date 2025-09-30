import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "../_lib/data-service";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-[auto_1fr] border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
