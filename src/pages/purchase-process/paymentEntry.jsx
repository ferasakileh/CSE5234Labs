// src/pages/purchase-process/paymentEntry.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchInventory } from "../../api/inventoryApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/paymentEntry.css';

const PaymentEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!location.state || !location.state.order) {
      navigate('/purchase');
      return;
    }
    fetchInventory()
      .then(items => setInventory(items))
      .catch(err => console.error("Failed to load inventory:", err));
  }, [location.state, navigate]);

  // keep the same field names for the form to preserve behavior,
  // but we will map cvvCode -> cvv on submit.
  const [paymentInfo, setPaymentInfo] = useState({
    credit_card_number: '',
    expir_date: '',
    cvvCode: '',
    card_holder_name: ''
  });

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v;
  };

  const formatCVV = (value) => {
    return value.replace(/[^0-9]/g, '').slice(0, 4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'credit_card_number':
        formattedValue = formatCardNumber(value);
        break;
      case 'expir_date':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvvCode':
        formattedValue = formatCVV(value);
        break;
      default:
        formattedValue = value;
    }

    setPaymentInfo(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map the one field name we changed downstream: cvvCode -> cvv
    const normalizedPayment = {
      ...paymentInfo,
      cvv: paymentInfo.cvvCode
    };

    // Keep the rest of the order state and attach normalized payment fields
    const updatedOrder = {
      ...location.state.order,
      card_holder_name: normalizedPayment.card_holder_name,
      credit_card_number: normalizedPayment.credit_card_number,
      expir_date: normalizedPayment.expir_date,
      cvv: normalizedPayment.cvv
    };

    // Do NOT clear cart here; the flow clears after successful submission.
    navigate('/purchase/shippingEntry', { state: { order: updatedOrder } });
  };

  const total = (location.state?.order?.items || []).reduce((sum, item) => {
    const product = inventory.find(p => p.id === item.productId);
    return sum + (item.quantity * (product?.price || 0));
  }, 0);

  return (
    <div className="container mt-4 payment-page">
      <h1 className="text-theme fw-bold mb-4 text-center">Payment Information</h1>

      {/* Order Summary */}
      <div className="card shadow-sm border-theme mb-4 p-4">
        <h3 className="text-theme mb-3">Order Summary</h3>
        {location.state?.order?.items.map(item => {
          const product = inventory.find(p => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">{product.name}</span>
              <span className="text-secondary">
                {item.quantity} × ${product.price} = <strong>${(item.quantity * product.price).toFixed(2)}</strong>
              </span>
            </div>
          );
        })}
        <div className="mt-3 border-top pt-2 text-end">
          <strong className="fs-5">Total: ${total.toFixed(2)}</strong>
        </div>
      </div>

      {/* Payment Form (same look & classes) */}
      <form onSubmit={handleSubmit} className="card shadow-sm border-theme p-4">
        <h3 className="text-theme mb-3">Payment Details</h3>

        <div className="mb-3">
          <label htmlFor="card_holder_name" className="form-label">Card Holder Name:</label>
          <input
            type="text"
            id="card_holder_name"
            name="card_holder_name"
            className="form-control"
            value={paymentInfo.card_holder_name}
            onChange={handleInputChange}
            required
            placeholder="Enter cardholder name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="credit_card_number" className="form-label">Credit Card Number:</label>
          <input
            type="text"
            id="credit_card_number"
            name="credit_card_number"
            className="form-control"
            value={paymentInfo.credit_card_number}
            onChange={handleInputChange}
            required
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expir_date" className="form-label">Expiration Date:</label>
            <input
              type="text"
              id="expir_date"
              name="expir_date"
              className="form-control"
              value={paymentInfo.expir_date}
              onChange={handleInputChange}
              required
              placeholder="MM/YY"
              maxLength="5"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cvvCode" className="form-label">CVV Code:</label>
            <input
              type="text"
              id="cvvCode"
              name="cvvCode"
              className="form-control"
              value={paymentInfo.cvvCode}
              onChange={handleInputChange}
              required
              placeholder="123"
              maxLength="4"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-theme">
            Continue to Shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentEntry;
