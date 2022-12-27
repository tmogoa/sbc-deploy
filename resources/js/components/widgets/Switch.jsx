import React from "react";

const Switch = ({ enabled, setEnabled }) => {
    return (
        <div
            className={`p-1 rounded-3xl border flex w-24 ${
                enabled ? "justify-end bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => setEnabled((enabled) => !enabled)}
        >
            <div
                className={`w-8 h-8 rounded-full ${
                    enabled ? "bg-white" : "bg-gray-400"
                }`}
            ></div>
        </div>
    );
};

export default Switch;
