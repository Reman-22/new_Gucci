import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { routes } from "./routes";

const router = createBrowserRouter(routes,{
  basename:"/New_Gucci"
});

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
