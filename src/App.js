import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { openCartActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggleCart = useSelector((state) => state.openCart.isOpen);
  const cart = useSelector((state) => state.shopingCart);
  const notification = useSelector((state) => state.openCart.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        openCartActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-http-6bf30-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      dispatch(
        openCartActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart data successufully!",
        })
      );

      const data = await response.json();
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        openCartActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
