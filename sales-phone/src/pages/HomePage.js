import React from "react";
import { useSelector } from "react-redux";
import AppChat from "../components/AppChat/AppChat";
import Layout from "../components/Layout/Layout";
import Scroll from "../components/ScrollToTop/Scroll";
import SliderShow from "../components/Slider/SliderShow";

function HomePage() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <Layout>
        <SliderShow />
      </Layout>
      <Scroll />
      {userInfo && userInfo.isAdmin === false ? <AppChat /> : null}
    </div>
  );
}

export default HomePage;
