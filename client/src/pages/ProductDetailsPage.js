import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, qty: 1 },
    });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailsPage;
