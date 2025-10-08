import SubmitButton from "@/app/_components/Button";
import { updateBookingAction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
// import { useFormStatus } from "react-dom";

export default async function Page({ params }) {
  // CHANGE
  const { reservationId } = params;
  const { numGuests, observations, cabinId } = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(cabinId);
  // const reservationId = 23;
  // const maxCapacity = 23;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBookingAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
          <input type="hidden" name="bookingId" value={reservationId} />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel={"Updating..."}>
            Update booking
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

// function Button() {
//   const { pending } = useFormStatus();
//   return (
//     <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
//       {pending ? "Updating..." : "Update reservation"}
//     </button>
//   );
// }
