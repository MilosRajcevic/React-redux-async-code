import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";

import { shopingCartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      shopingCartActions.addItem({
        id: props.item.id,
        price: props.item.price,
        title: props.item.name,
      })
    );
  };
  const removeFromCartHandler = () => {
    dispatch(shopingCartActions.removeItem(props.item.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.name}</h3>
        <div className={classes.price}>
          ${props.item.totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${props.item.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
