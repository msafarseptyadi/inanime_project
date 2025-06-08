"use client";
import React, { createContext, useState } from "react";

export const ValueContext = createContext();

export const ValueProvider = ({ children }) => {
  const [sharedValue, setSharedValue] = useState(null);

  return (
    <ValueContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </ValueContext.Provider>
  );
};
