import React from "react"
import { order } from "../../stores/cart/order";
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { firstname, lastname, email, phone, totalPrice, totalProductsCount } = location.state;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thank you for your purchase, { firstname } { lastname }!</h1>
      <p>Your order #{generateOrderNumber()} has been confirmed.</p>
      <p>We will contact you shortly via the contact information you left:</p>
      { email }, { phone }
    </div>
  )
}

function generateOrderNumber() {
  const min = 10000
  const max = 99999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export default ConfirmationPage
