import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className="container mt-4">
      <h1 className="mb-4">Shipping Information</h1>

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
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
          <label className="form-label">Address Line 1</label>
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
          <label className="form-label">Address Line 2 (Optional)</label>
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
            <label className="form-label">City</label>
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
            <label className="form-label">State</label>
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
            <label className="form-label">ZIP Code</label>
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

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Continue to Order Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingEntry;
