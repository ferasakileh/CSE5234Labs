import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { fetchInventory } from "../../api/inventoryApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/purchase.css";

const Purchase = () => {
    console.log("API BASE:", process.env.REACT_APP_INVENTORY_API_BASE);
    const { cart, setCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInventory()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load items from inventory service.");
                setLoading(false);
            });
    }, []);

    const addToCart = (product) => {
    // check current quantity in cart
    // const currentQty = getItemQuantity(product.id);

    // // Prevent adding beyond available stock
    // if (currentQty >= product.availableQty) {
    //     alert(`Only ${product.availableQty} units of "${product.name}" are available.`);
    //     return;
    // }

    setCart((currentCart) => {
        const existingItem = currentCart.find(
            (item) => item.productId === product.id
        );

        if (existingItem) {
            return currentCart.map((item) =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }

        return [...currentCart, { productId: product.id, quantity: 1 }];
        });
    };


    const getItemQuantity = (productId) => {
        const item = cart.find((item) => item.productId === productId);
        return item ? item.quantity : 0;
    };


    return (
        <div className="container mt-4 purchase-page">
            {loading && <p className="text-center fs-4 text-muted">Loading inventory...</p>}
            {error && <p className="text-center text-danger fs-5">{error}</p>}

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
                                <h5 className="card-title text-theme fw-bold">
                                    {product.name}
                                </h5>
                                <p className="card-text text-muted fs-5">
                                    Price: ${product.price}
                                </p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-theme flex-grow-1 me-2"
                                        onClick={() => addToCart(product)}
                                        // disabled={getItemQuantity(product.id) >= product.availableQty}
                                    >
                                        {/* {getItemQuantity(product.id) >= product.availableQty ? "Max Reached" : "Add to Cart"} */}
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
