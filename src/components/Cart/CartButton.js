import { useSelector, useDispatch } from "react-redux";

import classes from "./CartButton.module.css";

import { openCartActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.shopingCart.totalQuantity);

  const toggleCartCardHandler = () => {
    dispatch(openCartActions.toggleCart());
  };

  return (
    <button onClick={toggleCartCardHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
