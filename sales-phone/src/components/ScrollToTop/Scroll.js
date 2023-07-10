import React, { useEffect, useState } from "react";
import "./scroll.css";

function Scroll() {
  const [heightPage, setHeightPage] = useState(0);
  const handleScroll = () => {
    setHeightPage(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return <div></div>;
}

export default Scroll;
