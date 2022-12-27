import React, { useState, useContext } from "react";
import { AppContext } from "../util/AppContext";
import TextInput from "../widgets/TextInput";
import Button from "../widgets/Button";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import colors from "../../../assets/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const { setLoaderHidden, storeSession } = useContext(AppContext);
    const [email, setEmail] = useState("tony.mogoa@strathmore.edu");
    const [password, setPassword] = useState("12345678");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(null);
    return (
        <div className="w-full h-screen flex flex-col lg:justify-center lg:items-center bg-gray-100">
            <div className="w-full flex-grow lg:w-4/12 p-4 lg:p-6 border flex flex-col justify-center items-center shadow-sm rounded lg:mb-6 bg-white">
                <span className="font-heading text-5xl mb-3">SBC</span>
                <span className="text-sm font-medium mb-6">Admin Login</span>
                <div
                    className={`text-red-500 text-sm flex flex-row items-center mb-3 p-4 border w-9/12 gap-4 ${
                        !error && "hidden"
                    }`}
                >
                    <div>
                        <MdErrorOutline size={30} color={colors.red} />
                    </div>
                    <div>{error}</div>
                </div>
                <div className="mb-6 lg:w-9/12">
                    <TextInput
                        placeholder="Email address"
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={emailError}
                    />
                </div>

                <div className="mb-8 lg:w-9/12">
                    <TextInput
                        placeholder="Enter password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={passwordError}
                    />
                </div>

                <div className="mb-6 lg:w-9/12">
                    <Button label="Login" onClick={login} />
                </div>
            </div>
            <div className="w-full lg:w-4/12 flex flex-row items-center justify-end border bg-gray-50 p-4 shadow">
                <div className="flex flex-row items-center p-2 gap-2 border border-gray-50 hover:border-gray-200 rounded text-gray-600">
                    <Link to="/adminregister">Register</Link>
                    <BsArrowRight color={colors.black} size={16} />
                </div>
            </div>
        </div>
    );

    function login() {
        setLoaderHidden(false);
        const params = new FormData();
        params.append("email", email);
        params.append("password", password);

        axios
            .post("/api/login", params)
            .then((resp) => {
                setLoaderHidden(true);
                storeSession(resp.data);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                setError(err.response.data.msg);
                const { errors } = err.response.data;
                if (errors) {
                    if (errors.email) setEmailError(errors.email);
                    if (errors.password) setPasswordError(errors.password);
                }
                setLoaderHidden(true);
            });
    }
};

export default Login;
