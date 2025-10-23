// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const API_BASE = process.env.REACT_APP_API_BASE; // set in .env

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
    return saved ? JSON.parse(saved) : []; // [{ productId, quantity, ... }]
  });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Place the order against the backend.
   * @param {Object} params
   * @param {{name:string, address:string}} params.shipping  // minimal object the API expects
   * @param {{method:string, last4:string}} params.payment   // minimal object the API expects
   * @returns {Promise<{confirmation:string}>}
   */
  async function placeOrder({ shipping, payment }) {
    if (!API_BASE) throw new Error("Missing REACT_APP_API_BASE");

    // The backend expects: items: [{ id: "...", qty: number }]
    const items = cart.map((line) => ({
      id: line.productId,        // IMPORTANT: must match inventory id (see note below)
      qty: Number(line.quantity) // ensure number
    }));

    const payload = { items, shipping, payment };

    const res = await fetch(`${API_BASE}/order-processing/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Normalize error for callers
      throw new ApiError(data?.error || "ORDER_FAILED", {
      status: res.status,
      code: data?.error || "ORDER_FAILED",
      details: data?.details || null,
      raw: data,
    });
    }
    return data; // { confirmation: "ORD-..." }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, showCart, setShowCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
