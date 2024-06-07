import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { cart } from "../../stores/cart";
import CartSummary from "./cartSummary";
import * as styles from "./styles.module.css"

const Cart = observer(() => {
  const products = cart.products || [];
  const navigate = useNavigate();

  const proceedToCheckoutOrder = () => {
    navigate("/cart/order", {
      state: {
        totalPrice: cart.totalPrice,
        totalProductsCount: cart.totalProductsCount
      },
    });
  };

  useEffect(() => {
    cart.fetchCartItems();
  }, []);

  return (
    <div className="container">
      <div className={styles.main}>
        <h2 className={styles.h2}>Cart</h2>
        { products.length > 0 ? (
          <CartSummary 
            proceedToCheckoutOrder={proceedToCheckoutOrder}
            clearCart={() => cart.clearCart()}
            products={cart.products}
          />
        ) : (
          <div>
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}) 

export default Cart;
