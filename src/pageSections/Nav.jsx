import React from "react";
import NavCustomLink from "../UIcomponents/NavCustomLink.jsx";
export default function Nav() {
  return (
    <nav className="flex flex-col px-2 py-3 gap-y-2 bg-navGray h-svh pt-16">
      <NavCustomLink to={"/"}>Home</NavCustomLink>
      <NavCustomLink to={"/user"}>User</NavCustomLink>
      <NavCustomLink to={"/categories"}>Categories</NavCustomLink>
      <NavCustomLink to={"/subCategories"}>SubCategories</NavCustomLink>
      <NavCustomLink to={"/brands"}>Brands</NavCustomLink>
      <NavCustomLink to={"/coupons"}>Coupons</NavCustomLink>
      <NavCustomLink to={"/products"}>Products</NavCustomLink>
      {/* <NavCustomLink to={"/cart"}>Cart</NavCustomLink> */}
    </nav>
  );
}
