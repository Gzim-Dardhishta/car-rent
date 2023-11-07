import React, { createContext, useContext, useState, useEffect } from "react";

const initialState = {
  cart: []
};

export const ContextProvider = createContext();

export const StateProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(initialState);

  const addToCart = (item) => {
    if (cartItems.cart.length < 2) {
      const updatedCart = [...cartItems.cart, item];

      setCartItems({ ...cartItems, cart: updatedCart });
      localStorage.setItem('cartItems', JSON.stringify(cartItems.cart));
    } else {
      alert('Can not add more than Item')
    }
  };

  const removeFromCart = (id) => {

    const cartItem = JSON.parse(localStorage.getItem('cartItems'));
    cartItem.shift()
    console.log(cartItem)
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart
  };


  return (
    <ContextProvider.Provider value={contextValue}>
      {children}
    </ContextProvider.Provider>
  )
};
export const useStateValue = () => useContext(ContextProvider);