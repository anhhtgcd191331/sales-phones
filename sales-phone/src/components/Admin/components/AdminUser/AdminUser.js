import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../../actions/UserAction";
import ListUser from "./ListUser";
import "./adminuser.css";

function AdminUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div className="admin-user">
      <span>Users</span>
      {users ? <ListUser users={users} /> : <h2> Loading</h2>}
    </div>
  );
}

export default AdminUser;
