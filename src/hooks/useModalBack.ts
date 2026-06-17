import { useEffect } from "react";

/**
 * Custom hook to bind a modal's open state to the browser's history stack.
 * Ensures that pressing the physical/hardware back button closes the modal
 * instead of navigating away from the page or exiting the app.
 * 
 * @param isOpen - Boolean indicating if the modal is currently open.
 * @param closeCallback - Function to call to close the modal.
 * @param modalId - A unique string identifier for this specific modal.
 */
export function useModalBack(isOpen: boolean, closeCallback: () => void, modalId: string) {
  useEffect(() => {
    if (!isOpen) return;

    // Push a dummy state to the history stack identifying this modal
    // We use the current URL so the address bar doesn't change
    window.history.pushState({ modalId }, "", window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      // The browser back button was pressed, popping our dummy state.
      // We intercept this by closing the modal instead of routing.
      if (e.state?.modalId !== modalId) {
        closeCallback();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // If the component unmounts or isOpen becomes false (closed via UI X button),
      // we must clean up the dummy state from the browser history.
      // We check if the top state in the history stack is STILL our modal state.
      if (window.history.state && window.history.state.modalId === modalId) {
        window.history.back();
      }
    };
  }, [isOpen, closeCallback, modalId]);
}
