import { WORKERS, getWorkerById as _byId, getWorkersByCategory as _byCategory, getFeaturedWorkers as _featured } from '../data/workers';
import { getReviewsByWorker } from '../data/bookings';

const wait = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function listWorkers(filters = {}) {
  await wait();
  let results = [...WORKERS];
  if (filters.category) results = results.filter((w) => w.category === filters.category);
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (w) => w.name.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.skills.some((s) => s.toLowerCase().includes(q))
    );
  }
  if (filters.city) results = results.filter((w) => w.city === filters.city);
  if (filters.verifiedOnly) results = results.filter((w) => w.verified.identity && w.verified.police);
  if (filters.availableToday) results = results.filter((w) => w.availableToday);
  if (filters.emergency) results = results.filter((w) => w.emergencyAvailable);
  if (filters.minRating) results = results.filter((w) => w.rating >= filters.minRating);
  if (filters.maxDistance) results = results.filter((w) => w.distanceKm <= filters.maxDistance);
  if (filters.gender) results = results.filter((w) => w.gender === filters.gender);
  if (filters.sortBy === 'rating') results.sort((a, b) => b.rating - a.rating);
  else if (filters.sortBy === 'distance') results.sort((a, b) => a.distanceKm - b.distanceKm);
  else if (filters.sortBy === 'experience') results.sort((a, b) => b.experienceYears - a.experienceYears);
  else if (filters.sortBy === 'price') results.sort((a, b) => a.startingPrice - b.startingPrice);
  else results.sort((a, b) => (b.trustScore + b.rating * 10) - (a.trustScore + a.rating * 10));
  return results;
}

export async function getWorker(id) {
  await wait(300);
  const worker = _byId(id);
  if (!worker) throw new Error('Worker not found.');
  return { ...worker, reviews: getReviewsByWorker(id) };
}

export async function getFeatured() {
  await wait(300);
  return _featured();
}

export async function getSimilarWorkers(worker) {
  await wait(250);
  return WORKERS.filter((w) => w.category === worker.category && w.id !== worker.id).slice(0, 4);
}

export const getWorkersByCategory = _byCategory;
