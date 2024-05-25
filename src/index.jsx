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
import RecoverPassword from "./components/RecoverPassword.jsx";
import PasswordChanged from "./components/PasswordChanged.jsx";
import UserProvider from "./provider/UserProvider.jsx";
import UserPrivateRoute from "./auth/UserPrivateRoute.jsx";
import AdminPrivateRoute from "./auth/AdminPrivateRoute.jsx";


export const BASEURL = "https://ecommerce-api-three-drab.vercel.app";

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
        path: "/recoverPassword",
        element: <RecoverPassword />
      },
      {
        path: "/recoverPassword/passwordChanged",
        element: <PasswordChanged />
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
        element: <AdminPrivateRoute Component={Coupons} />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <UserPrivateRoute Component={Cart} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
