import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const STORES = [
  {
    id: 1,
    name: "Zurich, Bahnhofstrasse",
    address: "Bahnhofstrasse 39, 8001 Zürich, Switzerland",
    phone: "+41 44 211 42 22",
  },
  {
    id: 2,
    name: "Paris, Rue Saint-Honoré",
    address: "235 Rue Saint-Honoré, 75001 Paris, France",
    phone: "+33 1 42 60 11 00",
  },
  {
    id: 3,
    name: "Tokyo, Ginza",
    address: "4-4-10 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
    phone: "+81 3 3562 2011",
  },
];

const SERVICES_DETAIL = [
  {
    title: "Bespoke Commissions",
    subtitle: "From concept to creation",
    desc: "Work directly with our master artisans to create a one-of-a-kind piece. You will be guided through every step: initial consultation, material selection, sketch approval, handcrafting, and final delivery. Lead times vary from 4 to 16 weeks depending on complexity.",
    image: "https://images.pexels.com/photos/4452610/pexels-photo-4452610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    features: [
      "Personal consultation with the artisan",
      "Custom material and color selection",
      "Progress updates with photographs",
      "Signed certificate of authenticity",
      "Complimentary monogramming",
    ],
  },
  {
    title: "Repair & Restoration",
    subtitle: "Made to last a lifetime",
    desc: "Every MAISON ARTÉ piece comes with a lifetime repair guarantee. Our ateliers can re-sole shoes, re-stitch leather goods, re-glaze ceramics, and restore silver. We believe in objects that outlive us.",
    image: "https://images.pexels.com/photos/37443512/pexels-photo-37443512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    features: [
      "Lifetime repair guarantee",
      "Authentic materials only",
      "Hand-finishing by original artisans",
      "Free assessment and quote",
      "Care and maintenance guide included",
    ],
  },
  {
    title: "Atelier Visits",
    subtitle: "See the making",
    desc: "Book a private visit to our flagship ateliers in Florence, Italy, and Kyoto, Japan. Watch masters at work, try your hand at a craft, and gain a deeper understanding of the time and skill behind every piece.",
    image: "https://images.pexels.com/photos/5706269/pexels-photo-5706269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    features: [
      "Florence: Leather & Shoemaking",
      "Kyoto: Ceramics & Silver",
      "Small groups (max 6 persons)",
      "Hands-on workshop included",
      "Complimentary refreshments",
    ],
  },
  {
    title: "Gift Concierge",
    subtitle: "Every detail considered",
    desc: "Our gift concierge service handles everything from complimentary archival-quality wrapping to handwritten notes and scheduled delivery. We can also arrange a virtual unwrapping call with the artisan who made the piece.",
    image: "https://images.pexels.com/photos/31203863/pexels-photo-31203863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    features: [
      "Archival-quality gift wrapping",
      "Handwritten note card",
      "Scheduled delivery to any address",
      "Virtual meeting with the artisan",
      "Gift receipt included",
    ],
  },
];

type Tab = "store" | "services";

