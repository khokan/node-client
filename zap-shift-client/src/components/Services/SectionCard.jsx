import React from "react";

const SectionCard = ({ title, description, Icon }) => {
  return (
    <div className="card shadow-xl bg-white p-6 hover:shadow-2xl transition">
      <div className="flex flex-col items-center text-center">
        {Icon && <Icon className="text-4xl text-primary mb-4" />}
        <h3 className="text-2xl text-primary font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default SectionCard;
