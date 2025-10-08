import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "../_lib/data-service";
import { authConfig } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await getServerSession(authConfig);

  return (
    <div className="grid grid-cols-[auto_1fr] border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
