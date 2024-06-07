import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import OrderConfirmation from "./applyModal";
import OrderForm from "./orderForm";
import { orderStore } from "../../stores/orderStore";
// import { favorite } from "../../stores/orderStore";

import * as styles from "./styles.module.css";

const Order = observer(() => {
  const location = useLocation();
  const { totalPrice, totalProductsCount } = location.state || { totalPrice: 0, totalProductsCount: 0 };

  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === true) {
      orderStore.setModalShow(true)
    }

    orderStore.setValidated(true)
  };

  const handleCheckout = () => {
    orderStore.setModalShow(false)

    navigate("/order/confirmation", {
        state: {
          totalPrice: totalPrice, 
          totalProductsCount: totalProductsCount,
          firstName: orderStore.firstName,
          lastName: orderStore.lastName,
          email: orderStore.email,
          phone: orderStore.phone
        }
      }
    )
  };

  const goToShop = () => {
    navigate("/shop", {
      state: {
        totalPrice: 55,
        totalProductsCount: 53,
      },
    });
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Order Form</h2>
      <br/>

      <Form noValidate validated={orderStore.validated} onSubmit={handleSubmit} className={styles.main} >
        <OrderForm
          firstName={orderStore.firstName}
          lastName={orderStore.lastName}
          email={orderStore.email}
          phone={orderStore.phone}
          onFirstNameChange={(e) => orderStore.setFirstName(e.target.value)}
          onLastNameChange={(e) => orderStore.setLastName(e.target.value)}
          onEmailChange={(e) => orderStore.setEmail(e.target.value)}
          onPhoneChange={(e) => orderStore.setPhone(e.target.value)}
        />
        
        <div className={styles.div}>
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
        show={orderStore.modalShow}
        onHide={() => orderStore.setModalShow(false)}
        firstName={orderStore.firstName}
        lastName={orderStore.lastName}
        email={orderStore.email}
        phone={orderStore.phone}
        checkOut={handleCheckout}
        totalPrice={totalPrice}
        totalProductsCount={totalProductsCount}
      />
    </div>
  )
})

export default Order
