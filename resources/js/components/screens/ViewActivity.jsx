import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../util/AppContext";
import { useParams } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import { format, parse, isFuture } from "date-fns";
import { BsCheck2All, BsClock } from "react-icons/bs";
import colors from "../../../assets/colors";
import { Helmet } from "react-helmet";
import Footer from "../widgets/Footer";
import Linkify from "react-linkify/dist/components/Linkify";
const ViewActivity = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const { setLoaderHidden } = useContext(AppContext);
    const [when, setWhen] = useState(null);
    useEffect(() => {
        getActivity();
    }, []);

    function getActivity() {
        setLoaderHidden(false);
        axios
            .get(`/api/activities/${params.actId}`)
            .then((resp) => {
                setData(resp.data);
                setWhen(
                    parse(resp.data.when, "yyyy-MM-dd HH:mm:ss", new Date())
                );
                setLoaderHidden(true);
            })
            .catch((err) => {
                setLoaderHidden(true);
            });
    }
    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <title>{data?.label}</title>
                <meta name="description" content={data?.description} />
            </Helmet>
            <div className="bg-[url('../assets/img/1.webp')] bg-cover">
                <Navbar />
            </div>
            <div className="flex flex-col items-center p-2 lg:p-8">
                <div className="flex flex-col lg:flex-row border shadow lg:w-8/12 rounded">
                    <div className="lg:w-5/12 border-r rounded-l flex justify-center items-center">
                        <img src={data?.featured_img} />
                    </div>
                    <div className="lg:w-7/12 p-4 lg:px-8 lg:pt-4 lg:pb-8 flex flex-col text-gray-700 gap-4 rounded-r">
                        <span className="w-full flex flex-row justify-end">
                            <div
                                className={`text-white text-sm font-medium z-30 rounded-3xl shadow ${
                                    !isFuture(when)
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                } px-4 py-2 flex flex-row items-center gap-2`}
                            >
                                {!isFuture(when) ? (
                                    <>
                                        <span>Past</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Upcoming</span>
                                    </>
                                )}
                            </div>
                        </span>
                        <span className="text-5xl font-heading">
                            {data?.label}
                        </span>
                        <span className="text-sm font-medium">
                            {when && format(when, "MMM do, yyyy h:mm bbb")}
                        </span>
                        <div className="whitespace-pre-wrap text-base links">
                            <Linkify>{data?.description}</Linkify>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewActivity;
