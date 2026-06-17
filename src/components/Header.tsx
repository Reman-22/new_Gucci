import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useModalBack } from "../hooks/useModalBack";

type Props = {
  onSearchClick: () => void;
};

const ACCOUNT_LINKS = [
  { label: "SIGN IN", tab: "login" },
  { label: "MY ORDERS", tab: "orders" },
  { label: "ACCOUNT SETTINGS", tab: "settings" },
  { label: "ADDRESS BOOK", tab: "address" },
  { label: "WALLET", tab: "wallet" },
  { label: "SAVED ITEMS", tab: "saved" },
  { label: "MY APPOINTMENTS", tab: "appointments" },
];

export function Header({ onSearchClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Register physical back button hooks for sidebars/modals
  useModalBack(menuOpen, () => setMenuOpen(false), "mobile-menu");
  useModalBack(contactOpen, () => setContactOpen(false), "contact-drawer");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine header transparency based on page and scroll
  const isTransparent = isHome && !scrolled;

  const textColor = isTransparent ? "text-white" : "text-[var(--color-ink)]";
  const softTextColor = isTransparent ? "text-white/80" : "text-[var(--color-ink-soft)]";
  const hoverTextColor = isTransparent ? "hover:text-white" : "hover:text-[var(--color-ink)]";
  const headerBg = isTransparent
    ? "bg-transparent border-transparent"
    : "bg-white/95 backdrop-blur-md border-[var(--color-rule)]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ${headerBg} ${textColor}`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-5">
          
          {/* ───── Left: Contact Us ───── */}
          <div className="flex-1">
            <button
              onClick={() => setContactOpen(true)}
              className={`flex items-center gap-1.5 text-[11px] font-medium tracking-[0.22em] uppercase ${softTextColor} ${hoverTextColor} transition-colors duration-300`}
            >
              Contact Us <span className="text-[14px] leading-none">+</span>
            </button>
          </div>

          {/* ───── Center: Logo ───── */}
          <Link
            to="/"
            className="flex-shrink-0 font-serif text-[20px] md:text-[28px] leading-none tracking-[0.35em] select-none text-center"
          >
            MAISON&nbsp;ARTÉ
          </Link>

          {/* ───── Right: Icons (Flex Row) ───── */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-5 text-[12px] tracking-[0.18em] uppercase">
            
            {/* Bag */}
            <button
              onClick={() => dispatch({ type: "TOGGLE" })}
              className={`relative p-2 rounded-full ${hoverTextColor} ${softTextColor} transition-colors duration-300`}
              aria-label="Shopping bag"
            >
              <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M5 7h12l-1 12H6L5 7Zm3 0a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.25" fill="none" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 min-w-[16px] flex items-center justify-center bg-[var(--color-ink)] text-white text-[9px] leading-none px-1 rounded-full shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Account */}
            <div className="relative flex items-center">
              <button
                aria-label="Account"
                onClick={() => setAccountOpen((v) => !v)}
                onMouseEnter={() => setAccountOpen(true)}
                className={`p-2 rounded-full ${hoverTextColor} ${softTextColor} transition-colors duration-300`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {accountOpen && (
                <div
                  onMouseLeave={() => setAccountOpen(false)}
                  className="absolute right-0 top-[calc(100%+8px)] min-w-[240px] bg-white border border-[var(--color-rule)] shadow-2xl z-40 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <div className="py-3 text-[var(--color-ink)]">
                    {ACCOUNT_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        to="/account"
                        state={{ tab: link.tab }}
                        onClick={() => {
                          // Allow React Router to handle state, but provide smooth UX
                          setAccountOpen(false);
                        }}
                        className="block w-full text-left px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] hover:bg-[var(--color-surface-raised)] hover:opacity-70 transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={onSearchClick}
              className={`p-2 rounded-full ${hoverTextColor} ${softTextColor} transition-colors duration-300`}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
                <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-2 p-2 rounded-full ${hoverTextColor} ${softTextColor} transition-colors duration-300`}
            >
              <span className="hidden md:inline text-[11px] font-medium tracking-[0.22em] uppercase">MENU</span>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ───── CONTACT US Right Drawer ───── */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-md transition-opacity duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          contactOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setContactOpen(false)}
      />
      <div 
        role="dialog"
        aria-label="Contact Information"
        className={`fixed inset-y-0 right-0 z-[80] w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          contactOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-8 border-b border-[var(--color-rule)]">
          <h2 className="font-serif text-[24px]">Contact Us</h2>
          <button onClick={() => setContactOpen(false)} className="p-2 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <div className="p-8 space-y-10 text-[var(--color-ink)]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-muted)] mb-3">Phone</p>
            <p className="text-[16px]">+1 (800) 123-4567</p>
            <p className="text-[13px] text-[var(--color-ink-soft)] mt-1">Mon-Fri, 9am - 6pm EST</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-muted)] mb-3">WhatsApp</p>
            <p className="text-[16px]">+1 (800) 123-4567</p>
            <p className="text-[13px] text-[var(--color-ink-soft)] mt-1">Available 24/7</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-muted)] mb-3">Email</p>
            <a href="mailto:concierge@maisonarte.com" className="text-[16px] underline underline-offset-4">
              concierge@maisonarte.com
            </a>
          </div>
        </div>
      </div>

      {/* ───── MENU Right Drawer ───── */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-md transition-opacity duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div 
        role="dialog"
        aria-label="Navigation Menu"
        className={`fixed inset-y-0 right-0 z-[80] w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-8 border-b border-[var(--color-rule)]">
          <h2 className="text-[11px] tracking-[0.22em] uppercase">Navigation</h2>
          <button onClick={() => setMenuOpen(false)} className="p-2 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-6 text-[var(--color-ink)]">
          {["Women", "Men", "Atelier", "Gifts", "Stories"].map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[32px] hover:opacity-60 transition-opacity"
            >
              {cat}
            </Link>
          ))}
          <div className="w-12 h-px bg-[var(--color-rule)] my-4" />
          <Link to="/services" onClick={() => setMenuOpen(false)} className="text-[13px] tracking-[0.18em] uppercase hover:opacity-60 transition-opacity">
            Our Services
          </Link>
          <Link to="/account" onClick={() => setMenuOpen(false)} className="text-[13px] tracking-[0.18em] uppercase hover:opacity-60 transition-opacity">
            My Account
          </Link>
        </nav>
      </div>
    </>
  );
}
