import React from "react";

export default function PageNumber({ num, isActive, onClick }) {
  // Implement your PageNumber component logic here, styling as needed
  return (
    <button
      onClick={onClick}
      className={`${isActive ? "!bg-gray-500" : ""} black-button`}
    >
      {num}
    </button>
  );
}
