import { WORKERS } from '../data/workers';
const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function getAdminStats() {
  await wait();
  return {
    totalUsers: 48213,
    workers: 21870,
    customers: 26343,
    verifiedWorkers: 15992,
    activeBookings: 1284,
    completedServices: 96540,
    reports: 37,
  };
}

export async function listVerificationRequests() {
  await wait();
  return WORKERS.slice(0, 8).map((w) => ({
    id: w.id,
    name: w.name,
    category: w.category,
    city: w.city,
    submittedAt: '2026-08-0' + ((Math.floor(Math.random() * 7)) + 1),
    documents: ['Government ID', 'Address Proof', 'Police Verification', 'Professional Certificate'],
    status: w.verified.police && w.verified.certificate ? 'Approved' : 'Pending',
  }));
}
