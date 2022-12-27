import React from "react";

const TextArea = ({ label, error, ...props }) => {
    return (
        <div className="flex flex-col text-gray-600 text-sm">
            <span className="text-sm font-medium mb-3">{label}</span>
            <textarea
                className={`border border-gray-300 focus:border-blue-500 focus:border-2 focus:outline-none p-3 rounded-sm`}
                {...props}
            ></textarea>
            <span className="text-xs font-medium text-red-500 pr-3">
                {error}
            </span>
        </div>
    );
};

export default TextArea;
