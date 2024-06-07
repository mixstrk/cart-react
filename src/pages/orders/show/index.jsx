import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as styles from "./styles.module.css";
import { fetchOrder } from "../../../api/orders/show"

const OrderShow = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = parseInt(id);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const fetchedOrder = await fetchOrder(orderId);
        setOrder(fetchedOrder);
        setProducts(fetchedOrder.products);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const backToOrders = () => {
    navigate("/orders");
  };

  const productsCards = products.map((product) => (
    <div key={product.id} className="col-sm-3">      
      <div className={"card " + styles.divCard}>
        <div className="card-body">
          <div className="card-body">
            <h5 className="card-title text-center">{product.title}</h5>
            <p className="card-text"><b>Item price:</b> {product.price}</p>
            <p className="card-text"><b>Quantity:</b> {product.quantity}</p>
            <p className="card-text"><b>Subtotal price:</b> {product.subtotal_price}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      {order && (
        <div className="container">
          <div className={styles.main}>
            <h2 className={styles.h2}>Order #{order.id}</h2>

            <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  Name
                </td>
                <td>
                  { order.firstname } { order.lastname }
                </td>
              </tr>

              <tr>
                <td>
                  Email
                </td>
                <td>
                  { order.email}
                </td>
              </tr>

              <tr>
                <td>
                  Phone
                </td>
                <td>
                  { order.phone}
                </td>
              </tr>

              <tr>
                <td>
                  Total products count
                </td>
                <td>{order.products_count} items</td>
              </tr>

              <tr>
                <td>
                  Total price
                </td>
                <td>{order.price}₽</td>
              </tr>
              
              <tr>
                <td>
                  Order created
                </td>
                <td>{order.created_date} {order.created_time}</td>
              </tr>
            </tbody>
          </table>

            <div className="row">
              {productsCards}
            </div>

            <Button variant="dark" onClick={backToOrders}>
              Back to orders list
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default OrderShow;
