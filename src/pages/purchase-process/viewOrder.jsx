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

  const { order, shippingInfo, last4 } = location.state || {};
  if (!order || !shippingInfo) {
    return <p className="text-center mt-4 text-danger">Missing order or shipping information.</p>;
  }

  const totalCost = order.items.reduce((total, item) => {
    const product = inventory.find(p => p.id === item.productId);
    return total + ((product?.price || 0) * item.quantity);
  }, 0);

  async function handleConfirm() {
    setSubmitting(true);
    setErr(null);

    // Build items the Lambda expects
    const items = (order.items || []).map((it) => {
      const prod = inventory.find((p) => p.id === it.productId);
      return {
        id: it.productId,
        name: prod?.name || "",
        qty: Number(it.quantity || 1),
      };
    });

    // Shipping object (normalized to API schema)
    const shipping = {
      address1: shippingInfo.addressLine1 || "",
      address2: shippingInfo.addressLine2 || "",
      city: shippingInfo.city || "",
      state: shippingInfo.state || "",
      country: "US",
      postal_code: shippingInfo.zip || "",
      email: shippingInfo.email || order.customerEmail || "guest@example.com",
    };

    // Payment object - send payment details to Lambda
    const payment = order.payment || {}; // payment object with holder_name, card_num, exp_date, cvv

    try {
      const result = await placeOrder({
        items,
        shipping,
        payment,
        customer_name: shippingInfo.name || "Guest",
        customer_email: shippingInfo.email || "guest@example.com",
      });

      setCart([]); // clear cart
      navigate("/purchase/viewConfirmation", {
        state: {
          order,
          shippingInfo,
          confirmationCode: result.confirmation,
          last4: result.last4, // Card last 4 digits from Lambda response
        },
      });
    } catch (e) {
      if (e.code === "INSUFFICIENT_QTY" && Array.isArray(e.details)) {
        const msg = e.details
          .map((d) => {
            const match = inventory.find((p) => p.id === d.id);
            const name = match ? match.name : d.id;
            return `${name} requested ${d.requested}, available ${d.available}`;
          })
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

      {/* Shipping Info */}
      <div className="card shadow-sm border-theme p-4 mb-4">
        <h3 className="text-theme mb-3">Shipping Details</h3>
        <p><strong>Name:</strong> {shippingInfo.name}</p>
        <p><strong>Address:</strong> {shippingInfo.addressLine1}{shippingInfo.addressLine2 && `, ${shippingInfo.addressLine2}`}</p>
        <p><strong>City/State/ZIP:</strong> {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
      </div>

      {/* Payment Info - No card details shown */}
      <div className="card shadow-sm border-theme p-4 mb-4">
        <h3 className="text-theme mb-3">Payment Method</h3>
        {last4 && (
          <p className="fw-bold mb-2">
            Card ending in <span className="text-theme">••••{last4}</span>
          </p>
        )}
        <p className="mb-0 text-muted small">
          No card details are stored on our servers. Your payment will be processed securely.
        </p>
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
