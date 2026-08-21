// Reusable, extensible category system
export const CATEGORIES = [
  { id: 'electrician', name: 'Electrician', icon: 'Zap', color: 'amber', description: 'Wiring, repairs & installations' },
  { id: 'plumber', name: 'Plumber', icon: 'Wrench', color: 'blue', description: 'Leaks, fittings & pipeline work' },
  { id: 'maid', name: 'Maid', icon: 'Sparkles', color: 'pink', description: 'Household help & housekeeping' },
  { id: 'cook', name: 'Cook', icon: 'ChefHat', color: 'orange', description: 'Home-style & specialty cooking' },
  { id: 'gardener', name: 'Gardener', icon: 'Flower2', color: 'green', description: 'Lawn care & landscaping' },
  { id: 'cleaner', name: 'Cleaner', icon: 'Sparkle', color: 'cyan', description: 'Deep cleaning & sanitation' },
  { id: 'carpenter', name: 'Carpenter', icon: 'Hammer', color: 'yellow', description: 'Furniture & woodwork' },
  { id: 'painter', name: 'Painter', icon: 'PaintRoller', color: 'purple', description: 'Interior & exterior painting' },
  { id: 'driver', name: 'Driver', icon: 'Car', color: 'slate', description: 'Personal & commercial driving' },
  { id: 'ac-technician', name: 'AC Technician', icon: 'Snowflake', color: 'sky', description: 'AC service & repair' },
  { id: 'watchman', name: 'Watchman', icon: 'ShieldCheck', color: 'indigo', description: 'Security & surveillance' },
  { id: 'home-tutor', name: 'Home Tutor', icon: 'BookOpen', color: 'emerald', description: 'Academic tutoring at home' },
  { id: 'pest-control', name: 'Pest Control', icon: 'Bug', color: 'lime', description: 'Pest treatment & prevention' },
  { id: 'laundry', name: 'Laundry Worker', icon: 'Shirt', color: 'teal', description: 'Washing, ironing & folding' },
  { id: 'appliance-repair', name: 'Appliance Repair', icon: 'Refrigerator', color: 'blue', description: 'Repair of home appliances' },
  { id: 'handyman', name: 'Handyman', icon: 'Hammer', color: 'orange', description: 'General home fixes' },
  { id: 'mover', name: 'Mover', icon: 'Truck', color: 'rose', description: 'Packing & relocation' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: 'Sparkles', color: 'fuchsia', description: 'Salon & wellness at home' },
  { id: 'other', name: 'Other Services', icon: 'Grid2x2', color: 'gray', description: 'More household professionals' },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
