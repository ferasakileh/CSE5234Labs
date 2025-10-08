import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentEntry = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const [paymentInfo, setPaymentInfo] = useState({
        credit_card_number: '',
        expir_date: '',
        cvvCode: '',
        card_holder_name: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Update the order with payment information
        const updatedOrder = {
            ...location.state.order,
            ...paymentInfo
        };
        
        // Navigate to the next page (e.g., shipping information or confirmation)
        navigate('/purchase/shipping', { 
            state: { 
                order: updatedOrder 
            } 
        });
    };

    return (
        <div className="container mt-4">
            <h1>Payment Information</h1>
            
            <div className="mb-3">
                <h3>Order Summary:</h3>
                <p>Product 1 Quantity: {location.state.order.buyQuantity[0]}</p>
                <p>Product 2 Quantity: {location.state.order.buyQuantity[1]}</p>
            </div>

            <form onSubmit={handleSubmit} className="card p-4">
                <h3 className="mb-3">Payment Details</h3>
                
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

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button 
                        type="button" 
                        className="btn btn-secondary me-md-2"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Continue to Shipping
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentEntry;
