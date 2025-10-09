import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
    let title = "Purchase Page";
    
    const [order, setOrder] = useState({
        buyQuantity: [0,0,0,0], credit_card_number: '', expir_date: '', cvvCode: '',
        card_holder_name: '', address_1: '', address_2: '', city: '', state: '', zip: ''
    });
    
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/purchase/paymentEntry', { state: { order: order } });
    };
    
    console.log('order: ', order);

    return (
        <div className="container mt-4">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Product 1:</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => {
                            const newOrder = {...order};
                            newOrder.buyQuantity[0] = e.target.value;
                            setOrder(newOrder);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product 2:</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => {
                            const newOrder = {...order};
                            newOrder.buyQuantity[1] = e.target.value;
                            setOrder(newOrder);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Pay</button>
            </form>
        </div>
    );
};

export default Purchase;
