import Slider from "react-slick";
import sliderImg from "../../assets/img/slider1.jpg"
import sliderImg2 from "../../assets/img/slider2.png"
import { Link } from "react-router-dom";
import { NextArrow, PrevArrow } from "../../utils/Arrows";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderShop = () => {

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
      };
      return (
        <div className="slider">
          <Slider {...settings}>
                <div className="slider-item">
                    <Link>
                        <img src={sliderImg} alt="" />
                    </Link>
                </div>
                <div className="slider-item">
                    <Link>
                        <img src={sliderImg2} alt="" />
                    </Link>
                </div>
          </Slider>
        </div>
      )
}

export default SliderShop;