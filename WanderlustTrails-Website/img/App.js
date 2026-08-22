import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Destinations from './pages/Destinations';
import './index.css';

const PlaceholderPage = ({ title }) => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
    <h2 style={{ fontFamily: 'Montserrat', color: '#03045E', fontSize: '2rem' }}>🚧 {title}</h2>
    <p style={{ color: '#6c757d' }}>Coming in Day 3!</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/booking" element={<PlaceholderPage title="Multi-Step Booking Page" />} />
        <Route path="/login" element={<PlaceholderPage title="Login & Dashboard" />} />
        <Route path="/reviews" element={<PlaceholderPage title="Reviews Page" />} />
        <Route path="/about" element={<PlaceholderPage title="About Us Page" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Page" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
