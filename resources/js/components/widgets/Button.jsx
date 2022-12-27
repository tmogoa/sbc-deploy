import React from "react";

const Button = ({ label, onClick, icon }) => {
    return (
        <div
            onClick={onClick}
            className="px-10 py-3 shadow-sm rounded font-medium flex justify-center items-center bg-orange-400 text-white hover:bg-orange-500 active:bg-orange-600 cursor-pointer"
        >
            <span>{label}</span>
            <span className="ml-4">{icon}</span>
        </div>
    );
};

export default Button;
