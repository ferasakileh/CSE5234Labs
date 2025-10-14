import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/shippingEntry.css";

const ShippingEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    document.title = "Shipping Information";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const previousState = location.state || {};
    const order = previousState.order || {};

    navigate("/purchase/viewOrder", {
      state: {
        order,
        shippingInfo,
      },
    });
  };

  return (
    <div className="container mt-4 shipping-page">
      <h1 className="text-theme fw-bold mb-4 text-center">Shipping Information</h1>

      <form onSubmit={handleSubmit} className="card shadow-sm border-theme p-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={shippingInfo.name}
            onChange={handleChange}
            required
            placeholder="Enter recipient's name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="form-control"
            value={shippingInfo.addressLine1}
            onChange={handleChange}
            required
            placeholder="Street address, P.O. box"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Address Line 2 (Optional)</label>
          <input
            type="text"
            name="addressLine2"
            className="form-control"
            value={shippingInfo.addressLine2}
            onChange={handleChange}
            placeholder="Apartment, suite, unit, etc."
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={shippingInfo.city}
              onChange={handleChange}
              required
              placeholder="City"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={shippingInfo.state}
              onChange={handleChange}
              required
              placeholder="State"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">ZIP Code</label>
            <input
              type="text"
              name="zip"
              className="form-control"
              value={shippingInfo.zip}
              onChange={handleChange}
              required
              placeholder="ZIP Code"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-theme">
            Continue to Order Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingEntry;
