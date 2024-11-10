import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  
  const removeFromCart = (productId) => 
    setCart(cart.filter(item => item.id !== productId));

/* Se agrega el updateQuantity para que el carrito sume o reste */

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item => 
      item.id === productId ? { ...item, cantidad: quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      clearCart,
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

/* 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  
  const removeFromCart = (productId) => 
    setCart(cart.filter(item => item.id !== productId));
  

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      clearCart  
    }}>
      {children}
    </CartContext.Provider>
  );
}; */