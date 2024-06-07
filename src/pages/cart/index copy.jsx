import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import { cartStore } from "../../stores/cart";

import AppMinMax from "../../components/minmax";
import * as styles from "./styles.module.css"

const Cart = observer(() => {
  const navigate = useNavigate();

  const proceedToCheckoutOrder = () => {
    navigate("/cart/order", {
      state: {
        totalPrice: cartStore.totalPrice,
        totalProductsCount: cartStore.totalProductsCount,
      },
    });
  };

  const productsRows = cartStore.products.map((product, i) => (
      <tr key={product.id}>
        <td className="delete-product-btn">
          <button onClick={() => cartStore.deleteProduct(i)}>x</button>
        </td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>
          <AppMinMax
            min={1}
            max={product.rest}
            cnt={product.current}
            onChange={(cnt) => cartStore.changeCnt(i, cnt)}
          />
        </td>
        <td>{product.price * product.current}</td>
      </tr>
  ));

  return (
    <div className="container">
      <div className={styles.main}>
        <h2 className={styles.h2}>Cart</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td style={{ width: "30px" }}></td>
              <td>Title</td>
              <td>Price</td>
              <td style={{ width: "100px" }}>Count</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>{productsRows}</tbody>
        </table>

        <div className={styles.total}>
          <span>
            Total({cartStore.totalProductsCount}):{" "}
            <strong>{cartStore.totalPrice}₽</strong>
          </span>
          <div>
            <Button variant="dark" onClick={proceedToCheckoutOrder}>
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}) 

export default Cart;
