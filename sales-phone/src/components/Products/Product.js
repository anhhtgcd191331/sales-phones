import React from "react";

function Product() {
  return (
    <div className="hotsale-listproduct-product">
      <Link to={"/detail/" + product._id}>
        <img src={product.image}></img>
        <p className="hotsale-listproduct-product-name">{product.name}</p>
        <div className="price">
          <span className="price1">{formatPrice(product.salePrice)}đ</span>
          <span className="price2">{formatPrice(product.price)}đ</span>
        </div>
      </Link>
      {product.percentDiscount >= 5 ? (
        <div className="discount">
          <p>{product.percentDiscount}%</p>
        </div>
      ) : (
        ""
      )}
      <div className="buy">
        <Link
          to=""
          onClick={(e) => {
            AddProductToCart(product);
          }}
        >
          {" "}
          Mua Ngay
        </Link>
      </div>
    </div>
  );
}

export default Product;
