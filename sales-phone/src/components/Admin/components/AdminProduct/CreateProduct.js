import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";
import { editCurrentPage, saveProduct } from "../../../../actions/product/ProductAction";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { message } from "antd";

function CreateProduct() {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector((state) => state.selectList.List);
  const { pages } = useSelector((state) => state.allProduct.product);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    if (!data.name) {
      message.error({
        content: "Name is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!data.amount) {
      message.error({
        content: "Amount is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!data.price) {
      message.error({
        content: "Price is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!data.salePrice) {
      message.error({
        content: "Sale price is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!data.os || data.os === "System") {
      message.error({
        content: "Operating system is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!image) {
      message.error({
        content: "Image is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct);
    formData.append("image", image);

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
      await dispatch(editCurrentPage(pages));
      navigate("/admin/product");
      message.success({
        content: "Add product successfully!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
    } catch (e) {
      console.log(e);
      message.error({
        content: e.message,
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
    }
  };

  const MenuFirmProduct = (item, key) => (
    <div
      key={key}
      className={activeTypeProduct === item.name ? `filter-menu-firm-item active` : "filter-menu-firm-item"}
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
      <span>Create Product</span>
      <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="input-mid">
            <label>Name</label>
            <input {...register("name")} placeholder="Name"></input>
          </div>
          <div className="input-mid">
            <label>Amount</label>
            <input {...register("amount")} placeholder="Amount" type="number"></input>
          </div>
        </div>
        <div className="row"></div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="input-mid">
            <label>Price</label>
            <input {...register("price")} placeholder="Price" type="number"></input>
          </div>
          <div className="input-mid">
            <label>Sale price</label>
            <input {...register("salePrice")} placeholder="SalePrice" type="number"></input>
          </div>
        </div>
        <div>
          <div>
            <label>Operating system</label>
            {SelectList && SelectList.length > 0
              ? SelectList.map((item, i) => (
                  <div key={i} className="select-type">
                    <select {...register(`${item.property}`)}>
                      <option>{item.name}</option>
                      {item.options.map((x, y) => (
                        <option key={y} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              : ""}
          </div>
          <div>
            <label>Image</label>
            <input type="file" {...register("image")} onChange={handleFileImageChange} />
          </div>
        </div>
        <label>Brand</label>
        <div className="filter-menu-firm">{List ? List.map((item, key) => MenuFirmProduct(item, key)) : ""}</div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
