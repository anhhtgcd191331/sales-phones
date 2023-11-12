import React from "react";
import User from "./User";

function ListUser({ users }) {
  return (
    <div className="admin-user-list">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
          {users.map((item, index) => (
            <User user={item} number={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
