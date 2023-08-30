import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

// is Clicked Initial State
const initialState = {
};

// Context Provider
export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");

  // handle navbutton click
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: !isClicked[clicked] });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode
      }}
    >
      {/* Render children (App) */}
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);