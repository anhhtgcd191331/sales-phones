import React from "react";
import "./dashboard.css";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineBell,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineDollarCircle,
  AiOutlineFileText,
} from "react-icons/ai";
import ChartDashboard from "./Chart";

function Dashboard() {
  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          {/* <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <BsSearch />
              </span>
            </form>
          </div> */}
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              <img
                src="https://res.cloudinary.com/hoangtienanh/image/upload/v1690183963/516826a0-9f7a-483f-a651-e2fc6bbc3eff_k3meyx.jpg"
                alt=""
              ></img>
              <span>Hoang Tien Anh</span>
            </li>
            <li className="dashboard-top-content-bell">
              <AiOutlineBell />
            </li>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineShopping />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1666</span>
                  <span className="title">Total Sales</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineShoppingCart />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">25</span>
                  <span className="title">Daily Visits</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineDollarCircle />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">2000</span>
                  <span className="title">Total Income</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineFileText />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1208</span>
                  <span className="title">Total Orders</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashboard />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
