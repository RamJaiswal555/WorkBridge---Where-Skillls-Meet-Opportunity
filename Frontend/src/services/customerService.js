const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function getSavedWorkerIds() {
  await wait(200);
  try {
    return JSON.parse(localStorage.getItem('workbridge_saved') || '[]');
  } catch {
    return [];
  }
}

export async function toggleSavedWorker(id) {
  await wait(150);
  const list = JSON.parse(localStorage.getItem('workbridge_saved') || '[]');
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem('workbridge_saved', JSON.stringify(next));
  return next;
}

export async function getRecentSearches() {
  await wait(150);
  return ['Electrician near Andheri', 'Deep cleaning Koramangala', 'AC technician Powai'];
}
