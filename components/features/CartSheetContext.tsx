"use client";

import React, { createContext, useContext, useState } from "react";

type CartSheetContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartSheetContext = createContext<CartSheetContextType | undefined>(undefined);

export const CartSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartSheetContext.Provider value={{
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartSheetContext.Provider>
  );
};

export const useCartSheet = () => {
  const context = useContext(CartSheetContext);
  if (!context) throw new Error("useCartSheet debe usarse dentro de CartSheetProvider");
  return context;
};