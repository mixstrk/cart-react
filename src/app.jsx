import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/cartPage/cart-copy";
import OrderPage from "./components/orderPage/orderPage";
import ConfirmationPage from "./components/confirmationPage/confirmationPage";

export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
