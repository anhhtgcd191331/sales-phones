import { Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCurrentPage,
  paginationProduct,
} from "../../../../actions/product/ProductAction";
import Product from "./Product";

function ListProduct({ listProducts }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { pages } = useSelector((state) => state.allProduct.product);

  const HandleChangePage = async (number) => {
    await dispatch(paginationProduct(number));
    dispatch(editCurrentPage(number));
  };
  return (
    <div className="admin-product-list">
      <table>
        <tbody>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
          {listProducts
            ? listProducts.map((item, index) => (
                <Product
                  product={item}
                  key={item._id}
                  update={item._id}
                  number={index}
                />
              ))
            : ""}
        </tbody>
      </table>

      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={pages * 10}
          onChange={HandleChangePage}
        />
      </div>
    </div>
  );
}

export default ListProduct;
