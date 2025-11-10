// src/context/CartContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { placeOrder as placeOrderApi } from "../api/orderApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Safe localStorage parse
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const clearCart = useCallback(() => setCart([]), []);

  // IMPORTANT: just forward to the API helper (it normalizes & validates)
  const placeOrder = useCallback(async (payload) => {
    // Expecting shapes like:
    // {
    //   items: [{ id/productId, name?, qty/quantity }],
    //   customer_name?, customer_email?,
    //   shipping_info_id?/payment_info_id?,  OR
    //   shipping: { address1, address2, city, state, country, postal_code, email },
    //   payment:  { holder_name, card_num, exp_date, cvv }
    // }
    return placeOrderApi(payload);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, setCart, clearCart, showCart, setShowCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
