import axios from "axios";
import React, { useRef, useState } from "react";
import { BASEURL } from "../..";
import { useUserData } from "../../provider/UserProvider";
import Loading from "../../pageSections/Loading";
import ErrorMessage from "../../UIcomponents/ErrorMessage";

export default function Product({
  name,
  _id,
  categoryId,
  categoryName,
  description,
  price,
  stock,
  subCategoryName,
  mainImage,
  subImages,
  setProducts
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user, setSubCategories } = useUserData();
  const [product, setProduct] = useState({ name, description, price, stock });
  const [displayedProduct, setDisplayedProduct] = useState({
    name,
    description,
    price,
    stock,
  });
  // async function updateProduct() {
  //   const formData = { name: productName };
  //   setLoading(true);
  //   try {
  //     const {name} = (
  //       await axios.put(
  //         `${BASEURL}/category/${categoryId}/product/${_id}`,
  //         formData
  //       )
  //     ).data;

  //     // setDisplayedProductName(name);

  //     setErr("");
  //     setIsUpdating(false);
  //   } catch (err) {
  //     console.error(err);
  //     setErr(err.response.data.err);
  //   }
  //   setLoading(false);
  // }
  // async function deleteProduct() {
  //   setLoading(true);
  //   try {
  //     await axios.delete(`${BASEURL}/category/${categoryId}/product/${_id}`);
  //     setSubCategories((prev) => prev.filter((product) => product._id !== _id));
  //     alert("product deleted");
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setLoading(false);
  // }
  return (
    <div className="flex gap-x-10">
      <div>
        {mainImage && (
          <img
            width={"200px"}
            height={"100px"}
            src={mainImage.secure_url}
            alt="mainImage"
          />
        )}
        <div className="flex"> 
          {subImages &&
            subImages.map((subImage) => (
              <img
                width={50}
                key={subImage.public_id}
                src={subImage.secure_url}
                alt="subImage"
              />
            ))}
        </div>
      </div>
      <div>
        <p className="">
          product name:{" "}
          {isUpdating ? (
            <input
              type="text"
              name="name"
              id="name"
              placeholder="product name"
              className=" inline w-fit"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              value={product.name}
            />
          ) : (
            <span className="text-lg font-semibold">
              {displayedProduct.name}
            </span>
          )}
        </p>
        <p className="">
          product description:{" "}
          {isUpdating ? (
            <input
              type="text"
              name="description"
              id="description"
              placeholder="product description"
              className=" inline w-fit"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, description: e.target.value }))
              }
              value={product.description}
            />
          ) : (
            <span className="text-lg font-semibold">
              {displayedProduct.description}
            </span>
          )}
        </p>
        <p className="">
          product price:{" "}
          {isUpdating ? (
            <input
              type="text"
              name="price"
              id="price"
              placeholder="product price"
              className=" inline w-fit"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              value={product.price}
            />
          ) : (
            <span className="text-lg font-semibold">
              {displayedProduct.price}
            </span>
          )}
        </p>
        <p className="">
          product stock:{" "}
          {isUpdating ? (
            <input
              type="text"
              name="stock"
              id="stock"
              placeholder="product stock"
              className=" inline w-fit"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, stock: e.target.value }))
              }
              value={product.stock}
            />
          ) : (
            <span className="text-lg font-semibold">
              {displayedProduct.stock}
            </span>
          )}
        </p>
        <span className="block">
          category name:{" "}
          <span className="text-lg font-semibold">{categoryName}</span>
        </span>
        <span className="block">
          subcategory name:{" "}
          <span className="text-lg font-semibold">{subCategoryName}</span>
        </span>
        {err && <ErrorMessage err={err} />}
        {user.role === "admin" && (
          <>
            <button
              onClick={() =>
                isUpdating ? "updateProduct()" : setIsUpdating(true)
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
                  // deleteProduct();
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
