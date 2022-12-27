import React from "react";

const RadioButton = ({ label, value, onChange }) => {
    return (
        <label className="text-sm font-medium mb-2">
            <input
                type="radio"
                checked={value}
                onChange={onChange}
                className="mr-1"
            />
            {label}
        </label>
    );
};

export default RadioButton;
