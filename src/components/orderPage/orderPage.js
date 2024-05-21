import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button, Form } from "react-bootstrap"

import OrderConfirmation from "./applyModal"
import OrderForm from "./orderForm"


const OrderPage = () => {
  const location = useLocation()
  const { totalPrice, totalProductsCount } = location.state || { totalPrice: 0, totalProductsCount: 0 }
  const [modalShow, setModalShow] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [validated, setValidated] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === true) {
      setModalShow(true)
    }

    setValidated(true)
  }

  const handleCheckout = () => {
    setModalShow(false)
    navigate("/order/confirmation", {
        state: {
          totalPrice: totalPrice, 
          totalProductsCount: totalProductsCount,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        }
      }
    )
  }

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Order Form</h2>
      <br/>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <OrderForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          onFirstNameChange={(e) => setFirstName(e.target.value)}
          onLastNameChange={(e) => setLastName(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPhoneChange={(e) => setPhone(e.target.value)}
        />
        
        <div style={{textAlign: "right"}}>
          <span>
            Total({totalProductsCount}): <strong>{totalPrice}₽</strong>
          </span>
          <div>
            <Button variant="dark" type="submit">
              Check out
            </Button>
          </div>
        </div>
      </Form>
      
      <OrderConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        totalProductsCount={totalProductsCount}
        totalPrice={totalPrice}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        checkOut={handleCheckout}
      />
    </div>
  )
}

export default OrderPage
