import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
import "./slider.css";
// import "slick-carousel/slick/slick-theme.css";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className}`} style={{ display: "none" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className}`} style={{ display: "none" }} onClick={onClick} />;
}

function SliderShow(props) {
  let { slider, slider1, slider2 } = props;
  const [nav, setNav] = useState({ nav1: null, nav2: null });

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const next = () => {
    slider1.slickNext();
  };
  const previous = () => {
    slider2.slickNext();
  };
  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2} ref={(slider) => (slider1 = slider)} {...settings}>
              <div className="img-item-slider" key={1}>
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/iphone-15-11-2023.jpg"
                  alt=""
                />
              </div>
              <div className="img-item-slider" key={2}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/1380-600-max.png" alt="" />
              </div>
              <div className="img-item-slider" key={3}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/ip11-tg-690-300-max.png" alt="" />
              </div>
              <div className="img-item-slider" key={4}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/dd690x300_XR.png" alt="" />
              </div>
              <div className="img-item-slider" key={5}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/se-aw-690-300-max.png" alt=""></img>
              </div>
            </Slider>
            <div className="carousel-left-move" onClick={() => previous()}>
              <div className="prev">
                <HiOutlineChevronLeft />
              </div>
              <div className="next" onClick={() => next()}>
                <HiOutlineChevronRight />
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider
              asNavFor={nav.nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <div className="des-item-slider">
                IPHONE 14 PRO MAX <br></br> Gía siêu ưu đãi
              </div>
              <div className="des-item-slider">
                NOTE 20 ULTRA 5G <br></br> Hotsale giảm sập sàn
              </div>
              <div className="des-item-slider">
                XR CHÍNH HÃNG <br></br> Giá mới cực tốt
              </div>
              <div className="des-item-slider">
                APPLE WATCH SE <br></br> Mua đi chờ chi
              </div>
              <div className="des-item-slider">
                ĐẠI TIỆC ÂM THANH <br></br> Loa sale bung nóc
              </div>
            </Slider>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="/images/qc1.webp" alt="" />
          </div>
          <div className="carousel-right-item">
            <img src="/images/qc2.webp" alt="" />
          </div>
          <div className="carousel-right-item">
            <img src="/images/qc3.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SliderShow;
