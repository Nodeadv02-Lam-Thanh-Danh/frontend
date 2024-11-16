'use client';
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Config } from "../types/my";

interface HeaderContextType {
  headerData: Config | null;
  setHeaderData: React.Dispatch<React.SetStateAction<Config | null>>;
}

interface HeaderProviderProps {
  children: ReactNode;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerData, setHeaderData] = useState<Config | null>(null);

  return (
    <HeaderContext.Provider value={{ headerData, setHeaderData }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderData = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderData must be used within a HeaderProvider");
  }
  return context;
};
