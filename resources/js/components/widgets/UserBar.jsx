import React, { useContext, useState } from "react";
import { AppContext } from "../util/AppContext";
import { HiOutlineChevronDown } from "react-icons/hi";
import colors from "../../../assets/colors";
import { BsPerson } from "react-icons/bs";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserBar = () => {
    const navigate = useNavigate();
    const { user, deleteSession, setLoaderHidden } = useContext(AppContext);
    const [dropdownHidden, setDropdownHidden] = useState(true);

    document.addEventListener("click", () => {
        if (!dropdownHidden) {
            setDropdownHidden(true);
        }
    });

    if (user) {
        return (
            <div
                className="flex flex-row items-center text-gray-700 py-3 px-4 gap-3 border z-40 shadow rounded bg-white hover:bg-gray-100 cursor-pointer relative"
                onClick={toggleShow}
            >
                <BsPerson size={22} color={colors.black} />

                <div>
                    <span className="text-xs font-medium">
                        {user.user.name}
                    </span>
                </div>
                <div>
                    <HiOutlineChevronDown size={14} color={colors.black} />
                </div>
                <div
                    className={`absolute bg-white rounded shadow top-14 p-4 right-0 z-50 ${
                        dropdownHidden && "hidden"
                    }`}
                >
                    <Button label="Logout" onClick={logout} />
                </div>
            </div>
        );
    }

    return null;

    function toggleShow(e) {
        e.preventDefault();
        e.stopPropagation();
        setDropdownHidden((dropdownHidden) => !dropdownHidden);
    }

    function logout() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        axios
            .post("/api/logout", {}, config)
            .then((resp) => {
                deleteSession();
                setLoaderHidden(true);

                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
            });
    }
};

export default UserBar;
