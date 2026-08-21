// Mock auth service. Every function returns a Promise so it is a drop-in
// replacement point for a real REST/GraphQL backend later.

const DELAY = 600;
const wait = (ms = DELAY) => new Promise((res) => setTimeout(res, ms));

const STORAGE_KEY = 'workbridge_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

function buildUser({ role, name, email, phone }) {
  return {
    id: `u-${Math.random().toString(36).slice(2, 9)}`,
    role, // 'customer' | 'provider' | 'admin'
    name: name || (role === 'provider' ? 'New Professional' : 'New Customer'),
    email: email || '',
    phone: phone || '',
    avatar: (name || 'W B').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
    createdAt: new Date().toISOString(),
  };
}

export async function login({ identifier, password, role }) {
  await wait();
  if (!identifier || !password) throw new Error('Enter your email/phone and password.');
  const user = buildUser({ role, name: identifier.includes('@') ? identifier.split('@')[0] : 'Rahul Mehta', email: identifier.includes('@') ? identifier : '', phone: !identifier.includes('@') ? identifier : '' });
  writeStoredUser(user);
  return user;
}

export async function signup({ role, name, email, phone, password }) {
  await wait();
  if (!name || !password) throw new Error('Please complete all required fields.');
  const user = buildUser({ role, name, email, phone });
  writeStoredUser(user);
  return user;
}

export async function sendOTP({ phone }) {
  await wait(500);
  if (!phone || phone.length < 10) throw new Error('Enter a valid 10-digit phone number.');
  return { success: true, demoOtp: '123456' };
}

export async function verifyOTP({ phone, otp }) {
  await wait(500);
  if (otp !== '123456') throw new Error('Invalid OTP. Please try again.');
  return { success: true };
}

export async function loginWithOTP({ phone, role }) {
  await wait();
  const user = buildUser({ role, name: 'Rahul Mehta', phone });
  writeStoredUser(user);
  return user;
}

export async function forgotPassword({ identifier }) {
  await wait(500);
  if (!identifier) throw new Error('Enter your registered email or phone.');
  return { success: true };
}

export async function resetPassword({ password }) {
  await wait(500);
  if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
  return { success: true };
}

export async function loginWithGoogle({ role }) {
  await wait(700);
  const user = buildUser({ role, name: 'Ananya Kapoor', email: 'ananya.kapoor@gmail.com' });
  writeStoredUser(user);
  return user;
}

export async function loginAdmin({ identifier, password }) {
  await wait();
  if (identifier !== 'admin@workbridge.in' || password !== 'admin123') {
    throw new Error('Invalid admin credentials.');
  }
  const user = buildUser({ role: 'admin', name: 'WorkBridge Admin', email: identifier });
  writeStoredUser(user);
  return user;
}

export async function logout() {
  await wait(200);
  writeStoredUser(null);
  return { success: true };
}

export function getCurrentUser() {
  return readStoredUser();
}
