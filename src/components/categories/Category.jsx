import axios from "axios";
import React, { useRef, useState } from "react";
import { BASEURL } from "../..";
import { useUserData } from "../../provider/UserProvider";
import Loading from "../../pageSections/Loading";
import ErrorMessage from "../../UIcomponents/ErrorMessage";

export default function Category({ name, id }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user } = useUserData();
  const [categoryName, setCategoryName] = useState(name);
  const formRef = useRef(null);
  async function updateCategory() {
    const formData = { name: categoryName };
    setLoading(true);
    try {
      const name = (await axios.put(`${BASEURL}/category/${id}`, formData))
        .data.name;
      setCategoryName(name);
      setErr("");
      setIsUpdating(false);
    } catch (err) {
      console.error(err);
      setErr(err.response.data.err);
    }
    setLoading(false);
  }

  return (
    <div className="flex gap-x-10">
      <div>
        <p className="">
          category name:{" "}
          {isUpdating ? (
            <form
              ref={formRef}
              className="inline"
              id="updateCategoryForm"
              onSubmit={(e) => {
                e.preventDefault();
                updateCategory();
              }}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="category name"
                className=" inline w-fit"
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
              />
            </form>
          ) : (
            <span className="text-lg font-semibold">{categoryName}</span>
          )}
        </p>
        {err && <ErrorMessage err={err} />}
        {user.role === "admin" && (
          <>
            <button
              onClick={() =>
                isUpdating ? updateCategory() : setIsUpdating(true)
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
                  //delete
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
