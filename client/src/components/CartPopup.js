import React from 'react';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartPopup = ({ isOpen, onClose }) => {
  const { state } = useCart();

  return (
    <PopupContainer isOpen={isOpen}>
      <PopupHeader>
        <h2>Shopping Cart</h2>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupHeader>
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
                <RemoveButton onClick={() => {/* Implement remove functionality */}}>Remove</RemoveButton>
              </CartItem>
            ))}
          </ul>
      
        </CartItems>
      )}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 60px; /* Adjust as per your navbar height */
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 14px;
  color: #888;
`;

const CartItems = styled.div`
  margin-top: 10px;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

const CartItemDetails = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  font-size: 14px;
  margin-bottom: 3px;
`;

const CartItemPrice = styled.p`
  font-size: 12px;
  color: #888;
`;

const ProductImage = styled.img`
  max-width: 50px;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 3px 5px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const Total = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  margin-top: 10px;
`;

export default CartPopup;
