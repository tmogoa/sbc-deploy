import React from "react";
import ReactDOM from "react-dom";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import Home from "./screens/Home";
import About from "./screens/About";
import ContactUs from "./screens/ContactUs";
import Activities from "./screens/Activities";
import BoysCorner from "./screens/BoysCorner";
import PageWideSpinner from "./widgets/PageWideSpinner";
import { AppContextProvider } from "./util/AppContext";
import Toast from "./widgets/Toast";
import ScrollToTop from "./util/ScrollToTop";
import NewPost from "./screens/NewPost";
import ViewPost from "./screens/ViewPost";
import ViewActivity from "./screens/ViewActivity";

function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <PageWideSpinner />
                <Toast />
                <ScrollToTop />
                <Routes>
                    <Route path="/adminlogin" element={<Login />} />
                    <Route path="/adminregister" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/boys-corner" element={<BoysCorner />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route
                        path="/activities/:actId"
                        element={<ViewActivity />}
                    />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/newpost/:postId" element={<NewPost />} />
                    <Route
                        path="/boys-corner/post/:postId"
                        element={<ViewPost />}
                    />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
