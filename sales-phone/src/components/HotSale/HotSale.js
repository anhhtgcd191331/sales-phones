import React, { useEffect, useState } from "react";
import "./hotsale.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import ListPoducts from "../Products/ListPoducts";
import { handlePercentDiscount } from "../../unitls/index";

function HotSale({ type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(type);
  const [hotIphone, setHotIphone] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5555/api/products/${name}`
        );
        setHotIphone(data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <div className="hotsale">
      <h2>{name}</h2>
      {hotIphone ? (
        <ListPoducts HotSaleProducts={handlePercentDiscount(hotIphone)} />
      ) : (
        <div className="no-product">
          <img src="/images/noproduct.webp" />
          <span>No Product</span>
        </div>
      )}
    </div>
  );
}

export default HotSale;
