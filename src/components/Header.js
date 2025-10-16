import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartModal from './CartModal';
import '../styles/Header.css';

const Header = () => {
    const location = useLocation();
    const { cart, setShowCart } = useContext(CartContext);

    const hideCartOn = [
        '/purchase/shippingEntry',
        '/purchase/paymentEntry',
        '/purchase/viewOrder',
        '/purchase/viewConfirmation'
    ];
    const shouldHideCart = hideCartOn.includes(location.pathname);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-theme">
                <div className="container-fluid px-4">
                    <Link to="/" className="navbar-brand navbar-brand-custom">Harvest Hub</Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/purchase" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                                    Shop
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/aboutUs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                                    Contact Us
                                </NavLink>
                            </li>

                            {!shouldHideCart && (
                                <button
                                    className="btn btn-theme position-relative ms-3"
                                    onClick={() => setShowCart(true)}
                                >
                                    🛒
                                    {cart.length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme-danger">
                                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    )}
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <CartModal />
        </header>
    );
};

export default Header;
