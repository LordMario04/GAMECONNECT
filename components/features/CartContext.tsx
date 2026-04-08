"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCartSheet } from "./CartSheetContext";

type Product = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image_url?: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Omit<Product, "qty">) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const { openCart } = useCartSheet();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<Product, "qty">) => {
    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      toast.success(`${product.name} actualizado en el carrito 🛒`, {
        action: {
          label: "Ver carrito",
          onClick: () => openCart(),
        },
      });
    } else {
      toast.success(`${product.name} agregado al carrito 🛒`, {
        action: {
          label: "Ver carrito",
          onClick: () => openCart(),
        },
      });
    }

    setCart((prev) => {
      const ex = prev.find((p) => p.id === product.id);
      if (ex) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id: string) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const decreaseQty = (id: string) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
      )
    );

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
    toast.error("Producto eliminado del carrito");
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};