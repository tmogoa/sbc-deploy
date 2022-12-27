import React from "react";

const Fab = ({ icon, onClick }) => {
    return (
        <div
            className="fixed bottom-10 right-10 p-2 rounded-full shadow-lg bg-orange-500 z-40 hover:bg-orange-600 active:bg-orange-700"
            onClick={onClick}
        >
            {icon}
        </div>
    );
};

export default Fab;
