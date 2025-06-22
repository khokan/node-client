import React from "react";
import { motion } from "motion/react";
import team1 from "../../assets/team/team1.jpg";
import team2 from "../../assets/team/team2.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={banner1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={banner2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={banner3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
