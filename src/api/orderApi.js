// src/api/orderApi.js
const ORDER_URL = process.env.REACT_APP_ORDER_API_BASE;

export class ApiError extends Error {
  constructor(message, extra = {}) {
    super(message || "Request failed");
    Object.assign(this, extra);
  }
}

function normalizeOrder(input = {}) {
  const itemsSrc = input.items || input.cart || [];
  const items = itemsSrc
    .map((line) => ({
      id: line.id || line.productId,
      name: line.name || "",
      qty: Number(line.qty ?? line.quantity ?? 1),
    }))
    .filter((it) => it.id && it.qty > 0);

  const payload = {
    items,
    customer_name:
      input.customer_name ||
      input.customerName ||
      input?.shippingInfo?.name ||
      input?.shipping?.name ||
      "Guest",
    customer_email:
      input.customer_email ||
      input.customerEmail ||
      input?.shippingInfo?.email ||
      input?.shipping?.email ||
      "guest@example.com",
  };

  // If caller already has saved IDs, include them; otherwise let Lambda insert rows.
  const sid = input.shipping_info_id ?? input.shippingInfoId;
  if (sid != null) payload.shipping_info_id = sid;

  const pid = input.payment_info_id ?? input.paymentInfoId;
  if (pid != null) payload.payment_info_id = pid;

  // Pass through full shipping object if provided
  if (input.shipping) {
    const s = input.shipping;
    payload.shipping = {
      address1: s.address1 || s.addressLine1 || "",
      address2: s.address2 || s.addressLine2 || "",
      city: s.city || "",
      state: s.state || "",
      country: s.country || "US",
      postal_code: s.postal_code || s.zip || "",
      email: s.email || payload.customer_email,
    };
  }

  // Pass through payment object (holder_name, card_num, exp_date, cvv)
  if (input.payment) {
    const p = input.payment;
    payload.payment = {
      holder_name: p.holder_name || "",
      card_num: p.card_num || "",
      exp_date: p.exp_date || "",
      cvv: p.cvv || "",
    };
  }

  return payload;
}

export async function placeOrder(orderLike) {
  const payload = normalizeOrder(orderLike);

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new ApiError("ORDER_FAILED", { details: "Cart is empty." });
  }
  if (!payload.customer_name) {
    throw new ApiError("ORDER_FAILED", { details: "Missing customer name." });
  }
  if (!payload.customer_email) {
    throw new ApiError("ORDER_FAILED", { details: "Missing customer email." });
  }

  const res = await fetch(ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || "ORDER_FAILED", {
      status: res.status,
      code: data.error || "ORDER_FAILED",
      details: data.details || data.message || null,
      raw: data,
      sent: payload,
    });
  }

  return data; // { confirmation, order_id }
}
