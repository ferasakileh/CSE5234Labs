// src/api/inventoryApi.js
const BASE = process.env.REACT_APP_INVENTORY_API_BASE;

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// Fetch all inventory items
export async function fetchInventory() {
  const res = await fetch(BASE, { method: "GET" });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("Failed to load inventory", res.status, data);

  return data;
}

// Optional: fetch by name
export async function searchInventoryByName(name) {
  const res = await fetch(`${BASE}/items?name=${encodeURIComponent(name)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("Search failed", res.status, data);
  return data;
}

// Optional: fetch single item
export async function fetchItemById(id) {
  const res = await fetch(`${BASE}/items/${id}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("Item not found", res.status, data);
  return data;
}
