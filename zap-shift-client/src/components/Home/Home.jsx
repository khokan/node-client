import React, { Suspense, use } from "react";
import Banner from "./Banner";
import Services from "../Services/Services";
import MerchantPriority from "../Services/MerchantPriority";
import Logo from "../Shared/Logo";
import LogoSliderSection from "./LogoSliderSection";

const Home = () => {
  return (
    <div>
      {/* <Banner />
      // <Services /> */}
      <LogoSliderSection/>
      <MerchantPriority />
    </div>
  );
};

export default Home;
