import React from 'react';
import sampleImage from '../../assets/location-merchant.png'; 


const MerchantPriority = () => {
  return (
    <section data-aos="fade-zoom-in" className="p-16 bg-[#03373D]  bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat rounded-3xl mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">        
        
        {/* Text side */}
        <div className="md:w-1/2 p-8 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We offer the lowest delivery charge with the highest value along 
            with 100% safety of your product. Pathao courier delivers your 
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="btn btn-primary btn-lg rounded-full px-8">
              Learn More
            </button>
            <button className="btn btn-primary btn-lg rounded-full px-8">
              Get Started
            </button>
          </div>
        </div>

        {/* Image side */}
        <div className="md:w-1/2">
          <img 
            src={sampleImage} 
            alt="Merchant & Customer Satisfaction" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MerchantPriority;
