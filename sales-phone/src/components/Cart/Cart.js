import React from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { formatPrice } from "../../unitls";
import ListProductCart from "./ListProductCart";

function Cart(props) {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  var userInfo = useSelector((state) => state.userSignin.userInfo);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.salePrice,
    0
  );

  const Order = () => {
    if (userInfo) {
      window.location.href = "http://localhost:3000/order";
    } else {
      alert("ban can dang nhap");
      //   history.push("/login");
    }
  };
  return (
    <section id="shopping-cart">
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <Link to="/" className="back">
            {/* <BsChevronDoubleLeft></BsChevronDoubleLeft> */}
            Tiếp tục mua hàng
          </Link>
          <h2 className="shopping-cart-title">Giỏ hàng</h2>
        </div>

        {cartItems ? <ListProductCart products={cartItems} /> : ""}

        <div className="total-price">
          <span className="left">Tổng tiền</span>
          <span className="right">{formatPrice(totalPrice)}</span>
        </div>
        {totalPrice <= 0 ? (
          ""
        ) : (
          <div className="order">
            <Link onClick={() => Order()}> Đặt Hàng </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
