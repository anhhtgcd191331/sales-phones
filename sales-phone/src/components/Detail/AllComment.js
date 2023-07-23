import { Col } from "antd";
import React, { useState } from "react";
import { AiFillLock, AiFillPushpin, AiOutlineWechat } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  pinCommentProduct,
  repCommentProduct,
} from "../../actions/product/ProductAction";
import { getFirstCharacterUser } from "../../unitls";
import AllRepComment from "./AllRepComment";

function AllComment({ allComment }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const { userInfo } = useSelector((state) => state.userSignin);
  const [repValue, setRepValue] = useState("");
  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };
  const handleRepComment = (value) => {
    if (userInfo) {
      const comment = {
        idComment: repCmt.key,
        isAdmin: userInfo.isAdmin,
        content: repValue,
        nameUser: userInfo.name,
      };
      dispatch(repCommentProduct(id, comment));
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else alert("Đăng nhập đi bạn eiii");
  };

  const PinComment = (comment) => {
    const UpdateComment = { ...comment, status: "pin" };
    dispatch(pinCommentProduct(id, UpdateComment));
  };

  return (
    <div class="all-comment">
      {allComment.map((comment) => (
        <>
          <Col span={18} style={{ marginTop: "1rem" }} xs={24} sm={24} md={18}>
            <div className="all-comment-info">
              <div style={{ display: "flex" }}>
                {comment.isAdmin ? (
                  <div className="all-comment-info-name admin">
                    <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png"></img>
                  </div>
                ) : (
                  <div className="all-comment-info-name">
                    {getFirstCharacterUser(comment.author)}
                  </div>
                )}
                {comment.isAdmin ? (
                  <strong>
                    {comment.author} <span>QTV</span>
                  </strong>
                ) : (
                  <strong>{comment.author}</strong>
                )}
              </div>

              {userInfo.isAdmin ? (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                    onClick={() => PinComment(comment)}
                  >
                    {comment.status === "pin" ? (
                      <AiFillLock />
                    ) : (
                      <AiFillPushpin />
                    )}
                  </div>
                </div>
              ) : (
                <div className="comment-status">
                  <div className="comment-status-pin">
                    {comment.status === "pin" ? <AiFillPushpin /> : ""}
                  </div>
                </div>
              )}
            </div>
            <div className="all-comment-content">{comment.content}</div>
            <div className="all-comment-more">
              <a
                className="all-comment-more-chat"
                onClick={() => showRepComment(comment._id)}
              >
                <AiOutlineWechat style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
              </a>
            </div>
            {comment.replies.length > 0 ? (
              <AllRepComment
                allrepcomment={comment.replies}
                showRepComment={showRepComment}
                id={comment._id}
              />
            ) : (
              ""
            )}
          </Col>
          {repCmt.status === true && repCmt.key === comment._id ? (
            <Col
              span={18}
              xs={24}
              md={18}
              align="start"
              style={{
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                className="comment-area"
                style={{ display: "flex", alignItems: "center" }}
              >
                <textarea
                  placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
                  rows={10}
                  cols={3}
                  vaule={repValue}
                  onChange={(e) => setRepValue(e.target.value)}
                ></textarea>
              </div>

              <div className="comment-send">
                <button onClick={() => handleRepComment()}>Trả lời</button>
              </div>
            </Col>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}

export default AllComment;
