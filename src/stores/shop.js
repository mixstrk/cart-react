import { makeAutoObservable } from "mobx";
import { handleApiError } from "../utils";
import { fetchProducts } from "../api/products"
import { fetchCartItemsCount } from "../api/cart/getCartItemsCount";
import { addProductToCart } from "../api/cart/addProduct";
import { removeProductFromCart } from "../api/cart/removeProduct";

class ShopStore {
  productsToCart = [];
  shopProducts = [];
  cartItems = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchProducts()
    this.fetchCartItemsCount()
  }

  async fetchProducts() {
    try {
      const data = await fetchProducts();
      this.shopProducts = data;
    } catch (error) {
      handleApiError("fetching products", error);
    }
  }

  async addProductToCart(product) {
    try {
      const cartItem = await addProductToCart(product.id);
      product.inCart = true;
      this.productsToCart.push(cartItem);
      this.saveCartToLocalStorage();
      this.fetchCartItemsCount()
    } catch (error) {
      handleApiError("adding product to cart", error);
    }
  }

  async removeProduct(product) {
    try {
      await removeProductFromCart(product.id);
      
      product.inCart = false;
      this.productsToCart = this.productsToCart.filter(productCart => productCart.id !== product.id);
      this.saveCartToLocalStorage();
      this.fetchCartItemsCount()
    } catch (error) {
      handleApiError("deleting product from cart", error);
    }
  }

  async fetchCartItemsCount() {
    try {
      const cartItems = await fetchCartItemsCount();
      this.cartItems = cartItems.count
      this.saveCartToLocalStorage();
    } catch (error) {
      handleApiError("fetching items count", error);
    }
  }
  
  saveCartToLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(this.productsToCart));
  }

  clearCart() {
    this.productsToCart = [];
  }

  get cartItemsCount() {
    return this.cartItems
  }

  setCartItemsCount(count) {
    this.cartItems = count;
  }

  get products() {
    return this.shopProducts
  }

  setProducts(products) {
    this.shopProducts = products;
  }

  get productsCart() {
    return this.productsToCart
  }

  setProductsCart(productsCart) {
    this.productsToCart = productsCart
  }
}

export const shop = new ShopStore();