export function ServicesPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("store");

  useEffect(() => {
    // Allows deep linking to a specific tab via React Router state
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab as Tab);
    }
  }, [location.state]);

  return (
    <div className="bg-white min-h-screen">
      
      {/* ───── Top Navigation Tabs ───── */}
      <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-[var(--color-rule)] transition-all">
        <div className="flex w-full">
          <button
            onClick={() => setActiveTab("store")}
            className={`flex-1 py-4 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 border-b-2 ${
              activeTab === "store" ? "border-[var(--color-ink)] text-[var(--color-ink)]" : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            Find a Store
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-4 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 border-b-2 ${
              activeTab === "services" ? "border-[var(--color-ink)] text-[var(--color-ink)]" : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            Services
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
        {activeTab === "store" ? <StoreLocator /> : <ServicesContent />}
      </div>
    </div>
  );
}

/* ───── 1. Store Locator View ───── */
function StoreLocator() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      
      {/* Left: Search & List */}
      <div className="lg:col-span-4 flex flex-col h-full">
        
        {/* Search Bar */}
        <div className="relative border-b border-[var(--color-rule)] focus-within:border-[var(--color-ink)] transition-colors duration-500 pb-2 mb-4 group">
          <svg className="absolute left-1 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] group-focus-within:text-[var(--color-ink)] transition-colors" width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25">
            <circle cx="10" cy="10" r="6.5" />
            <path d="M15 15l5 5" />
          </svg>
          <input 
            type="text" 
            placeholder="Country, Region, City" 
            className="w-full pl-9 pr-4 py-2 text-[14px] bg-transparent outline-none placeholder-[var(--color-ink-muted)] text-[var(--color-ink)]"
          />
        </div>

        {/* Use Current Location */}
        <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors duration-300 mb-10 w-fit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Use current location
        </button>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[11px] tracking-[0.15em] uppercase font-medium">3 Stores found</h2>
          <button className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[var(--color-ink)] border border-[var(--color-rule)] px-4 py-2 rounded-full hover:border-[var(--color-ink)] transition-all duration-300">
            Filter
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Store Cards */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
          {STORES.map((store) => (
            <div key={store.id} className="bg-white border border-[var(--color-rule)] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-500 flex flex-col">
              <div className="flex gap-4">
                {/* Brand Logo Icon */}
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-serif text-[18px] tracking-widest italic">
                  M
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-2 leading-tight">{store.name}</h3>
                  <p className="text-[13px] text-[var(--color-ink-soft)] leading-relaxed max-w-[200px] mb-1">{store.address}</p>
                  <p className="text-[13px] text-[var(--color-ink-muted)] mb-5">{store.phone}</p>
                  
                  <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity mb-5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Book an Appointment
                  </button>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-auto pt-4 border-t border-[var(--color-rule)] flex items-center justify-between">
                <button className="text-[11px] tracking-[0.15em] uppercase font-medium hover:text-[var(--color-ink-muted)] transition-colors">
                  Details
                </button>
                <button className="h-6 w-6 rounded-full border border-[var(--color-rule)] flex items-center justify-center hover:bg-[var(--color-surface-raised)] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Map Area */}
      <div className="lg:col-span-8 relative aspect-square lg:aspect-auto lg:h-[calc(100vh-180px)] bg-[#e5e4e2] rounded-3xl overflow-hidden shadow-inner group">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')" }} />
        
        {/* Mock Map Image for realistic feel */}
        <img src="https://images.pexels.com/photos/1544420/pexels-photo-1544420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1200" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />

        {/* Expand Map Button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-ink)] text-white px-6 py-3 rounded-full flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium shadow-2xl hover:scale-105 transition-transform duration-500">
          Expand Map
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

    </div>
  );
}

/* ───── 2. Services View ───── */
function ServicesContent() {
  return (
    <>
      <div className="px-4 md:px-6 py-14 md:py-20 space-y-24 md:space-y-32">
        {SERVICES_DETAIL.map((svc, i) => (
          <section key={svc.title} className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
            <div className={`${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
              <div className="aspect-[4/3] bg-[var(--color-surface-raised)] overflow-hidden rounded-3xl">
                <img src={svc.image} alt={svc.title} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              </div>
            </div>
            <div className={`${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-muted)] mb-2">{svc.subtitle}</p>
              <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.01em]">{svc.title}</h2>
              <p className="mt-6 text-[14px] leading-[1.8] text-[var(--color-ink-soft)]">{svc.desc}</p>
              <ul className="mt-8 space-y-3">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px]">
                    <span className="text-[var(--color-ink-muted)]" aria-hidden="true">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/category/Atelier"
                className="inline-block mt-10 px-8 py-3 rounded-full border border-[var(--color-ink)] text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink)] hover:text-white transition-colors duration-[var(--duration-fast)] shadow-sm"
              >
                Start a Project
              </Link>
            </div>
          </section>
        ))}
      </div>

      <div className="px-4 md:px-6 py-20 border-t border-[var(--color-rule)] bg-[var(--color-surface-raised)] text-center">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-muted)] mb-4">Ready to begin?</p>
        <h2 className="font-serif font-light text-[36px] md:text-[44px] leading-[1.05]">
          Let&apos;s make something together.
        </h2>
        <p className="mt-4 text-[14px] text-[var(--color-ink-soft)]">
          Reach out to our concierge team. We reply within 24 hours.
        </p>
        <Link
          to="/"
          className="inline-block mt-10 px-10 py-4 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] transition-colors duration-[var(--duration-fast)] shadow-md"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}
