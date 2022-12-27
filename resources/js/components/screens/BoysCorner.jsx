import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../util/AppContext";
import Footer from "../widgets/Footer";
import Navbar from "../widgets/Navbar";
import Fab from "../widgets/Fab";
import { IoAddOutline } from "react-icons/io5";
import colors from "../../../assets/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertToRaw, EditorState } from "draft-js";
import PaginationLinks from "../widgets/PaginationLinks";
import Post from "../widgets/Post";
import { Helmet } from "react-helmet";

const BoysCorner = () => {
    const { user, setLoaderHidden, setToastMsg, setToastHidden } =
        useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [paginationData, setPaginationData] = useState(null);

    useEffect(() => {
        if (page) {
            if (user) {
                getAllPosts();
            } else {
                getPublishedPosts();
            }
        }
    }, [page]);

    return (
        <>
            <Helmet>
                <title>SBC Boys' Corner</title>
                <meta
                    name="description"
                    content="Sudek Boys Club (SBC) Boys' Corner is where they boys get to show off their own works to the world such as, articles, drawing, poems and many more."
                />
            </Helmet>
            {user && (
                <Fab
                    icon={<IoAddOutline size={40} color={colors.white} />}
                    onClick={createNewPost}
                />
            )}
            <div className="w-full flex flex-col">
                <div className="flex flex-col h-64 lg:h-[32rem] w-full bg-[url('../assets/img/4.webp')] bg-cover">
                    <Navbar />
                    <div
                        className="flex-grow flex flex-row items-center p-10 gap-10 text-white bg-gray-800 bg-opacity-70 
"
                    >
                        <div className="font-heading text-4xl lg:text-7xl lg:w-6/12">
                            Boy's Corner
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 lg:p-6">
                    <div className="lg:mt-4 lg:mb-4 p-4 flex-grow grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-16">
                        {posts.map((post, index) => (
                            <Post
                                key={index}
                                data={post}
                                deletePost={deletePost}
                                editPost={editPost}
                                viewPost={viewPost}
                            />
                        ))}
                        {posts.length === 0 && (
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

    function getAllPosts() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        axios
            .get(`/api/all/blogposts?page=${page}`, config)
            .then((resp) => {
                setPaginationData(resp.data);
                setPosts(resp.data.data.slice());
                setLoaderHidden(true);
            })
            .catch((err) => {
                setLoaderHidden(true);
            });
    }

    function getPublishedPosts() {
        setLoaderHidden(false);
        axios
            .get(`/api/blogposts?page=${page}`)
            .then((resp) => {
                setPaginationData(resp.data);
                setPosts(resp.data.data.slice());
                setLoaderHidden(true);
            })
            .catch((err) => {
                setLoaderHidden(true);
            });
    }

    function deletePost(id) {
        const canProceed = confirm(
            "You are about to delete this item, proceed?"
        );
        if (canProceed) {
            setLoaderHidden(false);
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            axios
                .delete(`/api/blogposts/${id}`, config)
                .then((resp) => {
                    setLoaderHidden(true);
                    if (resp.status === 202) {
                        setToastMsg("Post deleted successfully.");
                        setToastHidden(false);
                    }
                    getAllPosts();
                })
                .catch((err) => {
                    setToastMsg("Error occured.");
                    setToastHidden(false);
                    setLoaderHidden(true);
                });
        }
    }

    function viewPost(id) {
        navigate(`/boys-corner/post/${id}`);
    }

    function editPost(id) {
        navigate(`/newpost/${id}`);
    }

    function createNewPost() {
        setLoaderHidden(false);
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        const params = new FormData();
        params.append("title", "Untitled");
        params.append(
            "body",
            JSON.stringify(
                convertToRaw(EditorState.createEmpty().getCurrentContent())
            )
        );
        params.append("author", "Unknown author");
        params.append("status", "draft");

        axios
            .post("/api/blogposts", params, config)
            .then((resp) => {
                setLoaderHidden(true);
                navigate(`/newpost/${resp.data.post.id}`);
            })
            .catch((err) => {
                setLoaderHidden(true);
            });
    }
};

export default BoysCorner;
