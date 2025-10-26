import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { fetchInventory } from "../../api/inventoryApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/viewOrder.css";

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart, placeOrder } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  // Inventory state
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!location.state || !location.state.order || !location.state.shippingInfo) {
      navigate('/purchase');
      return;
    }

    // Fetch inventory
    fetchInventory()
      .then(items => setInventory(items))
      .catch(err => console.error("Failed to load inventory:", err));
  }, [location.state, navigate]);

  const { order, shippingInfo } = location.state || {};
  if (!order || !shippingInfo) {
    return <p className="text-center mt-4 text-danger">Missing order or shipping information.</p>;
  }

  // Replace products.find()
  const totalCost = order.items.reduce((total, item) => {
    const product = inventory.find(p => p.id === item.productId);
    return total + ((product?.price || 0) * item.quantity);
  }, 0);

  async function handleConfirm() {
    setSubmitting(true);
    setErr(null);

    // Build minimal expected shapes
    const shipping = {
      name: shippingInfo.name,
      address: [
        shippingInfo.addressLine1,
        shippingInfo.addressLine2,
        `${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`
      ]
        .filter(Boolean)
        .join(", "),
    };

    const payment = {
      method: "card",
      last4: (order.credit_card_number || "").slice(-4) || "0000",
    };

    try {
      const result = await placeOrder({ items: order.items, shipping, payment });
      setCart([]); // Clear local cart
      navigate("/purchase/viewConfirmation", {
        state: {
          order,
          shippingInfo,
          confirmationCode: result.confirmation,
        },
      });

    } catch (e) {
      if (e.code === "INSUFFICIENT_QTY" && Array.isArray(e.details)) {
        const msg = e.details
          .map((d) => `${d.id} requested ${d.requested}, available ${d.available}`)
          .join("; ");
        setErr(`Out of stock: ${msg}. Please update your quantities and try again.`);
      } else {
        setErr("Order failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mt-4 vieworder-page">
      <h1 className="text-theme fw-bold mb-4 text-center">Order Summary</h1>

      {err && <div className="alert alert-danger">{err}</div>}

      {/* Items Ordered */}
      <div className="card shadow-sm border-theme p-4 mb-4">
        <h3 className="text-theme mb-3">Items Ordered</h3>
        <ul className="list-group list-group-flush">
          {order.items.map((item) => {
            const product = inventory.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                <div><strong>{product.name}</strong> × {item.quantity}</div>
                <div className="text-theme fw-semibold">
                  ${(product.price * item.quantity).toFixed(2)}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 border-top pt-2 text-end">
          <h5 className="fw-bold">
            Total: <span className="text-theme">${totalCost.toFixed(2)}</span>
          </h5>
        </div>
      </div>

      {/* Payment Info */}
      <div className="card shadow-sm border-theme p-4 mb-4">
        <h3 className="text-theme mb-3">Payment Information</h3>
        <p><strong>Card Holder:</strong> {order.card_holder_name}</p>
        <p><strong>Card Number:</strong> **** **** **** {order.credit_card_number?.slice(-4)}</p>
        <p><strong>Expiration:</strong> {order.expir_date}</p>
      </div>

      {/* Shipping Info */}
      <div className="card shadow-sm border-theme p-4 mb-4">
        <h3 className="text-theme mb-3">Shipping Details</h3>
        <p><strong>Name:</strong> {shippingInfo.name}</p>
        <p><strong>Address:</strong> {shippingInfo.addressLine1}{shippingInfo.addressLine2 && `, ${shippingInfo.addressLine2}`}</p>
        <p><strong>City/State/ZIP:</strong> {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-theme" onClick={handleConfirm} disabled={submitting}>
          {submitting ? "Submitting…" : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
