import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { state } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {state.cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.qty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
