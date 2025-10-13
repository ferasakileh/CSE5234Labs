  import React from 'react';
  import './App.css';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import Purchase from './components/purchase';
  import PaymentEntry from './components/paymentEntry';
  import ShippingEntry from './components/shippingEntry'; 
  import ViewOrder from './components/viewOrder';
  import ViewConfirmation from './components/viewConfirmation';
  import ContactUs from './components/contactUs'; 

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
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/" element={<Navigate replace to="/purchase" />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;