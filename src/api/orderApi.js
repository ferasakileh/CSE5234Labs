const BASE = process.env.REACT_APP_API_BASE;

export class ApiError extends Error {
  constructor(message, extra = {}) {
    super(message || "Request failed");
    this.name = "ApiError";
    Object.assign(this, extra); // e.g. { status, code, details, raw }
  }
}

export async function placeOrder(order) {
  const res = await fetch(`${BASE}/order-processing/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  

  // Parse once; API returns well-formed JSON
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // standardize error shape for the UI
    throw new ApiError(data?.error || "ORDER_FAILED", {
      status: res.status,
      code: data?.error || "ORDER_FAILED",
      details: data?.details || null,
      raw: data,
    });
  }
  return data; // { confirmation: "ORD-...." }
}
