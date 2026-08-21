import { NOTIFICATIONS } from '../data/bookings';
const wait = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export async function listNotifications() {
  await wait();
  return NOTIFICATIONS;
}
