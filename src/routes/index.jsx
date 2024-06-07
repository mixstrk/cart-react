import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from "../pages/products";
import ProductShow from "../pages/products/show";
import Cart from "../pages/cart";
import Order from "../pages/order";
import Orders from "../pages/orders";
import OrderShow from "../pages/orders/show"
import Confirmation from "../pages/confirmation";
import NavbarMenu from "../components/navbarMenu";

const Router = () => {
  return (
    <BrowserRouter>
      <NavbarMenu/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/order" element={<Order />} />
        <Route path="/order/confirmation" element={<Confirmation />} />
        <Route path="/products/:id" element={<ProductShow />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderShow />} />
        <Route path="*" element={<Products />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
