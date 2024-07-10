import React from 'react';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const removeFromCartHandler = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemId,
    });
  };

  const calculateTotalPrice = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {state.cartItems.length === 0 ? (
        <EmptyCart>Your cart is empty</EmptyCart>
      ) : (
        <CartItems>
          <ul>
            {state.cartItems.map((item) => (
              <CartItem key={item.id}>
                <CartItemDetails>
                  <CartItemName>{item.name}</CartItemName>
                  <CartItemPrice>${item.price} x {item.qty}</CartItemPrice>
                  <ProductImage src={item.image} alt={item.name} />
                </CartItemDetails>
                <RemoveButton onClick={() => removeFromCartHandler(item.id)}>Remove</RemoveButton>
              </CartItem>
            ))}
          </ul>
          <Total>Total: ${calculateTotalPrice()}</Total>
        </CartItems>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 18px;
`;

const CartItems = styled.div`
  margin-top: 20px;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const CartItemDetails = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CartItemPrice = styled.p`
  font-size: 16px;
  color: #888;
`;

const ProductImage = styled.img`
  max-width: 100px;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Total = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
`;

export default CartPage;
