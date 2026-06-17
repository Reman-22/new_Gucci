import { createContext, useContext, useReducer, useEffect, useMemo, type ReactNode } from "react";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import type { Product } from "../data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

// CONSTANTS for Encryption & Storage
const CART_STORAGE_KEY = "maison_arte_cart";
// In a real production application, avoid hardcoding keys on the client-side if possible,
// but for client-side only encryption, this serves to obfuscate data from casual inspection.
const SECRET_KEY = "maison_arte_secure_key_2026"; 

/**
 * Loads and decrypts the initial cart state from localStorage.
 * Runs only once during context initialization.
 */
function loadInitialState(): CartState {
  try {
    const encryptedData = localStorage.getItem(CART_STORAGE_KEY);
    if (!encryptedData) return { items: [], isOpen: false };
    
    // Decrypt the stored string
    const bytes = AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedString = bytes.toString(Utf8);
    
    if (!decryptedString) return { items: [], isOpen: false };
    
    const parsedData = JSON.parse(decryptedString);
    return {
      items: Array.isArray(parsedData.items) ? parsedData.items : [],
      isOpen: false, // Ensure the UI drawer is closed on initial load
    };
  } catch (error) {
    console.error("Failed to decrypt or parse cart state:", error);
    return { items: [], isOpen: false };
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity ?? 1 }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Pass loadInitialState as the lazy initializer function to useReducer
  // This ensures it only runs once and doesn't block re-renders.
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  // [PERFORMANCE & SECURITY]
  // Persist and encrypt state to localStorage whenever items change.
  useEffect(() => {
    let isActive = true; // Cleanup flag to prevent memory leaks if component unmounts quickly

    const encryptAndSave = async () => {
      try {
        // Yield to the event loop: Prevents blocking the main UI thread (maintaining 60fps) 
        // during the potentially expensive stringify & AES encryption calculations.
        await new Promise((resolve) => setTimeout(resolve, 0));

        if (!isActive) return;

        // Encrypt only the sensitive/persistent items array (isOpen is transient UI state)
        const dataToStore = JSON.stringify({ items: state.items });
        const encryptedString = AES.encrypt(dataToStore, SECRET_KEY).toString();
        
        localStorage.setItem(CART_STORAGE_KEY, encryptedString);
      } catch (error) {
        console.error("Failed to encrypt and save cart state:", error);
      }
    };

    encryptAndSave();

    // [MEMORY LEAK PREVENTION] Cleanup function
    return () => {
      isActive = false;
    };
  }, [state.items]);

  // [PERFORMANCE] 
  // Memoize heavy derived state calculations (aggregations) to avoid recalculating 
  // them on every render unless the dependencies (state.items) actually change.
  const { totalItems, totalPrice } = useMemo(() => {
    let itemsCount = 0;
    let priceSum = 0;
    for (const item of state.items) {
      itemsCount += item.quantity;
      priceSum += item.product.price * item.quantity;
    }
    return { totalItems: itemsCount, totalPrice: priceSum };
  }, [state.items]);

  // [PERFORMANCE]
  // Memoize the context value object itself so consumer components 
  // do not unnecessarily re-render if the object reference changes on every render.
  const contextValue = useMemo(
    () => ({ state, dispatch, totalItems, totalPrice }),
    [state, totalItems, totalPrice]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
