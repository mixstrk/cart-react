import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { shop } from "../../../stores/shop";
import * as styles from "./styles.module.css";
import { fetchProduct } from "../../../api/products/show"

const ProductShow = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const backToProducts = () => {
    navigate("/products");
  };

  const handleAddToCart = async () => {
    await shop.addProductToCart(product);
    setProduct({ ...product, inCart: true });
    const updatedProducts = shop.products.map((p) => {
      if (p.id === product.id) {
        return { ...p, inCart: true };
      }
      return p;
    });
    shop.setProducts(updatedProducts);
  };

  const handleRemoveFromCart = async () => {
    await shop.removeProduct(product);
    setProduct({ ...product, inCart: false });
    const updatedProducts = shop.products.map((p) => {
      if (p.id === product.id) {
        return { ...p, inCart: false };
      }
      return p;
    });
    shop.setProducts(updatedProducts);
  };

  return (
    <div>
      {product && (
        <>
          <h2 className={styles.h2}>{product.title}</h2>
          <h3>Product price: {product.price}</h3>
          { product.inCart ?  (
            <Button
              className={styles.addToCartBtn}
              variant="danger"
              onClick={handleRemoveFromCart}
            >
              Remove
            </Button>
          ) : (
            <Button
              className={styles.addToCartBtn}
              variant="dark"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
          <Button variant="dark" onClick={backToProducts}>
            Back to products list
          </Button>
        </>
      )}
    </div>
  );
});

export default ProductShow;
