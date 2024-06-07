import { makeAutoObservable } from "mobx";
import { handleApiError } from "../utils";
import { fetchOrders } from "../api/orders"

class OrdersStore {
  productOrders = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchOrders()
  }

  async fetchOrders() {
    try {
      const data = await fetchOrders();
      this.productOrders = data;
    } catch (error) {
      handleApiError("fetching products", error);
    }
  }

  get orders() {
    return this.productOrders
  }
}

export const ordersIndex = new OrdersStore();

