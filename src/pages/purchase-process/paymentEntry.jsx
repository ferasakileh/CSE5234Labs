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
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.order) {
      navigate('/purchase');
      return;
    }
    fetchInventory()
      .then(items => setInventory(items))
      .catch(err => console.error("Failed to load inventory:", err));
  }, [location.state, navigate]);

  const [paymentInfo, setPaymentInfo] = useState({
    card_num: '',
    exp_date: '',
    cvv: '',
    holder_name: ''
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
      case 'card_num':
        formattedValue = formatCardNumber(value);
        break;
      case 'exp_date':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvv':
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);
    setPaymentError(null);

    try {
      // Extract last 4 digits for confirmation display
      const cardNumClean = paymentInfo.card_num.replace(/\s/g, '');
      const last4 = cardNumClean.slice(-4);

      // Pass payment data to next step
      const updatedOrder = {
        ...location.state.order,
        payment: {
          holder_name: paymentInfo.holder_name,
          card_num: cardNumClean, // Remove spaces
          exp_date: paymentInfo.exp_date,
          cvv: paymentInfo.cvv
        },
        last4: last4 // Store last 4 digits for display
      };

      setProcessingPayment(false);
      navigate('/purchase/shippingEntry', { state: { order: updatedOrder } });
    } catch (error) {
      setPaymentError(error.message || 'Payment processing failed. Please try again.');
      setProcessingPayment(false);
    }
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

      {/* Security Notice */}
      <div className="alert alert-info mb-4">
        <strong>Secure Payment:</strong> Your payment information is encrypted and processed securely. Card details are never stored on our servers.
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="card shadow-sm border-theme p-4">
        <h3 className="text-theme mb-3">Payment Details</h3>

        {paymentError && <div className="alert alert-danger">{paymentError}</div>}

        <div className="mb-3">
          <label htmlFor="holder_name" className="form-label">Card Holder Name:</label>
          <input
            type="text"
            id="holder_name"
            name="holder_name"
            className="form-control"
            value={paymentInfo.holder_name}
            onChange={handleInputChange}
            required
            placeholder="Enter cardholder name"
            disabled={processingPayment}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="card_num" className="form-label">Credit Card Number:</label>
          <input
            type="text"
            id="card_num"
            name="card_num"
            className="form-control"
            value={paymentInfo.card_num}
            onChange={handleInputChange}
            required
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            disabled={processingPayment}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="exp_date" className="form-label">Expiration Date:</label>
            <input
              type="text"
              id="exp_date"
              name="exp_date"
              className="form-control"
              value={paymentInfo.exp_date}
              onChange={handleInputChange}
              required
              placeholder="MM/YY"
              maxLength="5"
              disabled={processingPayment}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cvv" className="form-label">CVV Code:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className="form-control"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              required
              placeholder="123"
              maxLength="4"
              disabled={processingPayment}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
            disabled={processingPayment}
          >
            Back
          </button>
          <button type="submit" className="btn btn-theme" disabled={processingPayment}>
            {processingPayment ? "Processing..." : "Continue to Shipping"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentEntry;
