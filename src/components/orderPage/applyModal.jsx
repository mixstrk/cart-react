import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrderConfirmation(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Сonfirm your order
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
                { props.firstName }
              </td>
            </tr>

            <tr>
            <td>
                Last name
              </td>
              <td>
                { props.lastName }
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
              <td>{props.totalProductsCount} items</td>
            </tr>

            <tr>
              <td>
                Total price
              </td>
              <td>{props.totalPrice}₽</td>
            </tr>
          </tbody>
        </table>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="dark" onClick={props.checkOut}>Check out</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderConfirmation
