import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import CartModal from '../../components/CartModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/purchase.css'; // new theme styles

const Purchase = () => {
    let title = "Purchase Page";

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [showCart, setShowCart] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.productId === product.id);
            if (existingItem) {
                return currentCart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentCart, { productId: product.id, quantity: 1 }];
        });
    };

    const getItemQuantity = (productId) => {
        const item = cart.find(item => item.productId === productId);
        return item ? item.quantity : 0;
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
        navigate('/purchase/paymentEntry', { state: { order } });
    };

    return (
        <div className="container mt-4 purchase-page">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-theme fw-bold">{title}</h1>
                <button 
                    className="btn btn-theme position-relative"
                    onClick={() => setShowCart(true)}
                >
                    View Cart
                    {cart.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme-danger">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100 border-theme shadow-sm">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="card-img-top p-3 rounded"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-theme fw-bold">{product.name}</h5>
                                <p className="card-text text-muted fs-5">Price: ${product.price}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button 
                                        className="btn btn-theme flex-grow-1 me-2"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                    {getItemQuantity(product.id) > 0 && (
                                        <span className="badge bg-theme-secondary">
                                            In cart: {getItemQuantity(product.id)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CartModal 
                show={showCart}
                handleClose={() => setShowCart(false)}
                cart={cart}
                setCart={setCart}
                handleCheckout={handleCheckout}
            />
        </div>
    );
};

export default Purchase;
