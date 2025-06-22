import React, { Suspense, use } from "react";
import Banner from "./Banner";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
    </div>
  );
};

export default Home;
