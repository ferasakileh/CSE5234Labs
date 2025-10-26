const ORDER_URL = process.env.REACT_APP_ORDER_API_BASE;

export class ApiError extends Error {
  constructor(message, extra = {}) {
    super(message || "Request failed");
    Object.assign(this, extra);
  }
}

export async function placeOrder(order) {
  const res = await fetch(ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || "ORDER_FAILED", {
      status: res.status,
      code: data.error || "ORDER_FAILED",
      details: data.details || null,
      raw: data,
    });
  }

  return data; // { confirmation: "ORD-XXXX" }
}
