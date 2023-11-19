import React from "react";
import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
import { message } from "antd";
import { formatPrice } from "../../unitls";
import { AddToCart } from "../../actions/CartAction";
import { useDispatch } from "react-redux";

function Product({ product }) {
  const dispatch = useDispatch();

  const success = () => {
    message.success({
      content: "Add to cart successfully",
      duration: 1,
      className: "custom-class",
      style: {
        position: "absolute",
        right: "2rem",
        top: "2rem",
        margin: "1rem 0",
      },
    });
  };

  const AddProductToCart = async (product) => {
    const action = AddToCart(product);
    await dispatch(action);
    success();
  };
  return (
    <div className="hotsale-listproduct-product">
      <Link to={"/detail/" + product._id}>
        <img src={product.image}></img>
        <p className="hotsale-listproduct-product-name">{product.name}</p>
        <div className="price">
          <span className="price1">{formatPrice(product.salePrice)}</span>
          <span className="price2">{formatPrice(product.price)}</span>
        </div>
      </Link>
      {product.percentDiscount >= 2 ? (
        <div className="discount">
          <span className="discount-text">-{product.percentDiscount}%</span>
        </div>
      ) : null}
      <div className="buy">
        <Link
          to=""
          onClick={(e) => {
            AddProductToCart(product);
          }}
        >
          BUY NOW
        </Link>
      </div>
    </div>
  );
}

export default Product;
