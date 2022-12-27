import React from "react";

const Modal = ({ children, hidden }) => {
    return (
        <div
            className={`fixed flex justify-center items-center z-40 bg-black bg-opacity-60 w-screen h-screen top-0 left-0 transform transition duration-500 ease-in ${
                hidden ? "scale-0" : "scale-100"
            }`}
        >
            {children}
        </div>
    );
};

export default Modal;
