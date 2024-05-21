import React from "react"
import { useLocation } from "react-router-dom"

const ConfirmationPage = () => {
  const location = useLocation()
  const { 
    totalPrice,
    totalProductsCount,
    firstName,
    lastName,
    email,
    phone
  } = location.state || { totalPrice: 0, totalProductsCount: 0 }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thank you for your purchase, {firstName} {lastName}!</h1>
      <p>Your order #{generateOrderNumber()} has been confirmed.</p>
      <p>We will contact you shortly via the contact information you left:</p>
      {email}, {phone}
    </div>
  )
}

function generateOrderNumber() {
  // Генерация случайного числа от 10000 до 99999
  const min = 10000
  const max = 99999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export default ConfirmationPage
