import axios from "axios";
import React, { useRef, useState } from "react";
import { BASEURL } from "../..";
import { useUserData } from "../../provider/UserProvider";
import Loading from "../../pageSections/Loading";
import ErrorMessage from "../../UIcomponents/ErrorMessage";

export default function SubCategory({ name, _id, categoryId, categoryName }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user, setSubCategories } = useUserData();
  const [subCategoryName, setSubCategoryName] = useState(name);
  const [displayedSubCategoryName, setDisplayedSubCategoryName] =
    useState(name);
  const formRef = useRef(null);
  async function updateSubCategory() {
    const formData = { name: subCategoryName };
    setLoading(true);
    try {
      const name = (
        await axios.put(
          `${BASEURL}/category/${categoryId}/subCategory/${_id}`,
          formData
        )
      ).data.name;

      setDisplayedSubCategoryName(name);
      setSubCategories((prev) =>
        prev.map((subCategory) =>
          subCategory._id === _id ? { ...subCategory, name } : subCategory
        )
      );

      setErr("");
      setIsUpdating(false);
    } catch (err) {
      console.error(err);
      setErr(err.response.data.err);
    }
    setLoading(false);
  }
  async function deleteSubCategory() {
    setLoading(true);
    try {
      await axios.delete(
        `${BASEURL}/category/${categoryId}/subCategory/${_id}`
      );
      setSubCategories((prev) =>
        prev.filter((subCategory) => subCategory._id !== _id)
      );
      alert("sub category deleted");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  return (
    <div className="flex gap-x-10">
      <div>
        <p className="">
          sub category name:{" "}
          {isUpdating ? (
            <form
              ref={formRef}
              className="inline"
              id="updateCategoryForm"
              onSubmit={(e) => {
                e.preventDefault();
                updateSubCategory();
              }}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="category name"
                className=" inline w-fit"
                onChange={(e) => setSubCategoryName(e.target.value)}
                value={subCategoryName}
              />
            </form>
          ) : (
            <span className="text-lg font-semibold">
              {displayedSubCategoryName}
            </span>
          )}
          <span className="block">
            category name:{" "}
            <span className="text-lg font-semibold">{categoryName}</span>
          </span>
        </p>
        {err && <ErrorMessage err={err} />}
        {user.role === "admin" && (
          <>
            <button
              onClick={() =>
                isUpdating ? updateSubCategory() : setIsUpdating(true)
              }
              className="mr-2 white-button"
            >
              update
            </button>
            <button
              onClick={() => {
                if (isUpdating) {
                  setIsUpdating(false);
                } else {
                  deleteSubCategory();
                }
                setErr("");
              }}
              className={`${isUpdating ? "black-button" : "red-button"}`}
            >
              {isUpdating ? "cancel" : "delete"}
            </button>
          </>
        )}
        <p className="my-2">--------------------------</p>
      </div>
      {loading && <Loading />}
    </div>
  );
}
