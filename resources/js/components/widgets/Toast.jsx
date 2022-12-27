import React, { useContext, useEffect } from "react";
import { AppContext } from "../util/AppContext";
import { IoCloseOutline } from "react-icons/io5";
import colors from "../../../assets/colors";

const Toast = () => {
    const { toastHidden, toastMsg, setToastHidden } = useContext(AppContext);

    useEffect(() => {
        if (!toastHidden) {
            setTimeout(() => {
                setToastHidden(true);
            }, 3 * 1000);
        }
    }, [toastHidden]);

    return (
        <div
            className={`fixed top-20 z-50 p-4 bg-orange-500 flex flex-row items-center justify-between gap-2 shadow-lg right-10 w-2/12 text-white font-medium font-sm rounded ${
                toastHidden && "hidden"
            }`}
        >
            <span>{toastMsg}</span>
            <span
                className={`p-1 rounded-full border`}
                onClick={() => setToastHidden(true)}
            >
                <IoCloseOutline size={20} color={colors.white} />
            </span>
        </div>
    );
};

export default Toast;
