import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../util/AppContext";
import Navbar from "../widgets/Navbar";
import TextEditor from "../widgets/Editor";
import Button from "../widgets/Button";
import TextInput from "../widgets/TextInput";
import { convertToRaw, EditorState } from "draft-js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertFromRaw } from "draft-js";
import Modal from "../widgets/Modal";
import { IoCloseOutline } from "react-icons/io5";
import Switch from "../widgets/Switch";

const NewPost = () => {
    const { user, setLoaderHidden } = useContext(AppContext);
    const [title, setTitle] = useState("Untitled");
    const [author, setAuthor] = useState("Unknown author");
    const [editorState, onEditorStateChange] = useState(
        EditorState.createEmpty()
    );
    const [timeoutId, setTimeoutId] = useState(null);
    const [saveStatus, setSaveStatus] = useState("");
    const [modalHidden, setModalHidden] = useState(true);
    const [publishStatus, setPublishStatus] = useState(null);
    const [enabled, setEnabled] = useState(null);
    const [selectedImgUrl, setSelectedImgUrl] = useState(null);
    const params = useParams();

    useEffect(() => {
        getPostData();
    }, []);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            autosave();
        }, 1000);

        setTimeoutId(newTimeoutId);
    }, [editorState, title, author]);

    function getPostData() {
        axios
            .get(`/api/blogposts/${params.postId}`)
            .then((resp) => {
                setTitle(resp.data.title);
                setAuthor(resp.data.author);
                setPublishStatus(resp.data.status);
                setEnabled(resp.data.status === "published" ? true : false);
                setSelectedImgUrl(resp.data.featured_img_url);
                const body = JSON.parse(resp.data.body);
                onEditorStateChange(
                    EditorState.createWithContent(convertFromRaw(body))
                );
            })
            .catch((err) => {});
    }

    function autosave() {
        setSaveStatus("Saving...");

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        const apiParams = new FormData();
        apiParams.append("title", title);
        apiParams.append("author", author);
        apiParams.append(
            "body",
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        );
        apiParams.append("status", enabled ? "published" : "draft");
        apiParams.append("featured_img_url", selectedImgUrl);

        console.log(convertToRaw(editorState.getCurrentContent()));
        axios
            .post(`/api/blogposts/${params.postId}`, apiParams, config)
            .then((resp) => {
                setSaveStatus("");
            })
            .catch((err) => {
                console.log(err.response.data);
                setSaveStatus("Error occurred!");
            });
    }

    function uploadCallback(file) {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        const apiParams = new FormData();
        apiParams.append("image", file);

        return axios
            .post("/api/upload/blogposts", apiParams, config)
            .then((resp) => {
                setLoaderHidden(true);
                return {
                    data: {
                        link: resp.data.url,
                    },
                };
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoaderHidden(true);
                return new Error("Failed to upload and attach image");
            });
    }

    return (
        <>
            <Modal hidden={modalHidden}>
                <div className="flex flex-col bg-white h-full lg:h-5/6 lg:rounded-lg shadow-2xl w-full lg:w-6/12">
                    <div className="py-3 px-6 border-b text-sm font-medium text-gray-600 flex justify-between items-center">
                        <span>Publish Post</span>
                        <div
                            className="p-2 rounded-full border border-white hover:border-gray-200 text-red-500"
                            onClick={() => setModalHidden(true)}
                        >
                            <IoCloseOutline size={20} />
                        </div>
                    </div>
                    <div className="p-6 text-gray-700 flex-grow overflow-y-scroll flex flex-col">
                        <div className="flex flex-col flex-grow">
                            <span className="font-heading font-medium mb-2">
                                Status
                            </span>
                            <div className="flex flex-row items-center gap-2">
                                <Switch
                                    enabled={enabled}
                                    setEnabled={setEnabled}
                                />
                                <span className="text-xs font-medium">
                                    {enabled ? "Published" : "Unpublished"}
                                </span>
                            </div>

                            <span className="font-heading font-medium mb-2 mt-4">
                                Featured Image
                            </span>
                            <span className="text-xs font-medium mb-2">
                                Select to set as featured image
                                {selectedImgUrl === "/images/bg.webp" &&
                                    " (current using default image)"}
                            </span>
                            <div className="flex flex-row gap-4 flex-wrap">
                                {Object.entries(
                                    convertToRaw(
                                        editorState.getCurrentContent()
                                    ).entityMap
                                ).map(([key, value], index) => {
                                    if (value.type === "IMAGE")
                                        return (
                                            <div
                                                key={index}
                                                className={`flex justify-center items-center border-4 p-1 overflow-hidden object-cover w-36 cursor-pointer ${
                                                    selectedImgUrl ===
                                                        value.data.src &&
                                                    "border-orange-500"
                                                }`}
                                                onClick={() =>
                                                    setSelectedImgUrl(
                                                        value.data.src
                                                    )
                                                }
                                            >
                                                <img
                                                    src={value.data.src}
                                                    className=""
                                                />
                                            </div>
                                        );
                                })}
                            </div>
                        </div>
                        <div className="flex flex-row justify-end mt-4 p-2 self-end items-center gap-2">
                            <span className="font-medium text-sm border p-2">
                                {saveStatus}
                            </span>
                            <Button label="Save" onClick={autosave} />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="w-full flex flex-col">
                <div className="bg-[url('../assets/img/4.webp')] bg-cover">
                    <Navbar />
                </div>
                <div className="flex flex-col-reverse lg:flex-row-reverse justify-between sticky top-0 z-20 bg-gray-100 lg:items-center p-6">
                    <div>
                        <Button
                            label="Publish"
                            onClick={() => setModalHidden(false)}
                        />
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                        {saveStatus}
                    </div>
                </div>
                <div className="flex flex-col p-6">
                    <div className="px-6 mb-5 flex flex-col lg:flex-row gap-4">
                        <div className="flex-grow">
                            <TextInput
                                label="Title"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                placeholder="Enter a title"
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Author"
                                value={author}
                                onChange={(event) =>
                                    setAuthor(event.target.value)
                                }
                                placeholder="Enter an author"
                            />
                        </div>
                    </div>
                    <TextEditor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        uploadCallback={uploadCallback}
                    />
                </div>
            </div>
        </>
    );
};

export default NewPost;
