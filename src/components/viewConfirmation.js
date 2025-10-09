import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DevelopConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const confirmationCode =
    location.state?.confirmationCode || "CONF123456";

  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully completed.</p>
      <p>
        <strong>Confirmation Number:</strong> {confirmationCode}
      </p>
      <button onClick={() => navigate("/purchase")}>Return to Purchase Page</button>
    </div>
  );
};

export default DevelopConfirmation;
