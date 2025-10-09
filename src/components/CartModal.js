import React from 'react';
import { products } from '../data/products';

const CartModal = ({ show, handleClose, cart, setCart, handleCheckout }) => {
    if (!show) return null;

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

    return (
    <>
        <div className="modal-backdrop show"></div> {/* Modal backdrop shadow */}
        <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Shopping Cart</h5>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                    {cart.length === 0 ? (
                    <div className="alert alert-info">Your cart is empty</div>
                    ) : (
                    <>
                        {cart.map((item) => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                            <div key={item.productId} className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                <div className="col-md-4">
                                    <h6 className="card-title mb-0">{product.name}</h6>
                                    <small className="text-muted">Price: ${product.price}</small>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group input-group-sm">
                                    <span className="input-group-text">Qty:</span>
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
                                    <p className="mb-1">Subtotal: ${product.price * item.quantity}</p>
                                    <button 
                                    className="btn btn-danger btn-sm"
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
                        <div className="card bg-light">
                        <div className="card-body">
                            <h5 className="mb-0">Total: ${calculateTotal()}</h5>
                        </div>
                        </div>
                    </>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Continue Shopping
                    </button>
                    {cart.length > 0 && (
                    <button 
                        type="button" 
                        className="btn btn-primary"
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