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

  // Sends final order to backend in the shape the Lambda expects
async function placeOrder({ items, shipping, payment }) {
  const ORDER_URL =
    process.env.REACT_APP_ORDER_API_BASE ||
    `${API_BASE}/order-processing/order`;

  if (!ORDER_URL) {
    throw new Error("Missing REACT_APP_ORDER_API_BASE / REACT_APP_API_BASE");
  }

  // Convert cart -> Lambda items
  const formattedItems = (items || [])
    .map((line) => ({
      id: line.id || line.productId,                    // required
      name: line.name || "",                            // optional
      qty: Number(line.qty ?? line.quantity ?? 1),      // required
    }))
    .filter((it) => it.id && it.qty > 0);

  // Build Lambda payload
  const payload = {
    customer_name: shipping?.name || "Guest",
    customer_email: shipping?.email || "guest@example.com",
    shipping_info_id: 1,  // OK for the lab; swap to real IDs later
    payment_info_id: 1,   // OK for the lab
    items: formattedItems,
  };

  const res = await fetch(ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data?.error || "ORDER_FAILED", {
      status: res.status,
      code: data?.error || "ORDER_FAILED",
      details: data?.details || data?.message || null,
      raw: data,
      sent: payload,
    });
  }

  return data; // { confirmation, order_id }
}


  return (
    <CartContext.Provider
      value={{ cart, setCart, showCart, setShowCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};