import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../util/AppContext";
import Footer from "../widgets/Footer";
import Navbar from "../widgets/Navbar";
import Activity from "../widgets/Activity";
import Fab from "../widgets/Fab";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import colors from "../../../assets/colors";
import Modal from "../widgets/Modal";
import TextInput from "../widgets/TextInput";
import TextArea from "../widgets/TextArea";
import Button from "../widgets/Button";
import axios from "axios";
import { format, parse } from "date-fns";
import PaginationLinks from "../widgets/PaginationLinks";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Activities = () => {
    const navigate = useNavigate();
    const [acts, setActs] = useState([]);
    const { setLoaderHidden, user, setToastHidden, setToastMsg } =
        useContext(AppContext);
    const [modalHidden, setModalHidden] = useState(true);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [actToUpdate, setActToUpdate] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);

    const [label, setLabel] = useState("Ngong Hills Hike");
    const [description, setDescription] = useState(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quod vitae, officiis.  Earum quod vitae, officiis.  Earum quod vitae, officiis.  Earum quod vitae, officiis."
    );
    const [dateTime, setDateTime] = useState(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );

    const [labelError, setLabelError] = useState("");
    const [descError, setDescError] = useState("");
    const [dateTimeErr, setDateTimeErr] = useState("");
    const [imgErr, setImgErr] = useState("");

    const [page, setPage] = useState(1);
    const [paginationData, setPaginationData] = useState(null);

    useEffect(() => {
        if (page) {
            getActivities();
        }
    }, [page]);

    function onImageChange(e) {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const updateActivity = (act) => {
        setLabel(act.label);
        setDescription(act.description);
        setDateTime(
            format(
                parse(act.when, "yyyy-MM-dd HH:mm:ss", new Date()),
                "yyyy-MM-dd'T'HH:mm"
            )
        );
        setImageUrl(act.featured_img);
        setActToUpdate(act);
        setModalHidden(false);
        setUpdateMode(true);
    };

    const deleteActivity = (id) => {
        const canProceed = confirm(
            "You are about to delete this item, proceed?"
        );
        if (canProceed) {
            setLoaderHidden(false);
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            axios
                .delete(`/api/activities/${id}`, config)
                .then((resp) => {
                    setLoaderHidden(true);
                    if (resp.status === 202) {
                        setToastMsg("Activity deleted successfully.");
                        setToastHidden(false);
                    }
                    getActivities();
                })
                .catch((err) => {
                    setToastMsg("Error occured.");
                    setToastHidden(false);
                    setLoaderHidden(true);
                });
        }
    };

    return (
        <>
            <Helmet>
                <title>Activities of Sudek Boys Club</title>
                <meta
                    name="description"
                    content="Sudek Boys Club hold a number of activities for the boys, their fathers and thier mothers. For example, sports, movies, music, excursions, study, character talks and board games"
                />
            </Helmet>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white h-full lg:h-5/6 lg:rounded-lg lg:shadow-2xl w-full lg:w-6/12">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>New Activity</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 flex-grow overflow-y-scroll">
                        <div className="p-3">
                            <div className="mb-4">
                                <TextInput
                                    placeholder="Title of activity"
                                    label="Title of activity"
                                    type="text"
                                    value={label}
                                    onChange={(event) =>
                                        setLabel(event.target.value)
                                    }
                                    error={labelError}
                                />
                            </div>
                            <div className="mb-4">
                                <TextArea
                                    placeholder="Description of activity"
                                    label="Description of activity"
                                    rows="7"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    error={descError}
                                />
                            </div>
                            <div className="mb-4">
                                <TextInput
                                    placeholder="Date and Time"
                                    label="Date and Time"
                                    type="datetime-local"
                                    value={dateTime}
                                    onChange={(event) =>
                                        setDateTime(event.target.value)
                                    }
                                    error={dateTimeErr}
                                />
                            </div>
                        </div>

                        <div className="p-3 flex justify-center items-center">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium mb-3 text-gray-600">
                                    Add Image
                                </span>
                                <label className="border-dashed border-2 p-6 hover:bg-gray-100 cursor-pointer flex flex-col items-center">
                                    {imageUrl && (
                                        <div className=" shadow-sm overflow-hidden object-cover">
                                            <img src={imageUrl} alt="upload" />
                                        </div>
                                    )}
                                    <span className="text-gray-600 text-sm font-medium p-2">
                                        {imageUrl
                                            ? "Change poster"
                                            : "Select poster"}
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={onImageChange}
                                    />
                                </label>
                                <span className="text-xs font-medium text-red-500 pr-3">
                                    {imgErr}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <Button
                            label="Save"
                            onClick={updateMode ? saveUpdate : saveActivity}
                        />
                    </div>
                </div>
            </Modal>
            <div className="w-full flex flex-col">
                {user && (
                    <Fab
                        icon={<IoAddOutline size={40} color={colors.white} />}
                        onClick={() => {
                            setModalHidden(false);
                            setUpdateMode(false);
                        }}
                    />
                )}
                <div className="flex flex-col h-64 lg:h-[32rem] w-full bg-[url('../assets/img/1.webp')] bg-cover">
                    <Navbar />
                    <div
                        className="flex-grow flex flex-row items-center p-10 gap-10 text-white bg-gray-800 bg-opacity-70 
"
                    >
                        <div className="font-heading text-4xl lg:text-7xl lg:w-6/12">
                            Activities
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 lg:p-6">
                    <div className="lg:mt-4 lg:mb-4 p-4 flex-grow grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-y-1 lg:gap-y-16 lg:gap-x-16">
                        {acts.map((act, index) => (
                            <Activity
                                key={index}
                                data={act}
                                deleteActivity={deleteActivity}
                                updateActivity={updateActivity}
                                viewActivity={viewActivity}
                            />
                        ))}
                        {acts.length === 0 && (
                            <span className="text-2xl font-heading text-gray-700">
                                Nothing to show :(
                            </span>
                        )}
                    </div>
                    <div className="p-4 mt-6">
                        {paginationData && (
                            <PaginationLinks
                                data={paginationData}
                                setPage={setPage}
                            />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );

    function viewActivity(id) {
        navigate(`/activities/${id}`);
    }

    function saveUpdate() {
        clearErrors();
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        const params = new FormData();
        params.append("label", label);
        params.append("description", description);
        params.append("date", dateTime);
        params.append(
            "chimg",
            imageUrl !== actToUpdate.featured_img ? "1" : "0"
        );
        if (imageUrl !== actToUpdate.featured_img) {
            params.append("poster", image);
        }

        axios
            .post(`/api/update/activities/${actToUpdate.id}`, params, config)
            .then((resp) => {
                setLoaderHidden(true);
                setToastMsg("Activity updated successfully.");
                setToastHidden(false);
                setModalHidden(true);
                getActivities();
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    const { errors } = err.response.data;
                    if (errors.label) setLabelError(errors.label);
                    if (errors.description) setDescError(errors.description);
                    if (errors.date) setDateTimeErr(errors.date);
                    if (errors.poster) setImgErr(errors.poster);
                }
                setLoaderHidden(true);
            });
    }

    function saveActivity() {
        clearErrors();
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        const params = new FormData();
        params.append("label", label);
        params.append("description", description);
        params.append("date", dateTime);
        params.append("poster", image);

        axios
            .post("/api/activities", params, config)
            .then((resp) => {
                setLoaderHidden(true);
                setToastMsg("Activity added successfully.");
                setToastHidden(false);
                setModalHidden(true);
                getActivities();
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    const { errors } = err.response.data;
                    if (errors.label) setLabelError(errors.label);
                    if (errors.description) setDescError(errors.description);
                    if (errors.date) setDateTimeErr(errors.date);
                    if (errors.poster) setImgErr(errors.poster);
                }
                setLoaderHidden(true);
            });
    }

    function clearErrors() {
        setLabelError("");
        setDescError("");
        setDateTimeErr("");
        setImgErr("");
    }

    function getActivities() {
        setLoaderHidden(false);
        axios
            .get(`/api/activities?page=${page}`)
            .then((resp) => {
                setPaginationData(resp.data);
                setActs(resp.data.data.slice());
                setLoaderHidden(true);
            })
            .catch((err) => {
                setLoaderHidden(true);
            });
    }
};

export default Activities;
