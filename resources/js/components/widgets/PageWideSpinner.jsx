import React, { useContext } from "react";
import { AppContext } from "../util/AppContext";
import Spinner from "./Spinner";

const PageWideSpinner = () => {
    const { loaderHidden } = useContext(AppContext);
    return (
        <div
            className={`fixed flex justify-center items-center z-50 bg-black bg-opacity-60 w-full h-screen ${
                loaderHidden && "hidden"
            }`}
        >
            <Spinner size={50} style="text-white" />
        </div>
    );
};

export default PageWideSpinner;
