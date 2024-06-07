import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { shop } from "../../stores/shop";
import { cart } from "../../stores/cart";
import AppMinMax from "../../components/minmax";
import * as styles from "./styles.module.css";

const CartSummary = observer(({ proceedToCheckoutOrder, products }) => {
  const removeAllFromCart = async () => {
    try {
      await cart.removeAllProductsFromCart();

      shop.products.forEach(p => p.inCart = false);

      await shop.fetchCartItemsCount();
    } catch (error) {
      console.error("Error removing products", error);
    }
  }

  const productsRows = products.map((product, i) => (
    <tr key={product.id}>
      <td className="delete-product-btn">
        <button onClick={() => cart.removeProductFromCart(product)}>x</button>
      </td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>
        <AppMinMax
          min={1}
          max={Number(product.rest)}
          cnt={Number(product.quantity)}
          onChange={(cnt) => cart.changeCnt(i, cnt)}
          productId={product.id}
        />
      </td>
      <td>{product.price * product.quantity}</td>
    </tr>
  ));

  return (
    <>
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
          Total({cart.totalProductsCount}):{" "}
          <strong>{cart.totalPrice}₽</strong>
        </span>
        <div>
          <Button variant="danger" className={styles.clearBtn} onClick={ () => removeAllFromCart() }>
            Clear cart
          </Button>
          <Button variant="dark" onClick={ proceedToCheckoutOrder }>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </>
  )
})

export default React.memo(CartSummary);
