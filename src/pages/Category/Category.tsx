import { useMemo, useState, useEffect, useCallback, memo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  PRODUCTS,
  SUB_CATEGORIES,
  PARENT_CATEGORIES,
  ALL_PRICE_RANGES,
  COLOR_NAME_TO_HEX,
} from "../../data/products";
import { ProductCard } from "../../components/ProductCard";
import { useModalBack } from "../../hooks/useModalBack";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const DESCRIPTIONS: Record<string, string> = {
  Women: "Hand-crafted pieces for women — from sculptural bags to hand-loomed textiles.",
  Men: "Objects of enduring utility for men — built by hand, made to last.",
  Atelier: "One-of-a-kind works from our independent atelier partners.",
  Gifts: "Curated gift ideas across every discipline and price.",
  Stories: "Essays, field notes, and maker portraits from our ateliers.",
};

export function Category() {
  const { parentCategory } = useParams<{ parentCategory: string }>();
  const decodedCat = decodeURIComponent(parentCategory || "Women");
  const cat = PARENT_CATEGORIES.includes(decodedCat as any) ? decodedCat : "Women";
  const subCats = SUB_CATEGORIES[cat as keyof typeof SUB_CATEGORIES] ?? [];

  // Filters
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSub, setActiveSub] = useState<string>("All");
  const [sort, setSort] = useState<SortId>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  
  // Drawer filter state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);

  // Sync subcategory with URL query params or category change
  useEffect(() => {
    const subQuery = searchParams.get("sub");
    if (subQuery && subCats.includes(subQuery)) {
      setActiveSub(subQuery);
    } else {
      setActiveSub("All");
    }
  }, [cat, searchParams, subCats]);

  // Update URL if user manually clicks a subcategory tab
  const handleSubChange = useCallback((newSub: string) => {
    setActiveSub(newSub);
    if (newSub === "All") {
      searchParams.delete("sub");
    } else {
      searchParams.set("sub", newSub);
    }
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Close drawer on escape
  useEffect(() => {
    if (!drawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  // Handle hardware back button for closing the filter drawer
  useModalBack(drawerOpen, () => setDrawerOpen(false), "category-filter");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.parentCategory === cat);
    if (activeSub !== "All") list = list.filter((p) => p.subCategory === activeSub);
    if (selectedColor !== "All") list = list.filter((p) => p.colorNames.includes(selectedColor));
    if (selectedMaterial !== "All") list = list.filter((p) => p.material === selectedMaterial);
    const range = ALL_PRICE_RANGES[priceRangeIdx];
    list = list.filter((p) => p.price >= range.min && p.price <= range.max);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [cat, activeSub, sort, selectedColor, selectedMaterial, priceRangeIdx]);

  const productsInCat = useMemo(() => PRODUCTS.filter((p) => p.parentCategory === cat), [cat]);
  const availableMaterials = useMemo(() => Array.from(new Set(productsInCat.map((p) => p.material))).sort(), [productsInCat]);
  const availableColors = useMemo(() => Array.from(new Set(productsInCat.flatMap((p) => p.colorNames))).sort(), [productsInCat]);

  const hasActiveFilters = selectedColor !== "All" || selectedMaterial !== "All" || priceRangeIdx !== 0;

  // [PERFORMANCE] useCallback caches the clear function, ensuring the Filter Drawer 
  // and Action Footer buttons do not unnecessarily re-render on parent state changes.
  const clearFilters = useCallback(() => {
    setSelectedColor("All");
    setSelectedMaterial("All");
    setPriceRangeIdx(0);
  }, []);

  return (
    <div className="bg-white">
      {/* ───── Category header ───── */}
      <div className="px-4 md:px-6 pt-16 pb-8 md:pt-24 md:pb-12 border-b border-[var(--color-rule)]">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-muted)] mb-4">Maison Arté</p>
        <h1 className="font-serif font-light text-[48px] md:text-[72px] leading-[0.95] tracking-[-0.01em]">{cat}</h1>
        <p className="mt-6 text-[14px] leading-[1.7] text-[var(--color-ink-soft)] max-w-[52ch]">
          {DESCRIPTIONS[cat] || "Discover our collection."}
        </p>
      </div>

      {/* ───── Filters & Sort Bar ───── */}
      <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-[var(--color-rule)] transition-all">
        
        {/* Row 1: Sub-category tabs */}
        <div className="px-4 md:px-6 py-3 flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-[var(--color-rule)]">
          <div role="tablist" aria-label="Filter by sub-category" className="flex items-center gap-1 flex-shrink-0">
            <TabBtn label="All" active={activeSub === "All"} onClick={() => handleSubChange("All")} />
            {subCats.map((sc) => (
              <TabBtn key={sc} label={sc} active={activeSub === sc} onClick={() => handleSubChange(sc)} />
            ))}
          </div>
        </div>
        
        {/* Row 2: Sort (Left) & Filter (Right) */}
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Sort */}
          <div className="relative flex-shrink-0">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase hover:text-[var(--color-ink)] text-[var(--color-ink-soft)] transition-colors duration-[var(--duration-instant)]"
            >
              <span>Sort: {SORTS.find((s) => s.id === sort)?.label.split(': ')[1] || 'Featured'}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </button>
            {sortOpen && (
              <ul role="listbox" className="absolute left-0 top-[calc(100%+12px)] min-w-[220px] bg-white border border-[var(--color-rule)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 rounded-2xl overflow-hidden">
                {SORTS.map((s) => (
                  <li key={s.id}>
                    <button
                      role="option"
                      aria-selected={sort === s.id}
                      onClick={() => { setSort(s.id); setSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-[12px] tracking-[0.12em] uppercase hover:bg-[var(--color-surface-raised)] ${
                        sort === s.id ? "text-[var(--color-ink)] font-medium" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Filter Icon */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`relative flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-[var(--duration-instant)] ${
              hasActiveFilters ? "text-[var(--color-ink)] font-medium" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
            aria-label="Open filters"
          >
            <span>Filter</span>
            <div className="relative p-1 -mr-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--color-ink)]" />
              )}
            </div>
          </button>

        </div>
      </div>

      {/* ───── Product grid ───── */}
      <div className="px-4 md:px-6 py-10 md:py-14">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-muted)] mb-8" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        {filtered.length === 0 ? (
          <div className="border border-[var(--color-rule)] py-24 px-6 text-center rounded-2xl">
            <p className="font-serif text-[28px] leading-tight">No pieces match these filters.</p>
            <button
              onClick={() => { setActiveSub("All"); clearFilters(); }}
              className="mt-8 px-8 py-3 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
            {filtered.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ───── Filter Drawer ───── */}
      <div 
        className={`hidden md:block fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity duration-700 ease-in-out ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true" 
      />
      <div 
        role="dialog" 
        aria-label="Filter products"
        className={`hidden md:flex fixed inset-y-0 right-0 z-[80] w-full max-w-sm bg-white border-l border-[var(--color-rule)] shadow-2xl flex-col transform transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-rule)]">
          <h2 className="text-[14px] tracking-[0.18em] uppercase">Filter</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1 hover:text-[var(--color-ink-muted)] rounded-full hover:bg-[var(--color-surface-raised)] transition-colors"
            aria-label="Close filters"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>

        {/* Scrollable contents */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* Color filter */}
          <fieldset className="mb-10">
            <legend className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)] mb-4">Color</legend>
            <div className="flex flex-wrap gap-2">
              <ColorBtn label="All" active={selectedColor === "All"} onClick={() => setSelectedColor("All")} hex="" />
              {availableColors.map((c) => (
                <ColorBtn
                  key={c}
                  label={c}
                  active={selectedColor === c}
                  onClick={() => setSelectedColor(c)}
                  hex={COLOR_NAME_TO_HEX[c] || "#ccc"}
                />
              ))}
            </div>
          </fieldset>

          {/* Material filter */}
          <fieldset className="mb-10">
            <legend className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)] mb-4">Material</legend>
            <div className="space-y-1.5">
              <MatBtn label="All" active={selectedMaterial === "All"} onClick={() => setSelectedMaterial("All")} />
              {availableMaterials.map((m) => (
                <MatBtn key={m} label={m} active={selectedMaterial === m} onClick={() => setSelectedMaterial(m)} />
              ))}
            </div>
          </fieldset>

          {/* Price filter */}
          <fieldset className="mb-10">
            <legend className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)] mb-4">Price</legend>
            <div className="space-y-1.5">
              {ALL_PRICE_RANGES.map((r, i) => (
                <MatBtn key={i} label={r.label} active={priceRangeIdx === i} onClick={() => setPriceRangeIdx(i)} />
              ))}
            </div>
          </fieldset>
        </div>

        {/* Footer with actions */}
        <div className="px-6 py-5 border-t border-[var(--color-rule)] bg-white flex gap-3">
          <button 
            onClick={clearFilters}
            className="flex-1 py-4 rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink)] hover:text-white transition-colors duration-[var(--duration-fast)]"
          >
            Clear
          </button>
          <button 
            onClick={() => setDrawerOpen(false)}
            className="flex-[2] py-4 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] transition-colors duration-[var(--duration-fast)]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───── UI Components ───── */

const TabBtn = memo(function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase whitespace-nowrap border transition-colors duration-[var(--duration-instant)] ${
        active ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]" : "bg-white text-[var(--color-ink-soft)] border-transparent hover:border-[var(--color-ink)]"
      }`}
    >
      {label}
    </button>
  );
});

const ColorBtn = memo(function ColorBtn({ label, active, onClick, hex }: { label: string; active: boolean; onClick: () => void; hex: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-[11px] tracking-[0.12em] uppercase border transition-colors duration-[var(--duration-instant)] ${
        active ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-rule)] hover:border-[var(--color-ink)]"
      }`}
    >
      {hex && (
        <span className="h-4 w-4 rounded-full ring-1 ring-[var(--color-rule)]" style={{ backgroundColor: hex }} />
      )}
      {label}
    </button>
  );
});

const MatBtn = memo(function MatBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-3 rounded-xl text-[12px] tracking-[0.1em] uppercase border transition-colors duration-[var(--duration-instant)] ${
        active ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-rule)] hover:border-[var(--color-surface-raised)]"
      }`}
    >
      {label}
    </button>
  );
});
