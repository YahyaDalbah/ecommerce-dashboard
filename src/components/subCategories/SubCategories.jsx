import axios from "axios";
import React, { useState } from "react";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import { useUserData } from "../../provider/UserProvider.jsx";
import SubCategory from "./SubCategory.jsx";

export default function SubCategories() {
  const [err, setErr] = useState("");
  const { user, categories, subCategories, setSubCategories, dataLoading } =
    useUserData();
  const [componentLoading, setComponentLoading] = useState(false);

  async function addSubCategory(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    if (formData.categoryId === "") {
      setErr("provide category");
      setComponentLoading(false);
      return;
    }
    setComponentLoading(true);
    try {
      let subCategory = (
        await axios.post(
          `${BASEURL}/category/${formData.categoryId}/subCategory`,
          { name: formData.name }
        )
      ).data;
      const categoryName = categories.find(
        (category) => category.id === subCategory.categoryId
      ).name;

      subCategory = { ...subCategory, categoryName };
      setSubCategories((prev) => [...prev, subCategory]);
      setErr("");
    } catch (err) {
      if (err.response.data.err.includes("duplicate key")) {
        setErr("sub category exists");
      } else {
        setErr(err.response.data.err);
      }
    }
    setComponentLoading(false);
  }
  console.log(subCategories);
  return (
    <>
      {dataLoading || componentLoading ? (
        <div className="dataLoading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="mr-2">
          <h1 className="page-title">SubCategories</h1>
          {user && user.role === "admin" && (
            <form onSubmit={addSubCategory}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="sub category name"
              />
              <select name="categoryId" id="categoryId">
                <option value="">select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {err && <ErrorMessage err={err} />}
              <button className="black-button">Add SubCategory</button>
            </form>
          )}
          <div>
            {subCategories.map((subCategory) => (
              <SubCategory key={subCategory._id} {...subCategory} />
            ))}
            {subCategories.length === 0 && <p>no sub categories</p>}
          </div>
        </div>
      )}
    </>
  );
}
