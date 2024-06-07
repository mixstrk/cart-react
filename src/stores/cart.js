import { makeAutoObservable } from "mobx";

import { shop } from "./shop";
import { fetchCartItems } from "../api/cart"
import { removeAllProductsFromCart } from "../api/cart/removeAllProducts"
import { removeProductFromCart } from "../api/cart/removeProduct"
import { handleApiError } from "../utils/index"

class CartStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCartItems();
  }

  async fetchCartItems() {
    try {
      const data = await fetchCartItems();
      this.products = data;
    } catch (error) {
      handleApiError("fetching cart items", error);
    }
  }

  async removeProductFromCart(product) {
    try {
      await removeProductFromCart(product.id);
      
      product.inCart = false;
      shop.setProductsCart = shop.productsCart.filter(productCart => productCart.id !== product.id);
      shop.saveCartToLocalStorage();
      shop.fetchCartItemsCount()
      this.fetchCartItems()

      const updatedProducts = shop.products.map((p) => {
        if (p.id === product.id) {
          return { ...p, inCart: false };
        }
        return p;
      });
      shop.setProducts(updatedProducts);
    } catch (error) {
      handleApiError("deleting product from cart", error);
    }
  }

  async removeAllProductsFromCart() {
    try {
      await removeAllProductsFromCart();
      this.clearCart()
    } catch (error) {
      handleApiError("removing products", error);
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(this.products));
  }

  changeCnt(index, cnt) {
    this.products[index] = { ...this.products[index], quantity: cnt };
    this.saveCartToLocalStorage();
  }

  deleteProduct(productId) {
    let index = this.products.findIndex((pr) => pr.id === productId)
    if (index !== -1) {
      this.products.splice(index, 1)
    }
    this.saveCartToLocalStorage();
  }

  setProducts(products) {
    this.products = products;
    this.saveCartToLocalStorage();
  }

  get totalPrice() {
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  get totalProductsCount() {
    return this.products.reduce((total, product) => total + product.quantity, 0);
  }
  
  get cartProducts() {
    return this.products
  }

  clearCart() {
    this.products = [];
    shop.clearCart();
  }
}

export const cart = new CartStore();
