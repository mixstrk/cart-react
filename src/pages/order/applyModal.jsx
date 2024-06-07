import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

import { order } from "../../stores/cart/order";
import { createOrder } from "../../api/cart/order/createOrder";
import { shop } from "../../stores/shop";
import { cart } from "../../stores/cart"

const OrderConfirmation = (props) => {
  const navigate = useNavigate();
  const orderInformation = {
    firstname: order.firstName,
    lastname: order.lastName,
    email: order.email,
    phone: order.phone
  }

  const handleCheckout = async () => {
    try {
      const orderConfirmation = await order.createOrder(orderInformation);

      order.clearOrder();
      cart.clearCart();
      shop.products.forEach(p => p.inCart = false);
      await shop.fetchCartItemsCount();
      order.setModalShow(false);

      navigate("/order/confirmation", {
        state: {
          ...orderConfirmation,
          totalPrice: props.totalPrice,
          totalProductsCount: props.totalProductsCount
        }
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm your order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                First name
              </td>
              <td>
                { props.firstname }
              </td>
            </tr>

            <tr>
              <td>
                Last name
              </td>
              <td>
                { props.lastname }
              </td>
            </tr>

            <tr>
              <td>
                Email
              </td>
              <td>
                { props.email}
              </td>
            </tr>

            <tr>
              <td>
                Phone
              </td>
              <td>
                { props.phone}
              </td>
            </tr>

            <tr>
              <td>
                Total products count
              </td>
              <td>{props.totalproductscount} items</td>
            </tr>

            <tr>
              <td>
                Total price
              </td>
              <td>{props.totalprice}₽</td>
            </tr>
          </tbody>
        </table>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="dark" onClick={handleCheckout}>Check out</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderConfirmation
