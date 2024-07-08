import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Import the CSS file

// Placeholder image URL
const placeholderImage = 'https://via.placeholder.com/400x500?text=Product+Image+Not+Available';

const ProductCard = ({ product }) => {
  const onError = (e) => {
    e.target.src = placeholderImage; // Set placeholder image on error
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={onError}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="product-details-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
