import React from "react";
import "./orderadmin.css";
import AdminOrderAll from "./AdminOrderAll";
import AdminOrderMenu from "./AdminOrderMenu";

function AdminOrder() {
  return (
    <div>
      <AdminOrderMenu />
      <AdminOrderAll />
    </div>
  );
}

export default AdminOrder;
