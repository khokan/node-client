import React from "react";
import servicesData from "../../public/data/services.json";

// Import icons
import {
  FaTruck,
  FaGlobe,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
} from "react-icons/fa";

const iconList = [
  FaTruck,
  FaGlobe,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
];
import SectionCard from "./SectionCard";

const Services = () => {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-5">Our Services</h2>
          <h3 className="text-lg mb-5">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            return (
              <SectionCard
                key={index}
                title={service.title}
                description={service.description}
                Icon={iconList[index]} // Bind by index
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
