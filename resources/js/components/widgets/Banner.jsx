import React from "react";

const Banner = ({ label }) => {
    return (
        <div className="text-gray-600 font-heading text-4xl lg:text-5xl lg:p-10 p-6">
            {label}
        </div>
    );
};

export default Banner;
