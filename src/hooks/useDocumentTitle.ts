import { useEffect } from "react";

/**
 * Custom hook to dynamically update the document title for SEO and Accessibility.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | MAISON ARTÉ`;
  }, [title]);
}
