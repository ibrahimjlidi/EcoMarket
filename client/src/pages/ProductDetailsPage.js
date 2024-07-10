import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

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
    <Container>
      <ProductImage src={product.image} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
        <AddToCartButton onClick={addToCartHandler}>Add to Cart</AddToCartButton>
      </ProductInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

const ProductImage = styled.img`
  max-width: 300px;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  margin-top: 20px;
`;

const ProductName = styled.h1`
  font-size: 24px;
`;

const ProductDescription = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ProductDetailsPage;
