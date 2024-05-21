import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from "./components/cartPage/cart-copy.js"
import OrderPage from "./components/orderPage/orderPage.js";
import ConfirmationPage from "./components/confirmationPage/confirmationPage.js";

export default class extends React.Component{
  render(){
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
