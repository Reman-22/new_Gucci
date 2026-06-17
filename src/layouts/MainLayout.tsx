import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SearchModal } from "../components/SearchModal";
import { CartSidebar } from "../components/CartSidebar";
import { useHistoryFallback } from "../hooks/useHistoryFallback";
import { useModalBack } from "../hooks/useModalBack";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  
  // Track deep linking to ensure "Back" button stays within the app
  useHistoryFallback();
  
  // Custom back button handling for the search modal
  useModalBack(searchOpen, () => setSearchOpen(false), "search");

  return (
    <div className="bg-white text-[var(--color-ink)] font-sans flex flex-col min-h-screen">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-ink)] focus:text-white focus:px-4 focus:py-2 focus:text-[12px] focus:tracking-[0.2em] focus:uppercase rounded-full"
      >
        Skip to content
      </a>

      <Header onSearchClick={() => setSearchOpen(true)} />
      
      <main id="main" className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      <CartSidebar />
    </div>
  );
}
