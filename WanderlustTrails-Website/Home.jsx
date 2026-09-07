import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { packages, destinations, testimonials } from '../data/data';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/packages?search=${searchQuery}`;
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('✅ Thank you for subscribing!');
    setEmail('');
  };

  const renderStars = (rating) => '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <p className="hero-eyebrow">✈️ Explore The World</p>
          <h1>Your Journey Begins<br /><span>With Wanderlust Trails</span></h1>
          <p className="hero-subtitle">Discover handpicked tours to the world's most breathtaking destinations</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-primary">Search Tours 🔍</button>
          </form>

          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Tours</span></div>
            <div className="stat"><strong>80+</strong><span>Destinations</span></div>
            <div className="stat"><strong>10K+</strong><span>Happy Travellers</span></div>
            <div className="stat"><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PACKAGES ===== */}
      <section className="featured-packages">
        <div className="container">
          <p className="section-eyebrow">🌟 Top Picks</p>
          <h2 className="section-title">Featured Tour Packages</h2>
          <p className="section-subtitle">Handpicked experiences for every type of traveller</p>

          <div className="packages-grid">
            {packages.slice(0, 3).map(pkg => (
              <div className="package-card" key={pkg.id}>
                <div className="card-image">
                  <img src={pkg.image} alt={pkg.title} />
                  <span className="badge">{pkg.badge}</span>
                  <span className="duration-tag">⏱ {pkg.duration}</span>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span className="destination">📍 {pkg.destination}</span>
                    <span className="type-tag">{pkg.type}</span>
                  </div>
                  <h3>{pkg.title}</h3>
                  <p>{pkg.description}</p>
                  <div className="card-inclusions">
                    {pkg.inclusions.map((inc, i) => (
                      <span key={i} className="inclusion">✓ {inc}</span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="price">
                      <span className="from">From</span>
                      <strong>${pkg.price}</strong>
                      <span className="per">/ person</span>
                    </div>
                    <div className="rating">
                      <span className="stars">{renderStars(pkg.rating)}</span>
                      <span className="review-count">({pkg.reviews})</span>
                    </div>
                  </div>
                  <Link to={`/packages/${pkg.id}`} className="btn-primary" style={{width:'100%', textAlign:'center', marginTop:'15px'}}>
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign:'center', marginTop:'40px'}}>
            <Link to="/packages" className="btn-secondary">View All Packages →</Link>
          </div>
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="destinations-section">
        <div className="container">
          <p className="section-eyebrow">🗺️ Explore</p>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Find your perfect destination from our curated collection</p>

          <div className="destinations-grid">
            {destinations.map(dest => (
              <Link to={`/destinations?place=${dest.name}`} className="dest-card" key={dest.id}>
                <img src={dest.image} alt={dest.name} />
                <div className="dest-overlay">
                  <h3>{dest.name}</h3>
                  <p>{dest.packages} Packages</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <p className="section-eyebrow">💬 Reviews</p>
          <h2 className="section-title">What Our Travellers Say</h2>
          <p className="section-subtitle">Real experiences from real adventurers</p>

          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div className="testimonial-card" key={t.id}>
                <div className="t-stars">{renderStars(t.rating)}</div>
                <p className="t-review">"{t.review}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <p>{t.tour}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h2>Get Exclusive Travel Deals ✉️</h2>
            <p>Subscribe to our newsletter and be the first to know about special offers</p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-secondary">Subscribe Now</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
