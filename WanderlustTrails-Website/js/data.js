/* =========================================================
   Wanderlust Trails — Sample Package Data
   Placeholder dataset standing in for the database records
   that will be served from /backend once the API is built
   (see Day 4 of the timeline). Images use Unsplash's free
   "source" endpoint and placehold.co as instructed in the
   content guidelines.
   ========================================================= */

const TOUR_PACKAGES = [
  {
    id: "bali-escape",
    name: "Bali Jungle & Coast Escape",
    destination: "Bali, Indonesia",
    type: "beach",
    duration: 7,
    price: 899,
    rating: 4.8,
    reviews: 132,
    featured: true,
    availability: "available",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    summary: "Rice terraces, hidden waterfalls, and beach sunsets across seven island days."
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps Adventure Trek",
    destination: "Interlaken, Switzerland",
    type: "adventure",
    duration: 6,
    price: 1590,
    rating: 4.9,
    reviews: 87,
    featured: true,
    availability: "available",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    summary: "Alpine trails, cable-car summits, and lakeside villages in the Bernese Oberland."
  },
  {
    id: "marrakech-culture",
    name: "Marrakech Medina & Desert",
    destination: "Marrakech, Morocco",
    type: "cultural",
    duration: 5,
    price: 720,
    rating: 4.6,
    reviews: 154,
    featured: true,
    availability: "limited",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
    summary: "Souks, riads, and a night beneath the stars in the Agafay Desert."
  },
  {
    id: "santorini-family",
    name: "Santorini Family Retreat",
    destination: "Santorini, Greece",
    type: "family",
    duration: 8,
    price: 1340,
    rating: 4.7,
    reviews: 96,
    featured: false,
    availability: "available",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    summary: "Whitewashed villages, calm coves, and kid-friendly boat days on the caldera."
  },
  {
    id: "kyoto-cultural",
    name: "Kyoto Temples & Tea Trail",
    destination: "Kyoto, Japan",
    type: "cultural",
    duration: 6,
    price: 1180,
    rating: 4.9,
    reviews: 201,
    featured: true,
    availability: "available",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    summary: "Bamboo groves, tea ceremonies, and lantern-lit streets of old Kyoto."
  },
  {
    id: "amazon-adventure",
    name: "Amazon Rainforest Expedition",
    destination: "Iquitos, Peru",
    type: "adventure",
    duration: 5,
    price: 1050,
    rating: 4.5,
    reviews: 61,
    featured: false,
    availability: "limited",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    summary: "River canoeing, canopy walks, and nights in a jungle lodge."
  },
  {
    id: "maldives-family",
    name: "Maldives Overwater Getaway",
    destination: "Malé, Maldives",
    type: "beach",
    duration: 5,
    price: 2150,
    rating: 4.8,
    reviews: 74,
    featured: false,
    availability: "available",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    summary: "Overwater villas, house-reef snorkeling, and a private sandbank picnic."
  },
  {
    id: "capetown-family",
    name: "Cape Town Family Discovery",
    destination: "Cape Town, South Africa",
    type: "family",
    duration: 7,
    price: 980,
    rating: 4.6,
    reviews: 58,
    featured: false,
    availability: "available",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    summary: "Table Mountain, penguin beaches, and a safari day trip for all ages."
  },
  {
    id: "patagonia-adventure",
    name: "Patagonia Peaks & Glaciers",
    destination: "El Calafate, Argentina",
    type: "adventure",
    duration: 9,
    price: 1980,
    rating: 4.9,
    reviews: 39,
    featured: false,
    availability: "unavailable",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    summary: "Glacier trekking, granite spires, and windswept steppe crossings."
  }
];

/* Popular destinations shown on the homepage — derived from
   the package list but kept as a curated subset. */
const POPULAR_DESTINATIONS = [
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", count: 1 },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", count: 1 },
  { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", count: 1 },
  { name: "Interlaken, Switzerland", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80", count: 1 },
  { name: "Marrakech, Morocco", image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80", count: 1 },
  { name: "Malé, Maldives", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", count: 1 }
];

const TESTIMONIALS = [
  { name: "Amara Osei", trip: "Marrakech Medina & Desert", rating: 5, quote: "Every day felt planned by someone who actually knew the city. The desert night was unforgettable." },
  { name: "Daniyal Raza", trip: "Swiss Alps Adventure Trek", rating: 5, quote: "Well-paced, well-guided, and the views never stopped. Booking and support were smooth throughout." },
  { name: "Wei Lin", trip: "Kyoto Temples & Tea Trail", rating: 4, quote: "Loved the small-group pace. Would have liked one more free afternoon, but a wonderful trip overall." }
];
