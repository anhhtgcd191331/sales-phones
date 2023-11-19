import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddToCart } from "../../actions/CartAction";
import { formatPrice } from "../../unitls";

function DetailInfo({ product }) {
  const dispatch = useDispatch();

  function handleAddProduct(product) {
    const action = AddToCart(product);
    dispatch(action);
  }
  return (
    <div className="detail-info-right">
      <div className="detail-info-right-price">
        <p className="price-box">
          <span className="saleprice">{formatPrice(product.salePrice)}</span>
          <span className="old-price">
            Listed price : <strong className="price">{formatPrice(product.price)}</strong>{" "}
          </span>
        </p>
        <p className="detail-info-sale">Products included in the WEEKEND HOT SALE program - Pay quickly!</p>
      </div>

      <div className="detail-info-right-buy">
        <div className="detail-info-right-buy-now">
          <Link to="/cart" onClick={() => handleAddProduct(product)}>
            <strong>BUY NOW</strong>
            <br></br>
            <span>(Deliver to your door or pick up at the store)</span>
          </Link>
        </div>
        <div className="detail-info-right-buy-installment">
          <a href="">
            <strong>0% INSTALLMENT</strong>
            <br></br>
            <span>(Review by phone)</span>
          </a>
          <a href="">
            <strong>PAYMENT VIA CARD</strong>
            <br></br>
            <span>(Visa, Master, JCB)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailInfo;
