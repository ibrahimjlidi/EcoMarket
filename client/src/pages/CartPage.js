import React from 'react';

const CartPage = () => {
  // Placeholder for cart items logic
  const cartItems = [];

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product}>
              {item.name} - ${item.price} x {item.qty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
