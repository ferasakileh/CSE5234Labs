import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve both payment and shipping info from prior pages
  const { shippingInfo, order } = location.state || {};

  if (!order || !shippingInfo) {
    return <p>Missing order or shipping information.</p>;
  }

  // Compute a simple total price
  // const prices = [10, 20, 30, 40]; // hypothetical product prices
  // const total = order.buyQuantity.reduce(
  //   (sum, qty, i) => sum + qty * prices[i],
  //   0
  // );

  const handleConfirm = () => {
    navigate("/purchase/viewConfirmation", {
      state: { order, shippingInfo, confirmationCode: "CONF123456" },
    });
  };

  return (
    <div>
      <h1>Order Summary</h1>

      <h3>Products Quantity</h3>
      {order.buyQuantity.map((qty, i) =>
        qty > 0 ? (
          <p key={i}>
            {/* Product {i + 1}: {qty} × ${prices[i]} = ${qty * prices[i]} */}
            Product {i + 1} : {qty}
          </p>
        ) : null
      )}

      <h3>Payment Information</h3>
      <p>Card Holder: {order.card_holder_name}</p>
      <p>Card Number: {order.credit_card_number}</p>
      <p>Expiration: {order.expir_date}</p>
      <p>CVV: {order.cvvCode}</p>

      <h3>Shipping Details</h3>
      <p>{shippingInfo.name}</p>
      <p>{shippingInfo.addressLine1}</p>
      {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
      <p>
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
      </p>

      {/* <h3>Total: ${total}</h3> */}

      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default ViewOrder;
