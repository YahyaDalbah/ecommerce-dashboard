import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./pageSections/Nav.jsx";


export default function App() {
  

  return (
    <div className="grid grid-cols-3">
      <Nav></Nav>
      <main className="col-span-2 ml-4 mt-6">
        <Outlet />
      </main>
    </div>
  );
}
