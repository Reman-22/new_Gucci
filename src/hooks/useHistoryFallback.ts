import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Tracks internal application history. If a user lands directly on a deep link 
 * (e.g. /product/123) and presses the browser's Back button, this ensures they 
 * fallback to the application's root ('/') instead of exiting the website completely.
 */
export function useHistoryFallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // When the app initializes, if the user lands on a deep link (not '/'),
    // we inject the home page into the history stack so the back button keeps them on site.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (location.pathname !== "/") {
        const currentPath = location.pathname + location.search;
        // Replace current entry with Root
        navigate("/", { replace: true });
        // Immediately push the deep-link URL on top
        setTimeout(() => navigate(currentPath, { replace: false }), 0);
      }
    }
  }, [location, navigate]);
}
