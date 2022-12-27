import React, { useState } from "react";
import AboutItem from "../widgets/AboutItem";
import Footer from "../widgets/Footer";
import Navbar from "../widgets/Navbar";
import { Helmet } from "react-helmet";

const About = () => {
    const [abouts, setAbouts] = useState([
        {
            title: "Mission",
            body: "SBC aims to provide cultural, academic, and spiritual formation in collaboration with their parents, especially the fathers.",
        },
        {
            title: "Vision",
            body: "To help the parents form their boys into young men of character.",
        },
        {
            title: "About Us",
            body: "Sudek Boys Club (SBC) is a Family Club run by a group of Nairobi parents whose aim is to help their sons grow into young men of character through constructive use of their free time on weekends and school holidays.",
        },
        {
            title: "Club Membership",
            body: "The Club is open to boys 7-13 years old (the boy should be turning at least 7 years old in the year he joins the club). Its Saturday activities run from 8.45 am to 2.30 pm. Holiday activities will be indicated in the respective holiday planner and will be sent out to members and their parents.",
        },
        {
            title: "To become a member",
            body: (
                <>
                    <div className="mb-2">
                        a) The parents need to register by sending an email to
                        sudek.boysclub@gmail.com and then fill in the
                        registration form that will be sent by a representative
                        of the Club Coordinators.
                    </div>
                    <div>
                        b) The boy attends activities for at least one Saturday,
                        parents can then decide with the boy whether SBC is
                        indeed what they are after and petition for membership.
                    </div>
                </>
            ),
        },
        {
            title: "Club Membership Fees",
            body: " This will be communicated in due course. In the meantime, we will be charging the boys for each activity.",
        },
    ]);
    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <title>About Sudek Boys Club</title>
                <meta
                    name="description"
                    content="SBC aims to provide cultural, academic, and spiritual formation in collaboration with their parents, especially the fathers."
                />
            </Helmet>
            <div className="flex lg:h-[32rem] flex-col w-full bg-[url('../assets/img/1.webp')] bg-cover">
                <Navbar />
                <div
                    className="flex-grow flex flex-col lg:flex-row gap-4 lg:justify-around items-center p-10 lg:gap-10 text-white bg-gray-800 bg-opacity-70 
                "
                >
                    <div className="font-heading text-4xl lg:text-7xl lg:w-6/12 mb-4 lg:mb-0">
                        About Us
                    </div>
                    <div className="lg:w-6/12 p-2 lg:p-6 flex justify-end flex-col h-full">
                        <div className="w-10 h-1 bg-orange-400 mb-4"></div>
                        <div className="text-gray-200 font-heading font-normal">
                            Sudek Boys Club (SBC) is a Family Club run by a
                            group of Nairobi parents whose aim is to help their
                            sons grow into young men of character through
                            constructive use of their free time on weekends and
                            school holidays.
                        </div>
                    </div>
                </div>
            </div>
            {/* More */}
            <div className="flex flex-col p-2 lg:p-12 lg:gap-20  bg-gray-100">
                {abouts.map((about, index) => (
                    <AboutItem key={index} about={about} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default About;
