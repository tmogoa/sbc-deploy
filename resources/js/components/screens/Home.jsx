import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../widgets/Button";
import Navbar from "../widgets/Navbar";
import { BsArrowRight } from "react-icons/bs";
import colors from "../../../assets/colors";
import Activity from "../widgets/Activity";
import Banner from "../widgets/Banner";
import Footer from "../widgets/Footer";
import { FcLandscape } from "react-icons/fc";
import { MdOutlineSportsFootball } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiBookshelf } from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import { FaGuitar } from "react-icons/fa";
import { GiDramaMasks } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";
import { RiParentFill } from "react-icons/ri";
import { format } from "date-fns";
import logo from "../../../assets/img/logo.webp";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [actsFuture, setActsFuture] = useState([]);
    const [actsPast, setActsPast] = useState([]);

    useEffect(() => {
        getActivitiesFuture();
        getActivitiesPast();
    }, []);

    function viewActivity(id) {
        navigate(`/activities/${id}`);
    }

    function getActivitiesFuture() {
        axios
            .get(
                `/api/threeactivitiesfuture/${format(
                    new Date(),
                    "yyyy-MM-dd HH:mm:ss"
                )}`
            )
            .then((resp) => {
                setActsFuture(resp.data.data.slice());
            })
            .catch((err) => {});
    }

    function getActivitiesPast() {
        axios
            .get(
                `/api/threeactivitiespast/${format(
                    new Date(),
                    "yyyy-MM-dd HH:mm:ss"
                )}`
            )
            .then((resp) => {
                setActsPast(resp.data.data.slice());
            })
            .catch((err) => {});
    }

    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <title>SBC | Home</title>
                <meta
                    name="description"
                    content="Official home page of Sudek Boys Club (SBC)"
                />
            </Helmet>
            <div className="h-screen w-full bg-[url('../assets/img/bg.webp')] bg-cover bg-center">
                <Navbar />
                <div className="h-full flex gap-4 flex-col justify-center lg:justify-center p-4 lg:p-10 lg:gap-10 text-white bg-opacity-50 bg-gray-800">
                    <div className="uppercase font-heading underline underline-offset-8">
                        Be firm, be verile, be a man!
                    </div>
                    <div className="font-heading text-5xl lg:text-7xl">
                        SUDEK BOYS CLUB
                    </div>
                    <div className="w-52">
                        <Button
                            label="Learn More"
                            icon={
                                <BsArrowRight color={colors.white} size={16} />
                            }
                            onClick={scrollIn}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-gray-100" id="more">
                <div className="flex justify-center items-center p-4 lg:p-20 lg:gap-0 gap-2">
                    <div className="lg:w-10/12 text-lg lg:text-xl text-gray-700 p-2 lg:p-6 font-light font-heading text-justify">
                        Sudek Boys Club (SBC) is a Family Club run by a group of
                        Nairobi parents whose aim is to help their sons grow
                        into young men of character through constructive use of
                        their free time on weekends and school holidays.
                    </div>
                </div>

                <div className="bg-white">
                    <Banner label="Activities," />

                    <div className="grid lg:grid-flow-row grid-cols-1 lg:grid-cols-3 p-2 lg:p-6 gap-3">
                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <FcLandscape size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Excursions
                            </div>
                            <div className="text-gray-600 text-sm">
                                Climbing hills, trips to sites and institutions
                                around the city.
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <MdOutlineSportsFootball
                                    size={40}
                                    color={colors.orange}
                                />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Sports
                            </div>
                            <div className="text-gray-600 text-sm">
                                Football, basketball, karate, etc.
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <HiOutlineLightBulb
                                    size={40}
                                    color={colors.orange}
                                />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Character talks
                            </div>
                            <div className="text-gray-600 text-sm">
                                Personality enhancement, Doctrinal, Catechesis,
                                Mentorship
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <GiBookshelf size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Study
                            </div>
                            <div className="text-gray-600 text-sm">
                                Organised study sessions to help the boys
                                complete assignments
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <FaChess size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Board games and Crafts
                            </div>
                            <div className="text-gray-600 text-sm">
                                Chess, Origami
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <FaGuitar size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Music
                            </div>
                            <div className="text-gray-600 text-sm">
                                Playing musical instruments and the art of
                                listening to music.
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <BiMoviePlay size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Movies and Documentaries
                            </div>
                            <div className="text-gray-600 text-sm">
                                Curated and tailored to the topic of the day.
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <GiDramaMasks size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Drama and Folktales
                            </div>
                            <div className="text-gray-600 text-sm">
                                Developed around particular topics
                            </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-sm">
                            <div className="p-2 mb-2">
                                <RiParentFill size={40} color={colors.orange} />
                            </div>
                            <div className="font-heading text-lg text-gray-700 mb-1">
                                Activities for Parents
                            </div>
                            <div className="text-gray-600 text-sm">
                                Father-son activities e.g camps, barbecues,
                                soccer. Mother-son e.g Sous Chef
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 flex flex-col">
                    <Banner label="Upcoming," />
                    <div className="mt-4 p-6 grid grid-flow-row grid-cols-1 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-16">
                        {actsFuture.map((act, index) => (
                            <Activity
                                key={index}
                                data={act}
                                viewActivity={viewActivity}
                            />
                        ))}
                        {actsFuture.length === 0 && (
                            <span className="p-6 text-gray-700">
                                There currently no upcoming activities :(
                            </span>
                        )}
                    </div>
                    <div className="flex flex-row justify-center p-6">
                        <Link
                            className="hover:text-orange-400 text-gray-700 p-2 border rounded border-gray-300"
                            to="/activities"
                        >
                            See more
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:h-screen lg:bg-[url('../assets/img/4.webp')] bg-cover">
                <div className="lg:bg-white lg-p-4 bg-transparent">
                    <Banner label="In their own words," />
                </div>
                <div className="flex flex-col lg:flex-row-reverse h-full items-center flex-grow">
                    <div className="text-xl  text-gray-600  font-light font-heading grid grid-flow-row grid-cols-1 p-2 lg:p-6 lg:grid-cols-3 gap-4">
                        <div className="p-6 flex flex-col bg-white bg-opacity-60 border shadow">
                            <span className="text-justify">
                                "The club activities have been very engaging
                                every Saturday and during school holidays too
                                there are activities he has participated in. He
                                is usually looking forward to the weekend very
                                keen to know about the SBC activity."
                            </span>
                            <span className="p-2 text-sm font-sans font-medium italic text-gray-700">
                                - Liz Ngomi, SBC Mum
                            </span>
                        </div>
                        <div className="p-6 flex flex-col bg-white bg-opacity-60 border shadow">
                            <span className="text-justify">
                                "SBC has helped me meet new friends. It has
                                encouraged me to socialize and connect with
                                other boys of my age. It has various sports for
                                us boys to play such as football and basketball.
                                We also go hiking on nature trails such as Ngong
                                Hills, Arboretum and Nairobi National Park. And
                                these experiences have taught us how to be
                                strong and be able to persevere and for this I
                                love SBC very much."
                            </span>
                            <span className="p-2 text-sm font-sans font-medium italic text-gray-700">
                                - Peter Jabali, SBC Member
                            </span>
                        </div>
                        <div className="p-6 flex flex-col bg-white bg-opacity-60 border shadow">
                            <span className="text-justify">
                                "When the idea of SBC came, I didn’t think twice
                                about having him enrolled. And this, as a
                                family, has been the best decision for our son.
                                Through the club, it has enabled me as a parent
                                get to meet more like-minded parents, bond with
                                them and the boys, and get to learn on a more
                                personal and closer level the characters of many
                                other boys who are my son’s age."
                            </span>
                            <span className="p-2 text-sm font-sans font-medium italic text-gray-700">
                                - Kizito Osundwa, SBC Dad
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100">
                <div className="flex flex-col">
                    <Banner label="Recently," />
                    <div className="mt-4 p-4 lg:p-6 flex-grow grid grid-flow-row grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16">
                        {actsPast.map((act, index) => (
                            <Activity
                                key={index}
                                data={act}
                                viewActivity={viewActivity}
                            />
                        ))}
                        {actsPast.length === 0 && (
                            <span className="p-6 text-gray-700">
                                Nothing to show :(
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-center p-6">
                    <Link
                        className="hover:text-orange-400 text-gray-700 p-2 border rounded border-gray-300"
                        to="/activities"
                    >
                        See more
                    </Link>
                </div>
            </div>

            {/* Testimonial and Footer */}
            <div className="flex flex-col">
                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

function scrollIn() {
    console.log("clcik");
    document.getElementById("more").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

export default Home;
