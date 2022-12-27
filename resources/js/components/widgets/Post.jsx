import React, { useContext } from "react";
import { AppContext } from "../util/AppContext";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { format, parseISO } from "date-fns";
import colors from "../../../assets/colors";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";

const Post = ({ deletePost, editPost, data, viewPost }) => {
    const { user } = useContext(AppContext);
    const date = parseISO(data.updated_at);
    return (
        <div className="cursor-pointer" onClick={() => viewPost(data.id)}>
            {user && (
                <div className="px-4 py-2 flex flex-row-reverse gap-2 border border-b-0 border-gray-300">
                    <div
                        className="z-10 p-2 rounded-full hover:bg-red-200 active:bg-red-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePost(data.id);
                        }}
                    >
                        <RiDeleteBin7Line size={25} color={colors.red} />
                    </div>
                    <div
                        className="p-2 rounded-full hover:bg-orange-200 active:bg-orange-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            editPost(data.id);
                        }}
                    >
                        <BiEditAlt size={25} color={colors.orange} />
                    </div>
                </div>
            )}
            <div
                className={`p-4 relative flex flex-col gap-1 border ${
                    user ? "rounded-b" : "rounded"
                } border-gray-300`}
            >
                <img
                    src={data.featured_img_url}
                    alt={`Image for ${data.title}`}
                    className="object-cover w-full h-56"
                    loading="lazy"
                />
                <span className="text-gray-500 p-1 font-medium text-sm">
                    {format(date, "MMM do, yyyy")}
                </span>
                <div className="text-gray-600 p-1 font-medium text-xs">
                    By {data.author}
                </div>
                <div className="text-orange-400 text-xl p-1 font-heading">
                    {data.title}
                </div>
                <div
                    className="h-36 overflow-hidden text-gray-700"
                    dangerouslySetInnerHTML={createMarkup(
                        draftToHtml(JSON.parse(data.body))
                    )}
                ></div>
            </div>
        </div>
    );

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html),
        };
    }
};

export default Post;
