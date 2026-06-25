import { useState, useEffect, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useInView } from "../../hooks/useInView";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});

import { motion, AnimatePresence } from "framer-motion";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import type { PanInfo } from "framer-motion";

export function Product() {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [mainLoaded, setMainLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const { dispatch } = useCart();
  const { ref: mainImgRef, inView: mainInView } = useInView({ threshold: 0.1 });

  useDocumentTitle(product ? product.name : "Product Not Found");

  useEffect(() => { setMainLoaded(false); }, [selectedImage, productId]);

  const paginate = (newDirection: number) => {
    if (!product) return;
    setDirection(newDirection);
    setSelectedImage((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = product.images.length - 1;
      if (next >= product.images.length) next = 0;
      return next;
    });
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) paginate(1);
    else if (swipe > 50) paginate(-1);
  };

  if (!product) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="font-serif text-[28px]">Product not found</p>
        <Link to="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase">
          Back to Home
        </Link>
      </div>
    );
  }

  // Related: same sub-category
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.subCategory === product.subCategory).slice(0, 4);

  function handleAddToBag() {
    dispatch({ type: "ADD", product: product! });
    dispatch({ type: "OPEN" });
  }

  return (
    <div className="bg-white">
      {/* ───── Breadcrumb ───── */}
      <nav aria-label="Breadcrumb" className="px-4 md:px-6 pt-6 pb-2 text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link to="/" className="hover:text-[var(--color-ink)]">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to={`/category/${product.parentCategory}`} className="hover:text-[var(--color-ink)]">{product.parentCategory}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--color-ink)] truncate max-w-[20ch]">{product.name}</li>
        </ol>
      </nav>

      {/* ───── Main layout ───── */}
      <div className="px-4 md:px-6 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div ref={mainImgRef} className="group aspect-[4/5] w-full bg-[var(--color-surface-raised)] overflow-hidden mb-3 relative rounded-3xl touch-pan-y cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={`${product.alt} — Image ${selectedImage + 1}`}
                onLoad={() => setMainLoaded(true)}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: mainLoaded && mainInView ? 1 : 0, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                  mainLoaded && mainInView ? "scale-100" : "scale-[1.1]"
                }`}
              />
            </AnimatePresence>

            {/* Desktop Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); paginate(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); paginate(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-none" role="tablist" aria-label="Product image thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i} role="tab" aria-selected={i === selectedImage} onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 h-20 w-16 border-2 rounded-xl overflow-hidden transition-[border-color] duration-[var(--duration-instant)] ${
                    i === selectedImage ? "border-[var(--color-ink)]" : "border-transparent hover:border-[var(--color-rule)]"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-5 lg:pt-8">
          {product.badge && (
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-ink)] text-white text-[10px] tracking-[0.22em] uppercase">{product.badge}</span>
          )}
          <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-muted)] mb-2">
            {product.parentCategory} · {product.subCategory} · {product.material}
          </p>
          <h1 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.01em]">{product.name}</h1>
          <p className="mt-2 text-[14px] text-[var(--color-ink-muted)]">by {product.artisan}</p>
          <p className="mt-6 text-[28px] tabular-nums font-medium">{currency.format(product.price)}</p>
          <p className="mt-6 text-[14px] leading-[1.8] text-[var(--color-ink-soft)]">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.22em] uppercase mb-3">
                Color: <span className="text-[var(--color-ink-muted)]">{product.colorNames[selectedColorIdx]}</span>
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {product.colors.map((c, i) => (
                  <button
                    key={i} type="button"
                    aria-label={product.colorNames[i] || `Color ${i + 1}`}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`h-8 w-8 rounded-full ring-1 transition-all duration-[var(--duration-instant)] ${
                      i === selectedColorIdx ? "ring-[var(--color-ink)] ring-2 scale-110 shadow-md" : "ring-[var(--color-rule)] hover:ring-[var(--color-ink)]"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToBag}
              className="flex-1 py-4 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] active:translate-y-px transition-[background-color,transform] duration-[var(--duration-instant)] shadow-md"
            >
              Add to Bag
            </button>
            <Link 
              to="/services"
              className="flex-1 py-4 rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink)] hover:text-white transition-colors duration-[var(--duration-fast)] text-center block"
            >
              Bespoke Inquiry
            </Link>
          </div>

          {/* Details */}
          <dl className="mt-12 border-t border-[var(--color-rule)] pt-8 space-y-5">
            <DetailRow label="Artisan" value={product.artisan} />
            <DetailRow label="Category" value={product.subCategory} />
            <DetailRow label="Material" value={product.material} />
            <DetailRow label="Edition" value={product.badge === "Limited" ? "Limited of 40" : "Open Edition"} />
            <DetailRow label="Shipping" value="Complimentary over $200" />
          </dl>
        </div>
      </div>

      {/* ───── You May Also Like ───── */}
      {related.length > 0 && (
        <div className="px-4 md:px-6 pb-20 md:pb-28">
          <h2 className="font-serif text-[28px] md:text-[36px] leading-tight mb-10">
            You May Also Like
          </h2>
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/product/${p.id}`}
                  onClick={() => { setSelectedImage(0); setSelectedColorIdx(0); }}
                  className="group text-left w-full block"
                >
                  <div className="aspect-[3/4] w-full bg-[var(--color-surface-raised)] overflow-hidden mb-4 relative rounded-2xl shadow-sm">
                    <RelatedImage src={p.images[0] || ""} alt={p.name} />
                  </div>
                  <p className="text-[13px]">{p.name}</p>
                  <p className="text-[13px] text-[var(--color-ink-muted)] mt-0.5">{p.material}</p>
                  <p className="text-[13px] tabular-nums mt-1 font-medium">{currency.format(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[12px] tracking-[0.15em] uppercase text-[var(--color-ink-muted)]">{label}</dt>
      <dd className="text-[13px] text-right font-medium">{value}</dd>
    </div>
  );
}

const RelatedImage = memo(function RelatedImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <img 
      ref={ref}
      src={src} 
      alt={alt} 
      loading="lazy" 
      onLoad={() => setLoaded(true)}
      className={`h-full w-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(.2,.8,.2,1)] absolute inset-0 ${loaded && inView ? "opacity-100 scale-100 group-hover:scale-[1.04]" : "opacity-0 scale-[1.2]"}`} 
    />
  );
});
