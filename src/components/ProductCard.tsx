import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useInView } from "../hooks/useInView";

type Props = {
  product: Product;
  priority?: boolean;
  showCategory?: boolean;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

import { memo, useCallback } from "react";

export const ProductCard = memo(function ProductCard({ product, priority = false, showCategory }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { dispatch } = useCart();
  
  // [PERFORMANCE] IntersectionObserver hook prevents rendering off-screen animations
  const { ref, inView } = useInView({ threshold: 0.1 });

  const firstImage = product.images[0];

  // [PERFORMANCE] useCallback prevents re-creating the event handler on every render
  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    dispatch({ type: "ADD", product });
    dispatch({ type: "OPEN" });
  }, [dispatch, product]);

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
  }, []);

  return (
    <article
      aria-labelledby={`p-${product.id}-name`}
      className="group relative flex flex-col bg-white"
    >
      {/* ───── Image ───── */}
      <Link
        ref={ref}
        to={`/product/${product.id}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[var(--color-surface-raised)] text-left cursor-pointer rounded-2xl shadow-sm"
        aria-label={`View ${product.name}`}
      >
        {!loaded && (
          <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-[var(--color-surface-raised)]" />
        )}
        <img
          src={firstImage}
          alt={product.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
            loaded && inView ? "opacity-100 scale-100 group-hover:scale-[1.04]" : "opacity-0 scale-[1.1]"
          }`}
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 bg-white/90 backdrop-blur-md text-[var(--color-ink)] text-[10px] font-medium tracking-[0.22em] uppercase px-3 py-1.5 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={toggleWishlist}
          className="absolute right-3 top-3 grid place-items-center h-9 w-9 bg-white/90 backdrop-blur-md rounded-full text-[var(--color-ink)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-[var(--duration-fast)] shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M8 14s-5-3.2-5-7a2.8 2.8 0 0 1 5-1.8A2.8 2.8 0 0 1 13 7c0 3.8-5 7-5 7Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={wishlisted ? "currentColor" : "none"}
            />
          </svg>
        </button>

        {/* Quick Add */}
        <div className="absolute inset-x-0 bottom-3 px-3 translate-y-[150%] group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-[var(--duration-fast)]">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="block w-full rounded-full bg-white/95 backdrop-blur-md text-[var(--color-ink)] text-[11px] font-medium tracking-[0.15em] uppercase py-3.5 hover:bg-[var(--color-ink)] hover:text-white transition-colors duration-[var(--duration-fast)] shadow-sm"
          >
            Quick Add
          </button>
        </div>
      </Link>

      {/* ───── Meta ───── */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 id={`p-${product.id}-name`} className="text-[13px] leading-snug text-[var(--color-ink)] font-normal">
            <Link to={`/product/${product.id}`} className="hover:underline underline-offset-4 decoration-1 text-left">
              {product.name}
            </Link>
          </h3>
          <p className="text-[13px] text-[var(--color-ink)] whitespace-nowrap tabular-nums font-medium flex-shrink-0">
            {currency.format(product.price)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
            {product.artisan}
          </p>
          {showCategory && (
            <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
              {product.parentCategory}
            </p>
          )}
        </div>
      </div>
    </article>
  );
});
