// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const API_BASE = process.env.REACT_APP_API_BASE; // example: https://xxxx.execute-api.amazonaws.com/prod

class ApiError extends Error {
  constructor(message, extra = {}) {
    super(message || "Request failed");
    this.name = "ApiError";
    Object.assign(this, extra);
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Sends final order to backend
   * params: { items, shipping, payment }
   */
  async function placeOrder({ items, shipping, payment }) {
    if (!API_BASE)
      throw new Error("Missing REACT_APP_API_BASE — set it in .env");

    // Convert cart line items → API required format
    const formattedItems = items.map((line) => ({
      id: line.productId,
      qty: Number(line.quantity),
    }));

    const payload = { items: formattedItems, shipping, payment };

    const res = await fetch(`${API_BASE}/order-processing/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new ApiError(data?.error || "ORDER_FAILED", {
        status: res.status,
        code: data?.error || "ORDER_FAILED",
        details: data?.details || null,
        raw: data,
      });
    }

    return data; // { confirmation: "ORD-XXXXXX" }
  }

  return (
    <CartContext.Provider
      value={{ cart, setCart, showCart, setShowCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};