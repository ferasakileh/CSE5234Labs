import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const ShippingEntry = () => {
    // Hooks 
    const navigate = useNavigate();
    const location = useLocation();
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '', 
        city: '',
        state: '',
        zip: ''
    });
    
    useEffect(() => {
        document.title = 'Shipping Information';
    }, []); // The empty array means this effect runs only once when the component first loads

    // Handler Functions
    // Handle user typing in box
     const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({
            ...prevState, 
            [name]: value 
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve order object from previous step (if available)
        const previousState = location.state || {};
        const order = previousState.order || {};

        // Navigate to viewOrder with BOTH order + shipping info
        navigate('/purchase/viewOrder', {
            state: {
            order: order,
            shippingInfo: shippingInfo
            }
        });
        };

    // 5. Form
    return (
        <div>
            <h1>Shipping Information</h1>
            {/* Connect handleSubmit to the form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    {/* IMPORTANT: 'name' must match your state keys.
                        'value' ties the box to the state.
                        'onChange' ties the box to the handler. */}
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address Line 1:</label>
                    <input
                        type="text"
                        name="addressLine1"
                        value={shippingInfo.addressLine1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address Line 2 (Optional):</label>
                    <input
                        type="text"
                        name="addressLine2"
                        value={shippingInfo.addressLine2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit">Continue to Order Summary</button>
            </form>
        </div>
    );
};


export default ShippingEntry;