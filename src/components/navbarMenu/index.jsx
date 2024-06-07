import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import * as styles from "./styles.module.css"
import { shop } from "../../stores/shop";


const Navbar = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  let itemsCountStr = shop.cartItemsCount > 1 ? "items" : "item"

  const isActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

  const goToShop = () => {
    navigate("/");
  }
  
  const goToCart = () => {
    navigate("/cart");
  }

  const goToOrder = () => {
    navigate("/orders/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Button
          className={ `navbar-brand navbar-link ${isActive('/')}` }
          variant="light"
          onClick={goToShop}
        >
          Shop
        </Button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <Button
            className={ `navbar-link ${isActive('/cart')}` }
            variant="light"
            onClick={goToCart}
          >
            Cart
            { shop.cartItemsCount > 0 ? ` (${shop.cartItemsCount} ${itemsCountStr})` : null }
          </Button>
          <Button
            className={ `navbar-link ${isActive('/orders')}` }
            variant="light"
            onClick={goToOrder}
          >
            My orders
          </Button>
          </div>
        </div>
      </div>
    </nav>
  )
});

export default Navbar;
