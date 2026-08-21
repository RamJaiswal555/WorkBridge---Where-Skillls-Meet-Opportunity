import { MESSAGES } from '../data/bookings';
const wait = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export async function listConversations() {
  await wait();
  return MESSAGES;
}

export async function sendMessage(conversationId, text) {
  await wait(200);
  return { from: 'me', text, time: 'Just now' };
}
