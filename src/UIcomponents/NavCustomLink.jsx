import React from "react";
import { NavLink } from "react-router-dom";
export default function NavCustomLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={`${({ isActive, isPending }) => {
        return isPending ? "pending" : isActive ? "active" : "";
      }} px-2 py-4 rounded-lg`}
    >
      {children}
    </NavLink>
  );
}
