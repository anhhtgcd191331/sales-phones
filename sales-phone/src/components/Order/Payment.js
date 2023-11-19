import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/OrderAction";
import VnPay from "./VnPay";

function Payment({ isVerified }) {
  const dispatch = useDispatch();
  // const [sdkReady, setSdkReady] = useState(false);
  const [choosePay, setChoosePay] = useState({
    payLater: false,
    payOnline: false,
  });

  const { order } = useSelector((state) => state.orderInfo);

  const payLater = () => {
    if (isVerified) setChoosePay({ payOnline: false, payLater: true });
  };

  const payOnline = () => {
    if (isVerified) setChoosePay({ payLater: false, payOnline: true });
  };

  // const successPaymentHandler = async (paymentResult) => {
  //   const OrderPaid = {
  //     ...order,
  //     status: "pendding",
  //     paymentMethod: "payOnline",
  //     paymentResult: { ...paymentResult },
  //   };
  //   await dispatch(createOrder(OrderPaid));
  //   // history.push("/orderSuccess");
  //   window.location.href = "http://localhost:3000/orderSuccess";
  // };

  const SendOrderPayLater = async () => {
    const OrderPaid = {
      ...order,
      status: "pendding",
      paymentMethod: "payLater",
    };

    await dispatch(createOrder(OrderPaid));
    // history.push("/orderSuccess");
    window.location.href = "http://localhost:3000/orderSuccess";
  };

  // useEffect(() => {
  //   const addPayPalScript = async () => {
  //     const { data } = await axios.get("http://localhost:5000/api/config/paypal");
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //     script.async = true;
  //     script.onload = () => {
  //       setSdkReady(true);
  //     };
  //     document.body.appendChild(script);

  //     addPayPalScript();
  //   };
  // }, []);
  return (
    <div className="choose-pay">
      <h4>SELECT A PAYMENT METHOD</h4>
      <div className="choose">
        <button
          type="submit"
          className={choosePay.payLater ? "active" : ""}
          onClick={() => payLater()}
        >
          Payment on delivery
        </button>
        <button
          type="submit"
          className={choosePay.payOnline ? "active" : ""}
          onClick={() => payOnline()}
        >
          Online Payment
        </button>
      </div>
      {choosePay.payLater ? (
        <div className="customer-order">
          <button onClick={SendOrderPayLater}>Order</button>
        </div>
      ) : null}
      {choosePay.payOnline ? (
        <button type="submit" className="paypal">
          <VnPay />
          {/* <PayPalButton
            className="paypal-btn"
            style={{ color: "white", marginTop: "1rem" }}
            amount={1}
            onSuccess={successPaymentHandler}
          /> */}
        </button>
      ) : null}
    </div>
  );
}

export default Payment;
