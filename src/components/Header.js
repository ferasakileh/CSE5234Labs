import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-maroon">
        <div className="container">
          <Link to="/purchase" className="navbar-brand navbar-brand-custom">Placeholder Name</Link>

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
                <NavLink to="/purchase" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
