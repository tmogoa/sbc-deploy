import React from "react";

const PaginationLinks = ({ data, setPage }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row border border-gray-300 rounded text-gray-600">
                <span
                    onClick={() => setPage(1)}
                    className="p-2 cursor-pointer border-r"
                >
                    First
                </span>
                {data?.links.map((link, index) => (
                    <span
                        key={index}
                        onClick={() => setPage(getPageNum(link.url))}
                        className={`py-2 cursor-pointer border-r px-4 ${
                            link.active && "bg-orange-400 text-white"
                        } ${!link.url && "cursor-not-allowed"}`}
                    >
                        {setLabel(index, link.label)}
                    </span>
                ))}
                <span
                    onClick={() => setPage(getPageNum(data.last_page_url))}
                    className="p-2 cursor-pointer"
                >
                    Last
                </span>
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
                Page {data.current_page} of {data.last_page}
            </div>
        </div>
    );
    function getPageNum(url) {
        return url && new URL(url).searchParams.get("page");
    }

    function setLabel(index, label) {
        if (index === 0) return <>&laquo;</>;
        if (index === data.links.length - 1) return <>&raquo;</>;
        return label;
    }
};

export default PaginationLinks;
