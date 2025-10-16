import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, showCart, setShowCart }}>
            {children}
        </CartContext.Provider>
    );
};
