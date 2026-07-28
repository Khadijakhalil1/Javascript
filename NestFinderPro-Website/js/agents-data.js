// NestFinder Pro — Central agent dataset
// Basic info used by property-detail.html (Day 2) and about.html team section.
// Full profile pages + listings-per-agent are built out on Day 3
// (pages/agents.html directory + pages/agent-profile.html).

const AGENTS = [
  {
    id: 'hamza',
    name: 'Hamza Sheikh',
    title: 'Senior Property Consultant',
    specialty: 'Luxury Villas & Townhouses',
    photo: '../images/agent-1.png',
    phone: '+92 300 1112222',
    email: 'hamza@nestfinderpro.demo',
    rating: 4.9,
    reviews: 142,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hamza has spent over a decade helping families find homes that fit both their lifestyle and their budget, with a focus on premium villas and gated communities.',
  },
  {
    id: 'sadia',
    name: 'Sadia Farooq',
    title: 'Residential Sales Lead',
    specialty: 'Apartments & Penthouses',
    photo: '../images/agent-2.png',
    phone: '+92 300 3334444',
    email: 'sadia@nestfinderpro.demo',
    rating: 4.8,
    reviews: 118,
    bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sadia specializes in high-rise residences and works closely with first-time buyers to make the process feel simple.',
  },
  {
    id: 'usman',
    name: 'Usman Tariq',
    title: 'Commercial Leasing Specialist',
    specialty: 'Commercial & Office Spaces',
    photo: '../images/agent-3.png',
    phone: '+92 300 5556666',
    email: 'usman@nestfinderpro.demo',
    rating: 4.7,
    reviews: 96,
    bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Usman advises businesses of all sizes on leasing and acquiring commercial property in prime locations.',
  },
];

if (typeof module !== 'undefined') module.exports = AGENTS;
