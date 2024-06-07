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
  setProducts,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user } = useUserData();
  const [inputProduct, setInputProduct] = useState({
    name,
    description,
    price,
    stock,
  });
  const [qty, setQty] = useState(1);
  async function updateProduct() {
    const formData = {
      name: inputProduct.name,
      description: inputProduct.description,
      price: inputProduct.price,
      stock: inputProduct.stock,
    };
    setLoading(true);
    try {
      const { name, description, price, stock } = (
        await axios.put(`${BASEURL}/product/${_id}`, formData)
      ).data;
      console.log(name, description, price, stock);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === _id
            ? { ...product, name, description, price, stock }
            : product
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
  async function deleteProduct() {
    setLoading(true);
    try {
      await axios.delete(`${BASEURL}/product/${_id}`);
      setProducts((prev) => prev.filter((product) => product._id !== _id));
      alert("product deleted");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  async function addProductToCart() {
    setLoading(true);
    try {
      const cart = await axios.post(`${BASEURL}/cart`, { productId: _id, qty });
      setProducts((prev) =>
        prev.map((product) =>
          product._id === _id
            ? { ...product, stock: product.stock - qty }
            : product
        )
      );
      console.log(cart.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
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
                setInputProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              value={inputProduct.name}
            />
          ) : (
            <span className="text-lg font-semibold">{name}</span>
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
                setInputProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={inputProduct.description}
            />
          ) : (
            <span className="text-lg font-semibold">{description}</span>
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
                setInputProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              value={inputProduct.price}
            />
          ) : (
            <span className="text-lg font-semibold">{price}</span>
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
                setInputProduct((prev) => ({ ...prev, stock: e.target.value }))
              }
              value={inputProduct.stock}
            />
          ) : (
            <span className="text-lg font-semibold">{stock}</span>
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
                isUpdating ? updateProduct() : setIsUpdating(true)
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
                  deleteProduct();
                }
                setErr("");
              }}
              className={`${isUpdating ? "black-button" : "red-button"}`}
            >
              {isUpdating ? "cancel" : "delete"}
            </button>
          </>
        )}
        {user.role === "user" && stock > 0 && (
          <>
            <div className="flex gap-x-2 items-center">
              <button
                className="white-button"
                onClick={() => qty < stock && setQty(qty + 1)}
              >
                +
              </button>
              <span>{qty}</span>
              <button
                className="black-button"
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                -
              </button>
            </div>
            <div>
              <button className="white-button" onClick={addProductToCart}>
                add to cart
              </button>
            </div>
          </>
        )}
        {stock === 0 && <p className="text-3xl font-bold">out of stock</p>}
        <p className="my-2">--------------------------</p>
      </div>
      {loading && <Loading />}
    </div>
  );
}
