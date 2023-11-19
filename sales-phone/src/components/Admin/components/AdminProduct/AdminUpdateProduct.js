import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getproductById, removeProductById, saveProduct } from "../../../../actions/product/ProductAction";
import { getAllSelectList } from "../../../../actions/SelectListAction";

function AdminUpdateProduct() {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct);
  useEffect(() => {
    if (detailProduct?.image) {
      setImage(detailProduct.image);
    }
  }, [detailProduct]);
  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct ? activeTypeProduct : detailProduct.type);
    formData.append("image", image);
    formData.append("_id", id);

    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);
    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);

    try {
      await dispatch(saveProduct(formData));
      navigate("/admin/product");
    } catch {}
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };
  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <label>Name</label>
          <input {...register("name")} placeholder="Name" defaultValue={detailProduct.name}></input>
          <label>Amount</label>
          <input {...register("amount")} placeholder="Amount" type="number" defaultValue={detailProduct.amount}></input>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label>Price</label>
              <input
                {...register("price")}
                placeholder="Price"
                type="number"
                defaultValue={detailProduct.price}
              ></input>
            </div>
            <div>
              <label>Sale Price</label>
              <input
                {...register("salePrice")}
                placeholder="SalePrice"
                type="number"
                defaultValue={detailProduct.salePrice}
              ></input>
            </div>
          </div>
          <label>Brand</label>
          <div className="filter-menu-firm">{List ? List.map((item) => MenuFirmProduct(item)) : ""}</div>

          <label>Operation system</label>
          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select {...register(`${item.property}`)} defaultValue={detailProduct[`${item.property}`]}>
                    {item.options.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              ))
            : ""}

          <label>Image</label>
          <input type="file" {...register("image")} onChange={handleFileImageChange}></input>
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdateProduct;
