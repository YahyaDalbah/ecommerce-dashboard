import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      page not found <br />
      <Link to={"/"} className=" text-blue-400">return to home page</Link>
    </div>
  );
}
