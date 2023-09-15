import React, { createContext, useContext, useState, useEffect } from "react";

const initialState = {
  cart: []
};

export const ContextProvider = createContext();

export const StateProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(initialState);

  const addToCart = (item) => {
    if(cartItems.cart.length < 2) {
      const updatedCart = [...cartItems.cart, item];

      setCartItems({ ...cartItems, cart: updatedCart });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      alert('Can not add more than Item')
    }
  };

  const removeFromCart = (itemId) => {
    const index = cartItems.cart.findIndex(
      (cartItem) => cartItem.id == itemId
    );

    let newCart = [...cartItems.cart];
    console.log(newCart)

    if (index >= 0) {
      newCart.splice(index, 1)
    } else {
      console.warn(
        `Can't remove car (id: ${itemId}) as it's not in cart list!`
      )
    }

    setCartItems({ ...cartItems, cart: newCart });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart
  };

  console.log(cartItems)

  return (
    <ContextProvider.Provider value={contextValue}>
      {children}
    </ContextProvider.Provider>
  )
};
export const useStateValue = () => useContext(ContextProvider);