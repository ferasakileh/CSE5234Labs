import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const PaymentEntry = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    
    // Redirect if no order data
    React.useEffect(() => {
        if (!location.state || !location.state.order) {
            navigate('/purchase');
        }
    }, [location.state, navigate]);

    
    const [paymentInfo, setPaymentInfo] = useState({
        credit_card_number: '',
        expir_date: '',
        cvvCode: '',
        card_holder_name: ''
    });

    const formatCardNumber = (value) => {
        // Remove all non-digit characters
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        // Add spaces every 4 digits
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const v = value.replace(/\D/g, '');
        // Add slash after 2 digits
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const formatCVV = (value) => {
        // Only allow digits, max 4 characters
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
        
        // Update the order with payment information
        const updatedOrder = {
            ...location.state.order,
            ...paymentInfo
        };

        localStorage.removeItem('cart');
        
        // Navigate to the next page (e.g., shipping information or confirmation)
        navigate('/purchase/shippingEntry', { 
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
                {location.state?.order?.items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                        <div key={item.productId} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{product.name}</span>
                            <span>Quantity: {item.quantity} × ${product.price} = ${item.quantity * product.price}</span>
                        </div>
                    );
                })}
                <div className="mt-3 border-top pt-2">
                    <strong>Total: ${location.state?.order?.items.reduce((total, item) => {
                        const product = products.find(p => p.id === item.productId);
                        return total + (item.quantity * product.price);
                    }, 0)}</strong>
                </div>
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
