import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import OrderConfirmation from "./applyModal";
import OrderForm from "./orderForm";
import { order } from "../../stores/cart/order";

import * as styles from "./styles.module.css";

const Order = observer(() => {
  const location = useLocation();
  const { totalPrice, totalProductsCount } = location.state || { totalPrice: 0, totalProductsCount: 0 };

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === true) {
      order.setModalShow(true)
    }

    order.setValidated(true)
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Order Form</h2>
      <br/>

      <Form noValidate validated={order.validated} onSubmit={handleSubmit} className={styles.main} >
        <OrderForm
          onFirstNameChange={(e) => order.setFirstName(e.target.value)}
          onLastNameChange={(e) => order.setLastName(e.target.value)}
          onEmailChange={(e) => order.setEmail(e.target.value)}
          onPhoneChange={(e) => order.setPhone(e.target.value)}
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
        show={order.modalShow}
        onHide={() => order.setModalShow(false)}
        firstname={order.firstName}
        lastname={order.lastName}
        email={order.email}
        phone={order.phone}
        totalprice={totalPrice}
        totalproductscount={totalProductsCount}
      />
    </div>
  )
})

export default Order
