import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/products";

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve order + shipping information passed from previous pages
  const { order, shippingInfo } = location.state || {};

  if (!order || !shippingInfo) {
    return <p>Missing order or shipping information.</p>;
  }

  // Calculate total cost
  const totalCost = order.items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const handleConfirm = () => {
    // Proceed to confirmation page with final data
    navigate("/purchase/viewConfirmation", {
      state: { order, shippingInfo, confirmationCode: "CONF123456" },
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Order Summary</h1>

      {/* Order Items Summary */}
      <div className="card p-4 mb-4">
        <h3>Items Ordered</h3>
        <ul className="list-group list-group-flush">
          {order.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <li
                key={item.productId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{product.name}</strong> × {item.quantity}
                </div>
                <div>${(product.price * item.quantity).toFixed(2)}</div>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 border-top pt-2 text-end">
          <h5>Total: ${totalCost.toFixed(2)}</h5>
        </div>
      </div>

      {/* Payment Information */}
      <div className="card p-4 mb-4">
        <h3>Payment Information</h3>
        <p>
          <strong>Card Holder:</strong> {order.card_holder_name}
        </p>
        <p>
          <strong>Card Number:</strong>{" "}
          {order.credit_card_number
            ? "**** **** **** " + order.credit_card_number.slice(-4)
            : "N/A"}
        </p>
        <p>
          <strong>Expiration:</strong> {order.expir_date}
        </p>
      </div>

      {/* Shipping Details */}
      <div className="card p-4 mb-4">
        <h3>Shipping Details</h3>
        <p>
          <strong>Name:</strong> {shippingInfo.name}
        </p>
        <p>
          <strong>Address:</strong> {shippingInfo.addressLine1}
          {shippingInfo.addressLine2 && `, ${shippingInfo.addressLine2}`}
        </p>
        <p>
          <strong>City/State/ZIP:</strong>{" "}
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
      </div>

      {/* Confirmation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleConfirm}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
