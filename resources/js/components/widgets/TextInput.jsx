import React from "react";

const TextInput = ({ placeholder, label, type, error, required, ...props }) => {
    return (
        <div className="flex flex-col text-gray-600 text-sm">
            <span className={`text-sm font-medium mb-3`}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>
            <input
                type={type}
                className="border border-gray-300 px-5 py-3 focus:outline-none rounded-full focus:border-blue-500 focus:border-2"
                placeholder={placeholder}
                {...props}
            />
            <span className="text-xs font-medium text-red-500 pr-3">
                {error}
            </span>
        </div>
    );
};

export default TextInput;
