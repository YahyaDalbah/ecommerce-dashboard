import React from "react";
import { Link } from "react-router-dom";

export default function NotAuthedPage({ linkText }) {
  return (
    <p>
      you must be{" "}
      <Link className="text-blue-400" to={"/user"}>
        {linkText}
      </Link>{" "}
      to view this page
    </p>
  );
}
