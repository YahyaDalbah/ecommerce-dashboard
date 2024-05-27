import axios from "axios";
import React, { useState } from "react";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import { useUserData } from "../../provider/UserProvider.jsx";
import Category from "./Category.jsx";

export default function Categories() {
  const [err, setErr] = useState("");
  const { categories, setCategories, loading } = useUserData();
  const [componentLoading, setComponentLoading] = useState(false);
  async function addCategory(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    setComponentLoading(true);
    try {
      const category = (await axios.post(`${BASEURL}/category`, formData)).data;
      setCategories((prev) => [...prev, category]);
      setErr("");
    } catch (err) {
      if (err.response.data.err.includes("duplicate key")) {
        setErr("category exists");
      } else {
        setErr(err.response.data.err);
      }
    }
    setComponentLoading(false);
  }
  console.log(categories)
  return (
    <>
      {loading || componentLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="mr-2">
          <h1 className="page-title">Categories</h1>
          <form onSubmit={addCategory}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="category name"
            />
            {err && <ErrorMessage err={err} />}
            <button className="black-button">Add Category</button>
          </form>
          <div>
            {categories.map((category) => (
              <Category key={category.id} {...category} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
