import { useContext } from 'react';
import { products } from '../../data/products';
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/purchase.css'; // new theme styles

const Purchase = () => {
    const { cart, setCart } = useContext(CartContext);

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

    return (
        <div className="container mt-4 purchase-page">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100 border-theme shadow-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="purchase-img card-img-top p-3 rounded"
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
        </div>
    );
};

export default Purchase;
