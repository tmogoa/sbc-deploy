import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import Navbar from "../widgets/Navbar";
import { format, parseISO } from "date-fns";
import { Helmet } from "react-helmet";

const ViewPost = () => {
    const [body, setBody] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const params = useParams();
    useEffect(() => {
        getPostData();
    }, []);

    function getPostData() {
        axios
            .get(`/api/blogposts/${params.postId}`)
            .then((resp) => {
                setBody(JSON.parse(resp.data.body));
                setTitle(resp.data.title);
                setAuthor(resp.data.author);
                setDate(format(parseISO(resp.data.updated_at), "MMM do, yyyy"));
            })
            .catch((err) => {});
    }
    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <title>{title}</title>
                <meta
                    name="description"
                    content={`Sudek Boys CLub blogpost on ${title}`}
                />
            </Helmet>
            <div className="bg-[url('../assets/img/1.webp')] bg-cover">
                <Navbar />
            </div>
            <div className="w-full flex flex-col items-start lg:items-center gap-1">
                <div className="prose lg:prose-xl p-8 lg:w-8/12 flex flex-col">
                    <h1>{title}</h1>
                    <span className=" text-gray-700 font-medium">
                        By {author}
                    </span>
                    <span className="text-xs text-gray-700 font-medium">
                        {date}
                    </span>
                </div>
                {body && (
                    <div
                        className="prose lg:prose-xl flex-grow px-8 pt-0 pb-8 lg:w-8/12 links"
                        dangerouslySetInnerHTML={createMarkup(
                            draftToHtml(body)
                        )}
                    ></div>
                )}
            </div>
        </div>
    );
    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html),
        };
    }
};

export default ViewPost;
