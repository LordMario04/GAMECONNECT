"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../../components/ui/sheet";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "../../components/features/CartContext";
import { useCartSheet } from "../../components/features/CartSheetContext";

export function CartSheet() {
  const { cart, total, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const { isOpen, openCart, closeCart } = useCartSheet();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <button className="relative" onClick={openCart}>
        <FaShoppingCart className="text-white text-2xl hover:text-[#00ffff] transition-colors duration-200 drop-shadow-[0_0_6px_#00ffff80]" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-[3px] shadow-[0_0_6px_#ff00b880]">
            {cart.reduce((t, item) => t + item.qty, 0)}
          </span>
        )}
      </button>

      <SheetContent
        side="right"
        className="flex flex-col bg-[#0a0a0a] border-l border-[#00ffff30] text-white shadow-[-5px_0_30px_#00ffff15]"
      >
        <SheetHeader>
          <SheetTitle className="text-[#00ffff] uppercase tracking-widest text-lg drop-shadow-[0_0_8px_#00ffff60]">
            🛒 Tu Carrito
          </SheetTitle>
          <SheetDescription className="text-gray-400 text-sm">
            Revisa tus productos antes de pagar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <span className="text-4xl mb-2">🛍️</span>
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-[#00ffff20] pb-3"
              >
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-[#00ffff80]">
                    ${item.price} x {item.qty} ={" "}
                    <span className="text-[#00ffff] font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-7 h-7 rounded-md border border-[#00ffff40] text-[#00ffff] hover:bg-[#00ffff20] transition-all text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="text-white font-semibold w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-7 h-7 rounded-md border border-[#00ffff40] text-[#00ffff] hover:bg-[#00ffff20] transition-all text-sm font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 rounded-md border border-[#ff005540] text-[#ff0055] hover:bg-[#ff005520] transition-all text-sm"
                  >
                    <FaTrash className="mx-auto text-xs" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="flex flex-col gap-3 border-t border-[#00ffff20] pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-gray-300">Total</span>
            <span className="text-[#00ffff] drop-shadow-[0_0_6px_#00ffff60]">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full py-2 rounded-md font-bold uppercase tracking-wide text-black transition-all disabled:opacity-40"
            style={{
              background: "linear-gradient(90deg, #00ffff 0%, #7dffb2 100%)",
              boxShadow: cart.length > 0 ? "0 0 10px #00ffff60" : "none",
            }}
          >
            Finalizar compra
          </button>

          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="w-full py-2 rounded-md font-bold uppercase tracking-wide text-white border border-[#ff005560] hover:bg-[#ff005520] transition-all disabled:opacity-40"
          >
            Vaciar carrito
          </button>

          <SheetClose asChild>
            <button
              onClick={closeCart}
              className="w-full py-2 rounded-md font-medium uppercase tracking-wide text-gray-400 border border-[#ffffff20] hover:border-[#00ffff40] hover:text-[#00ffff] transition-all"
            >
              Seguir comprando
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}