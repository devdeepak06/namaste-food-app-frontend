// src/AppRoutes.jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./components/Home";
import Body from "./components/Body";
import RestaurantMenu from "./components/RestaurantMenu";
import About from "./components/About";
import CartDrawer from "./components/CartDrawer";
import { lazy, StrictMode, Suspense } from "react";
// import Grocery from "./components/Grocery";
//chunking
//code spliting
//dynamic bundling
//lazy loading/on demand loading
const Grocery = lazy(() => import("./components/Grocery"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurants",
        element: <Body />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <CartDrawer />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
