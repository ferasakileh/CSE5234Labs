import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-light border-top mt-auto">
      <div className="container py-3 text-center text-muted">
        <small>
          © {year} Placeholder Name
        </small>
      </div>
    </footer>
  );
};

export default Footer;
