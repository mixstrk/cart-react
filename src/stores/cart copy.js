import { makeAutoObservable } from "mobx";
import { shop } from "./shop";

class CartStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(this.products));
  }

  changeCnt(index, cnt) {
    this.products[index] = { ...this.products[index], current: cnt };
    this.saveCartToLocalStorage();
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
    this.saveCartToLocalStorage();
  }

  remove(productId) {
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
    return this.products.reduce((total, product) => total + product.price * product.current, 0);
  }

  get totalProductsCount() {
    return this.products.reduce((total, product) => total + product.current, 0);
  }

  clearCart() {
    this.products = [];
    shop.clearCart();
  }
}

export const cart = new CartStore();
