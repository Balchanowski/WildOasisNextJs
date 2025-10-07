"use server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { th } from "date-fns/locale";
import { getBookings, updateBooking } from "./data-service";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

// export async function signInAction() {
//   redirect("/api/auth/signin/google?callbackUrl=/account");
// }

export async function updateGuest(formdata) {
  const session = await getServerSession(authConfig);
  if (!session)
    throw new Error("You must be logged in to update your profile.");

  const nationalID = formdata.get("nationalID");
  const [nationality, countryFlag] = formdata.get("nationality").split("%");

  if (/^[a-zA-Z0-9]{6,12}$/.test(nationalID) === false) {
    throw new Error(
      "National ID must be alphanumeric and between 6 to 12 characters long."
    );
  }
  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/accout/profile");
}

export async function deleteReservation(bookingId) {
  const session = await getServerSession(authConfig);

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((b) => b.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  if (!session)
    throw new Error("You must be logged in to delete a reservation.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Reservation could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formdata) {
  const session = await getServerSession(authConfig);
  const userBookings = await getBookings(session.user.guestId);
  const bookingIds = userBookings.map((b) => b.id);

  if (!session)
    throw new Error("You must be logged in to update your reservation.");

  const numGuests = formdata.get("numGuests");
  const observations = formdata.get("observations").slice(0, 1000);
  const bookingId = Number(formdata.get("bookingId"));

  if (!bookingIds.includes(parseInt(bookingId)))
    throw new Error("You are not allowed to update this booking!");

  console.log(formdata);
  const updatedData = { numGuests, observations };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
