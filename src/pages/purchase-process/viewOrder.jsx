import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/viewOrder.css"; // theme styles

const ViewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { order, shippingInfo } = location.state || {};

    if (!order || !shippingInfo) {
        return <p className="text-center mt-4 text-danger">Missing order or shipping information.</p>;
    }

    const totalCost = order.items.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId);
        return total + (product?.price || 0) * item.quantity;
    }, 0);

    const handleConfirm = () => {
        navigate("/purchase/viewConfirmation", {
            state: { order, shippingInfo, confirmationCode: "CONF123456" },
        });
    };

    return (
        <div className="container mt-4 vieworder-page">
            <h1 className="text-theme fw-bold mb-4 text-center">Order Summary</h1>

            {/* Items Ordered */}
            <div className="card shadow-sm border-theme p-4 mb-4">
                <h3 className="text-theme mb-3">Items Ordered</h3>
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

            {/* Shipping Info */}
            <div className="card shadow-sm border-theme p-4 mb-4">
                <h3 className="text-theme mb-3">Shipping Details</h3>
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

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                    Back
                </button>
                <button className="btn btn-theme" onClick={handleConfirm}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default ViewOrder;
