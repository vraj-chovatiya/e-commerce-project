// Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../assets/image1.png';
import Image2 from '../assets/image2.png';
import Image3 from '../assets/image3.png';
import HeroImage from '../assets/hero_image.avif';
import '../styles/hero.css';

const Hero = () => {
  const featuredProducts = [
    {
      title: "New Arrivals",
      image: Image1,
      link: "/collection/",
      price: "From ₹2999"
    },
    {
      title: "Best Sellers",
      image: Image2,
      link: "/collection/",
      price: "From ₹1999"
    },
    {
      title: "Summer Collection",
      image: Image3,
      link: "/collection/",
      price: "From ₹2499"
    }
  ];

  return (
    <div className="simple-homepage">
      {/* Simple Header */}
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Style</h1>
          <p>Curated collections for the modern individual</p>
          <Link to="/collection" className="hero-button">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Featured Collection" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <Link to={product.link} key={index} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>Subscribe to get special offers and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;