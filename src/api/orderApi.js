// src/api/orderApi.js
const ORDER_URL = process.env.REACT_APP_ORDER_API_BASE;

export class ApiError extends Error {
  constructor(message, extra = {}) {
    super(message || "Request failed");
    Object.assign(this, extra);
  }
}

function normalizeOrder(input = {}) {
  // Accept many caller shapes and convert to Lambda's required payload
  const itemsSrc = input.items || input.cart || [];

  const items = itemsSrc.map((line) => ({
    id: line.id || line.productId,                 // required
    name: line.name || "",                         // optional, nice to send
    qty: Number(line.qty ?? line.quantity ?? 1),   // required
  })).filter(it => it.id && it.qty > 0);

  return {
    customer_name:
      input.customer_name ||
      input.customerName ||
      input?.shippingInfo?.name ||
      "Guest",
    customer_email:
      input.customer_email ||
      input.customerEmail ||
      input?.shippingInfo?.email ||
      "guest@example.com",
    shipping_info_id:
      input.shipping_info_id ??
      input.shippingInfoId ??
      1, // default OK for the lab
    payment_info_id:
      input.payment_info_id ??
      input.paymentInfoId ??
      1, // default OK for the lab
    items,
  };
}

export async function placeOrder(orderLike) {
  const payload = normalizeOrder(orderLike);

  // quick client-side guardrails (clear error messages)
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
      sent: payload,         // helpful in your console if it ever fails again
    });
  }

  return data; // { confirmation, order_id }
}
