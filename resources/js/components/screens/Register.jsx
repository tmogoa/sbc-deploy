import React, { useState, useContext } from "react";
import { AppContext } from "../util/AppContext";
import TextInput from "../widgets/TextInput";
import Button from "../widgets/Button";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import colors from "../../../assets/colors";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const { setLoaderHidden, storeSession, user } = useContext(AppContext);
    const [name, setName] = useState("Tony Mogoa");
    const [email, setEmail] = useState("tony.mogoa@strathmore.edu");
    const [password, setPassword] = useState("12345678");
    const [confirm, setConfirm] = useState("12345678");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    return (
        <div className="w-full p-8 flex flex-col justify-center items-center bg-gray-100">
            <div className="w-4/12 p-6 border flex flex-col items-center shadow-sm rounded mb-6 bg-white">
                <span className="font-heading text-5xl mb-3">SBC</span>
                <span className="text-sm font-medium mb-6">Admin Register</span>

                <div className="mb-6 w-9/12">
                    <TextInput
                        placeholder="Fullname"
                        label="Fullname"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        error={nameError}
                    />
                </div>

                <div className="mb-6 w-9/12">
                    <TextInput
                        placeholder="Email address"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={emailError}
                    />
                </div>

                <div className="mb-8 w-9/12">
                    <TextInput
                        placeholder="New Password"
                        label="Choose a password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={passwordError}
                    />
                </div>

                <div className="mb-8 w-9/12">
                    <TextInput
                        placeholder="Confirm password"
                        label="Repeat password"
                        type="password"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}
                    />
                </div>

                <div className="mb-6 w-9/12">
                    <Button label="Register" onClick={register} />
                </div>
            </div>
            <div className="w-4/12 flex flex-row items-center justify-end border bg-gray-50 p-4 shadow">
                <div className="flex flex-row items-center p-2 gap-2 border border-gray-50 hover:border-gray-200 rounded text-gray-600">
                    <Link to="/adminlogin">Login</Link>
                    <BsArrowRight color={colors.black} size={16} />
                </div>
            </div>
        </div>
    );

    function register() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user?.token}` },
        };
        const params = new FormData();
        params.append("name", name);
        params.append("email", email);
        params.append("password", password);
        params.append("password_confirmation", confirm);
        axios
            .post("/api/register", params, config)
            .then((resp) => {
                setLoaderHidden(true);
                storeSession(resp.data);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                const { errors } = err.response.data;
                if (errors.email) setEmailError(errors.email);
                if (errors.name) setNameError(errors.name);
                if (errors.password) setPasswordError(errors.password);
                setLoaderHidden(true);
            });
    }
};

export default Register;
