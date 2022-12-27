import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    function useScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
    }
    useScrollToTop();
    return null;
};

export default ScrollToTop;
