import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";

type Page =
  | { name: "home" }
  | { name: "category"; parentCategory: string }
  | { name: "product"; productId: string }
  | { name: "search" };

type Props = {
  onNavigate?: (p: Page) => void;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

import { useModalBack } from "../hooks/useModalBack";

export function CartSidebar(_props: Props) {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Custom back button handling for the cart sidebar
  useModalBack(state.isOpen, () => dispatch({ type: "CLOSE" }), "cart");

  useEffect(() => {
    if (state.isOpen) {
      panelRef.current?.focus();
    }
  }, [state.isOpen]);

  useEffect(() => {
    if (!state.isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dispatch({ type: "CLOSE" });
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state.isOpen, dispatch]);

  return (
    <>
      {/* Overlay */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/30"
          onClick={() => dispatch({ type: "CLOSE" })}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-white border-l border-[var(--color-rule)] shadow-[rgba(0,0,0,0.1)_0px_8px_24px_0px] transform transition-transform duration-[var(--duration-fast)] ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-rule)]">
          <h2 className="text-[14px] tracking-[0.18em] uppercase">
            Shopping Bag ({totalItems})
          </h2>
          <button
            onClick={() => dispatch({ type: "CLOSE" })}
            aria-label="Close bag"
            className="p-1 hover:text-[var(--color-ink-muted)]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <p className="font-serif text-[24px] leading-tight">Your bag is empty</p>
            <p className="mt-3 text-[13px] text-[var(--color-ink-muted)]">
              Pieces you add will appear here.
            </p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6 py-6 space-y-5 max-h-[calc(100vh-200px)]">
            {state.items.map((item) => (
              <li
                key={item.product.id}
                className="flex gap-4 pb-5 border-b border-[var(--color-rule)] last:border-b-0"
              >
                <div className="h-20 w-16 flex-shrink-0 bg-[var(--color-surface-raised)]">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium leading-snug">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-[var(--color-ink-muted)] uppercase tracking-[0.1em] mt-1">
                    {item.product.artisan}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[var(--color-rule)]">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QTY",
                            productId: item.product.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        className="px-2.5 py-1 text-[12px] hover:bg-[var(--color-surface-raised)]"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-[12px] tabular-nums min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QTY",
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="px-2.5 py-1 text-[12px] hover:bg-[var(--color-surface-raised)]"
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[13px] tabular-nums">
                      {currency.format(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE", productId: item.product.id })
                    }
                    className="mt-2 text-[11px] tracking-[0.15em] uppercase text-[var(--color-ink-muted)] hover:text-red-600 transition-colors duration-[var(--duration-instant)]"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--color-rule)] bg-white px-6 py-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[12px] tracking-[0.18em] uppercase">Subtotal</span>
              <span className="text-[16px] tabular-nums font-medium">
                {currency.format(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: "CLOSE" })}
              className="block w-full py-4 bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] transition-colors duration-[var(--duration-instant)]"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
