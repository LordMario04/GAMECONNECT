"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider } from "@/components/features/CartContext";
import { CartSheetProvider } from "@/components/features/CartSheetContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartSheetProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CartSheetProvider>
    </NextThemesProvider>
  );
}