import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { SignoutUser } from "../../actions/UserAction";

function Navbar() {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    // await history.push("/search");
    // dispatch(searchProduct(search));
    setSearch("");
  };
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> CELLPHONES </Link>
          </span>
        </div>
        <div className="search-form">
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search for..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch
              className="icon-search"
              onClick={(e) => SearchProduct(e)}
            />
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active">
            <Link to="/"> Home Page </Link>
          </li>
          <li>
            <Link to="/product"> Products</Link>
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)}>
              <Link>
                {userInfo.name}
                <BiSolidDownArrow style={{ fontSize: "14px" }} />
              </Link>
              {showAccount2 ? (
                <div className="menu-drop">
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/myOrder">My Orders</Link>
                  <Link onClick={() => handleSignout()}>Logout</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link>
                Account
                <BiSolidDownArrow style={{ fontSize: "14px" }} />
              </Link>

              {showAccount ? (
                <div className="menu-drop">
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              <AiOutlineShoppingCart style={{ fontSize: "30px" }} />
              <span className="count">{amount}</span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
