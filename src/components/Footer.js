import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-theme border-top mt-auto">
            <div className="container py-3 text-center">
                <small>
                    © {year} Harvest Hub
                </small>
            </div>
        </footer>
    );
};

export default Footer;
