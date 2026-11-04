import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        const element = document.querySelector(location.hash);

        if (element instanceof HTMLElement) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      return;
    }

    window.scrollTo({ top: 0 });
  }, [location.hash, location.pathname]);

  return null;
};

export default ScrollManager;
