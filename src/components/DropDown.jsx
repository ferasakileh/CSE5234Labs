import React, { useState } from 'react';
import "../styles/DropDown.css";

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-title" onClick={toggleDropdown}>
                {title}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;