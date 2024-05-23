import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pageSections/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import User from "./components/User.jsx";
import Categories from "./components/Categories.jsx";
import SubCategories from "./components/SubCategories.jsx";
import Brands from "./components/Brands.jsx";
import Coupons from "./components/Coupons.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/subCategories",
        element: <SubCategories />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/coupons",
        element: <Coupons />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
