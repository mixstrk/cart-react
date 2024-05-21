import React from "react";
import AppMinMax from "./minmax/minmax.js";
import { Button } from 'react-bootstrap';

export default class extends React.Component{
  state = {
    products: getProducts(),
    formDone: false
  }

  changeCnt(i, cnt){
    let products = [...this.state.products];
    products[i] = {...products[i], current: cnt};
    this.setState({products});
  }

  totalPrice(products) {
    return products.reduce((total, product) => {
      return total + (product.price * product.current);
     }, 0);
  }

  totalProductsCount(products) {
   return products.reduce((total, product) => {
    return total + (product.current);
   }, 0);
  }

  deleteProduct(i){
    let products = [...this.state.products];
    products.splice(i, 1);
    this.setState({products});
  }

  checkoutOrder = () => {
    this.setState({ isOrderFormDisplayed: false });
  };

  sendForm = () => {
    this.setState({formDone: true});
  }
  
  render(){
    let productsRows = this.state.products.map((product, i) => {
      return (
        <tr key={product.id}>
          <td className="delete-product-btn">
            <button onClick={() => this.deleteProduct(i)}>x</button>
          </td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>
            <AppMinMax min={1}
                       max={product.rest}
                       cnt={product.current}
                       onChange={(cnt) => this.changeCnt(i, cnt)}
             />
          </td>
          <td>{product.price * product.current}</td>
        </tr>
      );
    });

    let products = this.state.products;
    let page = this.state.formDone ? 
      showCongrats(this.totalPrice(products)) :
      showForm(productsRows, this.totalProductsCount(products), this.totalPrice(products), this.sendForm)

    return (
      <div className="container">
        {page}
      </div>
    );
  }
}

function showForm(productsRows, totalProductsCount, totalPrice, sendForm) {
  return (
    <div>
      <h2>Cart</h2>
      <table className="table table-bordered">
      <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Price</td>
            <td className="count-column-table">Count</td>
            <td>Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {productsRows}
        </tbody>
      </table>
      <div>
        <span>
          Total({totalProductsCount}): <strong>{totalPrice}₽</strong>
        </span>
      </div>
      <div>
        <Button variant="dark"
          onClick={sendForm}>
          Check out
        </Button>
      </div>
    </div>
  );
}

function showCongrats(totalPrice) {
  return (
    <div>
      <h2>Thank you for the purchase!</h2>
      <span>The order cost is <strong>{totalPrice}₽</strong></span>
    </div>
  );
}

function getProducts(){
  return [
    { id: 100,
      title: "Iphone 200",
      price: 12000,
      rest: 10,
      current: 1
    },
    {
      id: 101,
      title: "Samsung S200",
      price: 22000,
      rest: 5,
      current: 1
    },
    {
      id: 102,
      title: "Poco X6",
      price: 2000,
      rest: 15,
      current: 2
    },
    {
      id: 103,
      title: "One Plus",
      price: 10000,
      rest: 2,
      current: 1
    },
    {
      id: 104,
      title: "Honor 2",
      price: 1000,
      rest: 15,
      current: 3
    }
  ];
}
