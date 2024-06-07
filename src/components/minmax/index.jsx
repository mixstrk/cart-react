import React, { memo } from "react";
import PropTypes from "prop-types"
import AppLazyInput from "../inputs/lazy"
import * as styles from "./minmax.module.css"
import { updateCartItemQuantity } from "../../api/cart/order/item/updateItemQuantity";

const MinMax = memo(({ min, max, cnt, onChange, productId }) => {
  const decrease = () => set(cnt - 1);
  const increase = () => set(cnt + 1);

  const set = async (newCnt) => {
    let validCnt = Math.min(Math.max(newCnt, min), max);
    try {
      await updateCartItemQuantity(productId, validCnt);
      onChange(validCnt);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  }

  const handleChange = (e) => {
    let value = parseInt(e.target.value)

    set(isNaN(value) ? min : value)
  }

  return (
    <div className={styles.minmaxContainer}>
      <button onClick={ decrease }>-</button>
        <AppLazyInput
          nativeProps={{ type: "text", className: styles.input }}
          value={cnt}
          onChange={ handleChange }
        />
      <button onClick={ increase }>+</button>
    </div>
  )
});

MinMax.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  cnt: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

export default MinMax;
