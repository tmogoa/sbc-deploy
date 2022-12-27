import React from "react";
import Footer from "../widgets/Footer";
import Navbar from "../widgets/Navbar";
import { Helmet } from "react-helmet";

const ContactUs = () => {
    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <title>Contact Us | Sudek Boys Club</title>
                <meta
                    name="description"
                    content="This page shows the contact details for reaching Sudek Boys Club management."
                />
            </Helmet>
            <div className="flex flex-col h-64 lg:h-[32rem] w-full bg-[url('../assets/img/1.webp')] bg-cover">
                <Navbar />
                <div
                    className="flex-grow flex flex-row items-center p-10 gap-10 text-white bg-gray-800 bg-opacity-70 
        "
                >
                    <div className="font-heading text-4xl lg:text-7xl lg:w-6/12">
                        Contact Us
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-gray-100 p-6">
                <div className="mb-4 p-6">
                    <div className="font-heading text-gray-700 text-xl mb-2">
                        Address
                    </div>
                    <div className="text-gray-600">
                        Siwaka Estate, Ole Sangale Road, Madaraka, Nairobi
                    </div>
                </div>
                <div className="mb-4 p-6">
                    <div className="font-heading text-gray-700 text-xl mb-2">
                        Telephone
                    </div>
                    <div className="text-gray-600">+254 791 278088</div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUs;
