import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as styles from "./styles.module.css"
import { shop } from "../../stores/shop";

const Shop = observer(() => {
  let products = shop.products;
  const navigate = useNavigate();

  const goToProduct = (productId) => {
    navigate("/products/" + productId);
  }
  
  const productCards = products.map((product, i) => (
    <div key={product.id} className="col-sm-3">      
      <div className={"card " + styles.divCard}>
        <div className="card-body">
          <div className="card-body">
            <h5 className="card-title text-center">{product.title}</h5>
            <p className="card-text">Price: {product.price}</p>
            { product.inCart ? 
              <Button
                className={styles.addToCartBtn}
                variant="danger"
                onClick={() => shop.removeProduct(product)}
              >
                Remove
              </Button>
              :
              <Button
                className={styles.addToCartBtn}
                variant="dark"
                onClick={() => {
                  if (product.rest > 0) {
                    shop.addProductToCart(product);
                  }
                }}
                disabled={Number(product.rest) === 0}
              >
                {Number(product.rest) === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            }
            <Button variant="dark" onClick={() => goToProduct(product.id)}>
              Get more
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className={styles.main}>
        <h2 className={styles.h2}>Products</h2>
        <div className="row">
          {productCards}
        </div>
      </div>
      <hr />
    </div>
  );
}) 

export default Shop;
