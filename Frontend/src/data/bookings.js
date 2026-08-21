export const REVIEWS = [
  { id: 'r-1', workerId: 'w-1001', customer: 'Ram Jaiswal', rating: 5, date: '2026-07-28', text: 'Rewired our entire 2BHK in a day. Explained every step and left the place spotless.', images: [] },
  { id: 'r-2', workerId: 'w-1001', customer: 'Dhiraj Badre', rating: 5, date: '2026-07-12', text: 'Fixed a tripping MCB that two other electricians could not diagnose. Highly recommend.', images: [] },
  { id: 'r-3', workerId: 'w-1001', customer: 'Raman Gulhane', rating: 4, date: '2026-06-30', text: 'Good work, arrived a little later than the slot but called ahead to inform.', images: [] },
  { id: 'r-4', workerId: 'w-1006', customer: 'Ojaswi Makode', rating: 5, date: '2026-07-20', text: 'The sofa looks brand new. Team was polite and very thorough.', images: [] },
  { id: 'r-5', workerId: 'w-1006', customer: 'Karthik Menon', rating: 5, date: '2026-07-02', text: 'Booked for move-out cleaning, got our full deposit back thanks to how spotless it was.', images: [] },
  { id: 'r-6', workerId: 'w-1010', customer: 'Rutuja Awhad', rating: 5, date: '2026-07-15', text: 'Same-day gas refill before a heatwave weekend. Genuinely grateful.', images: [] },
  { id: 'r-7', workerId: 'w-1015', customer: 'Neha Kapoor', rating: 5, date: '2026-07-25', text: 'Did my sister’s bridal makeup — flawless and stayed put the whole day.', images: [] },
  { id: 'r-8', workerId: 'w-1003', customer: 'Anjali Verma', rating: 5, date: '2026-07-18', text: 'Reliable for over a year now. Trustworthy with the house keys too.', images: [] },
];

export const getReviewsByWorker = (workerId) => REVIEWS.filter((r) => r.workerId === workerId);

export const BOOKINGS = [
  { id: 'b-1', workerId: 'w-1001', workerName: 'Ram Jaiswal', service: 'House Rewiring', date: '2026-08-14', time: '10:00 AM', location: 'Andheri West, Mumbai', price: 1800, status: 'upcoming' },
  { id: 'b-2', workerId: 'w-1010', workerName: 'Prakash Jadhav', service: 'AC Gas Refill', date: '2026-08-10', time: '2:00 PM', location: 'Powai, Mumbai', price: 699, status: 'upcoming' },
  { id: 'b-3', workerId: 'w-1006', workerName: 'Fatima Sheikh', service: 'Deep Cleaning — 2BHK', date: '2026-07-22', time: '9:00 AM', location: 'Koramangala, Bengaluru', price: 1499, status: 'completed' },
  { id: 'b-4', workerId: 'w-1015', workerName: 'Geeta Bhosale', service: 'Bridal Makeup Trial', date: '2026-07-15', time: '11:00 AM', location: 'Viman Nagar, Pune', price: 2499, status: 'completed' },
  { id: 'b-5', workerId: 'w-1008', workerName: 'Anil Kumar Reddy', service: '2BHK Interior Painting', date: '2026-06-30', time: '9:00 AM', location: 'Madhapur, Hyderabad', price: 18500, status: 'cancelled' },
];

export const MESSAGES = [
  {
    id: 'c-1',
    workerId: 'w-1001',
    name: 'Kshitij Wasule',
    online: true,
    lastMessage: 'Sure, I can come by 10 AM tomorrow.',
    time: '9:41 AM',
    unread: 2,
    thread: [
      { from: 'them', text: 'Namaste! I can take a look at the wiring issue tomorrow morning.', time: '9:20 AM' },
      { from: 'me', text: 'That works. Is 10 AM okay?', time: '9:35 AM' },
      { from: 'them', text: 'Sure, I can come by 10 AM tomorrow.', time: '9:41 AM' },
    ],
  },
  {
    id: 'c-2',
    workerId: 'w-1006',
    name: 'Piyush Kondekar',
    online: false,
    lastMessage: 'Thank you for the 5-star review!',
    time: 'Yesterday',
    unread: 0,
    thread: [
      { from: 'them', text: 'The apartment is ready for the deep clean whenever you are.', time: 'Mon' },
      { from: 'me', text: 'Perfect, see you Thursday.', time: 'Mon' },
      { from: 'them', text: 'Thank you for the 5-star review!', time: 'Yesterday' },
    ],
  },
  {
    id: 'c-3',
    workerId: 'w-1015',
    name: 'Mukul Aware',
    online: true,
    lastMessage: 'I have Saturday 11 AM free for the trial.',
    time: 'Wed',
    unread: 0,
    thread: [
      { from: 'me', text: 'Do you have any slots this Saturday for a bridal trial?', time: 'Wed' },
      { from: 'them', text: 'I have Saturday 11 AM free for the trial.', time: 'Wed' },
    ],
  },
];

export const NOTIFICATIONS = [
  { id: 'n-1', category: 'Booking', title: 'Booking confirmed', body: 'Ramesh Pawar accepted your booking for Aug 14, 10:00 AM.', time: '10 min ago', read: false },
  { id: 'n-2', category: 'Messages', title: 'New message from Fatima Sheikh', body: '"Thank you for the 5-star review!"', time: '1 hr ago', read: false },
  { id: 'n-3', category: 'Reviews', title: 'You received a new review', body: 'Aarti Kulkarni left you a 5-star review.', time: '3 hr ago', read: true },
  { id: 'n-4', category: 'Verification', title: 'Certificate approved', body: 'Your electrical certification has been verified.', time: 'Yesterday', read: true },
  { id: 'n-5', category: 'Profile', title: 'Profile suggestion', body: 'Add your police verification to raise your trust score.', time: '2 days ago', read: true },
  { id: 'n-6', category: 'Community', title: 'Your post got 12 likes', body: '"5 electrical safety tips for monsoon season"', time: '3 days ago', read: true },
  { id: 'n-7', category: 'System', title: 'Welcome to WorkBridge', body: 'Complete your profile to start receiving requests.', time: '1 week ago', read: true },
];
