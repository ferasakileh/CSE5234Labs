import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cartModal.css'; // theme styling

const CartModal = () => {
    const navigate = useNavigate();
    const { showCart, setShowCart, cart, setCart } = useContext(CartContext);

    if (!showCart) return null;

    const handleQuantityChange = (productId, quantity) => {
        const newCart = cart.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: parseInt(quantity) || 0 };
            }
            return item;
        });
        setCart(newCart.filter(item => item.quantity > 0));
    };

    const removeItem = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product.price * item.quantity);
        }, 0);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        const order = {
            items: cart,
            credit_card_number: '',
            expir_date: '',
            cvvCode: '',
            card_holder_name: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            zip: ''
        };

        setShowCart(false);
        navigate('/purchase/paymentEntry', { state: { order } });
    };

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content border-theme shadow-lg">
                        <div className="modal-header bg-theme text-white">
                            <h5 className="modal-title fw-bold">Shopping Cart</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowCart(false)}></button>
                        </div>

                        <div className="modal-body">
                            {cart.length === 0 ? (
                                <div className="alert alert-theme text-center">
                                    Your cart is empty
                                </div>
                            ) : (
                                <>
                                    {cart.map((item) => {
                                        const product = products.find(p => p.id === item.productId);
                                        return (
                                            <div key={item.productId} className="card mb-3 border-theme-light shadow-sm">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-4">
                                                            <h6 className="card-title mb-0 text-theme fw-semibold">{product.name}</h6>
                                                            <small className="text-muted">Price: ${product.price}</small>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="input-group input-group-sm">
                                                                <span className="input-group-text bg-theme text-white">Qty</span>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    min="0"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 text-end">
                                                            <p className="mb-1 text-secondary">
                                                                Subtotal: <strong>${product.price * item.quantity}</strong>
                                                            </p>
                                                            <button
                                                                className="btn btn-outline-theme btn-sm"
                                                                onClick={() => removeItem(item.productId)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="card bg-light border-theme mt-3">
                                        <div className="card-body text-end">
                                            <h5 className="mb-0 text-theme fw-bold">
                                                Total: ${calculateTotal()}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowCart(false)}
                            >
                                Continue Shopping
                            </button>

                            {cart.length > 0 && (
                                <button
                                    type="button"
                                    className="btn btn-theme"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartModal;
