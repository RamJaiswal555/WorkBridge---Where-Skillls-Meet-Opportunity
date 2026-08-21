import { BOOKINGS } from '../data/bookings';
const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function listBookings(status) {
  await wait();
  if (!status || status === 'all') return BOOKINGS;
  return BOOKINGS.filter((b) => b.status === status);
}

export async function createBooking(payload) {
  await wait(500);
  return { id: `b-${Date.now()}`, status: 'upcoming', ...payload };
}
