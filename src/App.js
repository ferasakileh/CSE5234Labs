import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Purchase from './pages/purchase-process/purchase';
import PaymentEntry from './pages/purchase-process/paymentEntry';
import ShippingEntry from './pages/purchase-process/shippingEntry';
import ViewOrder from './pages/purchase-process/viewOrder';
import ViewConfirmation from './pages/purchase-process/viewConfirmation';
import Home from './pages/Home';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutUs';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/purchase' element={<Purchase />} />
                    <Route path='/purchase/shippingEntry' element={<ShippingEntry />} />
                    <Route path='/purchase/paymentEntry' element={<PaymentEntry />} />
                    <Route path='/purchase/viewOrder' element={<ViewOrder />} />
                    <Route path='/purchase/viewConfirmation' element={<ViewConfirmation />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;