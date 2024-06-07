import React from "react"
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { order } from "../../stores/cart/order";

function orderForm({ onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange}) {
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="First name"
          aria-label="Firstname"
          value={ order.firstName }
          onChange={onFirstNameChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a first name.
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Last name"
          aria-label="Lastname"
          value={ order.lastName }
          onChange={onLastNameChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a last name.
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Email"
          value={ order.email }
          onChange={onEmailChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Phone"
          value={ order.phone }
          onChange={onPhoneChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid phone.
        </Form.Control.Feedback>
      </InputGroup>
    </>
  )
}

export default orderForm
