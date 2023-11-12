import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function VnPaySuccess() {
  const location = useLocation();

  useEffect(() => {
    const getResultVNPay = async () => {
      const query = location.search;
      const { data } = await axios.get(
        `http://localhost:5000/api/payment/vnpay_return${query}`
      );
    };

    getResultVNPay();
  }, []);
  return (
    <section id="order-success">
      <div className="order-success">
        <span>
          <AiOutlineCheck />
        </span>
        <p>Đặt hàng thành công</p>
        {/* <Link to="">OK</Link> */}
        <div className="links">
          <Link to="/myOrder">Xem lại đơn hàng</Link>
          <Link to="/">Trang chủ</Link>
        </div>
      </div>
    </section>
  );
}

export default VnPaySuccess;
