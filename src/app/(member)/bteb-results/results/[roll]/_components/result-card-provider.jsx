"use client";

import { createContext, useContext, useRef } from "react";

const resultCardContext = createContext(null);

export default function ResultCardProvider({ children }) {
  const resultCardRef = useRef(null);

  return (
    <resultCardContext.Provider value={{ resultCardRef }}>
      {children}
    </resultCardContext.Provider>
  );
}

export const useResultCard = () => {
  return useContext(resultCardContext);
};
