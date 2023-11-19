import React from "react";
import Product from "./Product";

function ListPoducts(props) {
  const { HotSaleProducts } = props;
  return (
    <>
      <div className="hotsale-listproduct">
        {HotSaleProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </>
  );
}

export default ListPoducts;
