import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [toastHidden, setToastHidden] = useState(true);
    const [toastMsg, setToastMsg] = useState("");

    //functions
    function storeSession(user) {
        localStorage.setItem("@user", JSON.stringify(user));
        setUser(user);
    }

    function deleteSession() {
        localStorage.removeItem("@user");
        setUser(null);
    }

    const context = {
        loaderHidden,
        setLoaderHidden,
        user,
        storeSession,
        deleteSession,
        toastHidden,
        setToastHidden,
        toastMsg,
        setToastMsg,
    };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

function getUser() {
    return JSON.parse(localStorage.getItem("@user"));
}
