import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home/Home";
import { Category } from "../pages/Category/Category";
import { Product } from "../pages/Product/Product";
import { AccountPage as Account } from "../components/AccountPage";
import { ServicesPage as Services } from "../components/ServicesPage";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif text-[64px] md:text-[80px]">404</h1>
      <p className="mt-4 text-[14px] text-[var(--color-ink-soft)] tracking-wider uppercase">Page Not Found</p>
      <Link to="/" className="mt-10 px-8 py-3 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] transition-colors">
        Return to Home
      </Link>
    </div>
  );
}

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "category/:parentCategory", element: <Category /> },
      { path: "product/:productId", element: <Product /> },
      { path: "account", element: <Account /> },
      { path: "services", element: <Services /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
