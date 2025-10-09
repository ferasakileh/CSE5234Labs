import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from '../data/products';

const ViewConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { confirmationCode, order, shippingInfo } = location.state || {};

  if (!order || !shippingInfo) {
    navigate("/purchase");
    return null;
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1 className="display-4">Thank You for Your Order!</h1>
        <p className="lead">Your order has been successfully completed.</p>
        <div className="alert alert-success w-75 mx-auto">
          <strong>Confirmation Number:</strong> {confirmationCode}
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Order Summary</h3>
            </div>
            <div className="card-body">
              <h4 className="mb-3">Products Ordered:</h4>
              <div className="list-group">
                {order.items.map((item) => {
                  const product = products.find(p => p.id === item.productId);
                  return item.quantity > 0 ? (
                    <div key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{product.name}</span>
                      <span className="badge bg-primary rounded-pill">Quantity: {item.quantity}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">Shipping Information</h4>
            </div>
            <div className="card-body">
              <p className="fw-bold mb-2">{shippingInfo.name}</p>
              <p className="mb-1">{shippingInfo.addressLine1}</p>
              {shippingInfo.addressLine2 && <p className="mb-1">{shippingInfo.addressLine2}</p>}
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">Payment Method</h4>
            </div>
            <div className="card-body">
              <p className="mb-0">Card ending in: {order.credit_card_number.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button 
          onClick={() => navigate("/purchase")} 
          className="btn btn-primary btn-lg"
        >
          Return to Purchase Page
        </button>
      </div>
    </div>
  );
};

export default ViewConfirmation;