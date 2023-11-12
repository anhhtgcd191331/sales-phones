import React, { useEffect } from "react";
import { AiOutlineAppstoreAdd, AiOutlineTool } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./adminproduct.css";
import { paginationProduct } from "../../../../actions/product/ProductAction";
import ListProduct from "./ListProduct";

function AdminProduct() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { products } = useSelector((state) => state.allProduct.product);
  useEffect(() => {
    dispatch(paginationProduct(currentPage));
  }, [dispatch, currentPage]);
  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/product/create" className="add-product">
          <AiOutlineAppstoreAdd />
        </Link>
        <Link to="/admin/product/update/info" className="add-product">
          <AiOutlineTool />
        </Link>
      </div>

      {products ? <ListProduct listProducts={products} /> : "Loading"}
    </div>
  );
}

export default AdminProduct;
