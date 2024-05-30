import React from "react";
import NavCustomLink from "../UIcomponents/NavCustomLink.jsx";
import { useUserData } from "../provider/UserProvider.jsx";
export default function Nav() {
  const { user } = useUserData();
  return (
    <nav className="flex flex-col px-2 py-3 gap-y-2 bg-navGray h-svh pt-16">
      <NavCustomLink to={"/"}>Home</NavCustomLink>
      <NavCustomLink to={"/user"}>User</NavCustomLink>
      <NavCustomLink to={"/categories"}>Categories</NavCustomLink>
      <NavCustomLink to={"/subCategories"}>SubCategories</NavCustomLink>
      <NavCustomLink to={"/products"}>Products</NavCustomLink>
      {user && user.role === "admin" && (
        <NavCustomLink to={"/coupons"}>Coupons (admin only)</NavCustomLink>
      )}
      {user && user.role === "user" && (
        <NavCustomLink to={"/cart"}>Cart (user only)</NavCustomLink>
      )}
    </nav>
  );
}
