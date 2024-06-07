import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as styles from "./styles.module.css"
import { ordersIndex } from "../../stores/orders";


const Orders = observer(() => {
  let orders = ordersIndex.orders;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await ordersIndex.fetchOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const goToOrder = (orderId) => {
    navigate("/orders/" + orderId);
  }

  const orderCards = orders.map((order, i) => (
    <div key={order.id} className="col-sm-3">      
      <div className={"card " + styles.divCard}>
        <div className="card-body">
          <div className="card-body">
            <p className="card-text text-center"><b>Order #{order.id}</b></p>
            <p className="card-text"><b>Price:</b> {order.price} ₽</p>
            <p className="card-text"><b>Items count:</b> {order.products_count}</p>
            <p className="card-text"><b>Order created:</b></p>
            <p className="card-text">{order.created_date} {order.created_time}</p>
            <Button variant="dark" onClick={() => goToOrder(order.id)}>
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
        <h2 className={styles.h2}>Orders</h2>
        <div className="row">
          {orderCards}
        </div>
      </div>
      <hr />
    </div>
  );
}) 

export default Orders;
