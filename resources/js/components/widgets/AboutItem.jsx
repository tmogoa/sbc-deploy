import React from "react";

const AboutItem = ({ about }) => {
    return (
        <div className="flex flex-col lg:flex-row p-2 justify-between items-center gap-2 lg:gap-0">
            {/* Heading */}
            <div className="lg:w-1/2 font-heading text-3xl lg:text-4xl text-gray-700 p-2 lg:p-6">
                <div>
                    <div>{about.title}</div>
                    {/* <div className="w-10 h-1 bg-orange-400 mt-4"></div> */}
                </div>
            </div>
            {/* Explanation */}
            <div className="lg:w-1/2 text-gray-500 p-4 lg:p-6 text-lg bg-white rounded">
                {about.body}
            </div>
        </div>
    );
};

export default AboutItem;
