import { makeAutoObservable } from "mobx";
import { createOrder } from "../../api/cart/order/createOrder"
import { cart } from "../cart"
import { handleApiError } from "../../utils/index"

class OrderStore {
  firstNameOrder = localStorage.getItem("firstName") || "";
  lastNameOrder = localStorage.getItem("lastName") || "";
  emailOrder = localStorage.getItem("email") || "";
  phoneOrder = localStorage.getItem("phone") || "";
  modalShow = false;
  validated = false;

  orderProducts = cart.cartProducts

  constructor() {
    makeAutoObservable(this);
  }

  async createOrder(orderInformation) {
    try {
      const data = await createOrder(orderInformation);

      return data.order_confirmation;
    } catch (error) {
      handleApiError("adding product to cart", error);
    }
  }

  setFirstName(name) {
    this.firstNameOrder = name;
    localStorage.setItem("firstName", name);
  }

  setLastName(name) {
    this.lastNameOrder = name;
    localStorage.setItem("lastName", name);
  }

  setEmail(email) {
    this.emailOrder = email;
    localStorage.setItem("email", email);
  }

  setPhone(phone) {
    this.phoneOrder = phone;
    localStorage.setItem("phone", phone);
  }

  setModalShow(show) {
    this.modalShow = show;
  }

  setValidated(validation) {
    this.validated = validation;
  }

  get firstName() {
    return this.firstNameOrder
  }

  get lastName() {
    return this.lastNameOrder
  }

  get email() {
    return this.emailOrder
  }

  get phone() {
    return this.phoneOrder
  }

  get products() {
    return this.orderProducts
  }

  clearOrder() {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    this.setFirstName("");
    this.setLastName("");
    this.setEmail("");
    this.setPhone("");
  }
}

export const order = new OrderStore();
