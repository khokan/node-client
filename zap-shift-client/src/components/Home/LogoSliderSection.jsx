import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from '../../assets/brands/amazon.png';
import logo2 from '../../assets/brands/amazon_vector.png';
import logo3 from '../../assets/brands/casio.png';
// import logo1 from '../../assets/brands/amazon.png';
// import logo1 from '../../assets/brands/amazon.png';
// import logo1 from '../../assets/brands/amazon.png';


const logos = [logo1, logo2, logo3];

const LogoSliderSection = () => {
  return (
    <section className="bg-white py-6">
      <div className="overflow-hidden">
        <Marquee
          direction="left"
          speed={40}
          pauseOnHover={true}
          gradient={false}
        >
          <div className="flex items-center gap-[100px] h-[24px]">
            {logos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Company Logo ${idx}`}
                className="h-full object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default LogoSliderSection;
