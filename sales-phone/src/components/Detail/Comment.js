import { Col } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { commentProduct, getproductById } from "../../actions/product/ProductAction";
import AllComment from "./AllComment";

function Comment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const allComment = useSelector((state) => state.getProductById.product.comments);
  const { userInfo } = useSelector((state) => state.userSignin);

  const Comment = () => {
    if (userInfo) {
      const comment = {
        author: userInfo.name,
        isAdmin: userInfo.isAdmin,
        content: value,
        byUser: userInfo._id,
      };
      dispatch(commentProduct(id, comment));
      setValue("");
    } else alert("You have to login");
  };
  useEffect(() => {
    dispatch(getproductById(id));
  }, []);
  return (
    <div className="comment">
      <h3>Comment</h3>
      <Col span={18} align="start" style={{ alignItems: "center" }} xs={24} sm={24} md={18}>
        <div className="comment-area" style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/login.webp"></img>

          <textarea
            placeholder="Please leave your questions, CellphoneS will respond within 1 hour from 8:00 am - 10:00 pm every day."
            rows={10}
            cols={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-send">
          <button onClick={() => Comment()}>Send</button>
        </div>
      </Col>

      <AllComment allComment={allComment} />
    </div>
  );
}

export default Comment;
