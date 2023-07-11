import React, { useEffect } from "react";
// import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../actions/product/ProductAction";
import { handlePercentDiscount } from "../../unitls";
import FilterProduct from "./FilterProduct/FilterProduct";
import ListPoducts from "./ListPoducts";
import SortByPrice from "./SortByPrice/SortByPrice";

function AllProduct() {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.allProduct.product);

  useEffect(() => {
    dispatch(getAllProduct());

    return () => {
      return [];
    };
  }, [dispatch]);
  return (
    <section id="hotsale iphone">
      <div className="hotsale">
        <FilterProduct />
        <SortByPrice />
        {product && product.length > 0 ? (
          <ListPoducts HotSaleProducts={handlePercentDiscount(product)} />
        ) : (
          <span>Không có sản phẩm</span>
        )}
      </div>
    </section>
  );
}

export default AllProduct;
