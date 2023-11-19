import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductByPrice } from "../../../actions/product/ProductAction";
import FilterMenu from "../FilterMenu/FilterMenu";
import Slider from "@mui/material/Slider";
import "../FilterProduct/index.css";
function FilterProduct() {
  const dispatch = useDispatch();
  // const [startPrice, setStartPrice] = useState(0);
  // const [endPrice, setEndPrice] = useState(0);
  const [values, setValues] = useState([0, 100000000]);

  const FilterProductByPrice = (values) => {
    let startPrice = parseInt(values?.[0]) || 0;
    let endPrice = parseInt(values?.[1]) || 100000000;
    dispatch(filterProductByPrice(startPrice, endPrice));
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(amount);
  };

  return (
    <div className="filter">
      <FilterMenu />
      <div className="options-price">
        <h3>Filter by price</h3>
        <div className="list-max-min">
          <div>{formatCurrency(values?.[0])}</div>
          <div>{formatCurrency(values?.[1])}</div>
        </div>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={values}
          onChange={(_, value) => {
            setValues(value);
          }}
          min={0}
          max={100000000}
          sx={{
            width: "100%",
            margin: "0 auto",
            color: "rgb(215, 16, 8)",
          }}
        />
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 10 }}>
          <button onClick={() => FilterProductByPrice(values)} className="btn-search">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterProduct;
