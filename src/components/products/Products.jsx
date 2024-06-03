import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import { useUserData } from "../../provider/UserProvider.jsx";
import Product from "./Product.jsx";

export default function Products() {
  const [err, setErr] = useState("");
  const { user, categories, subCategories, loading } = useUserData();
  const [products, setProducts] = useState([]);
  const [componentLoading, setComponentLoading] = useState(false);
  const getProducts = useCallback(async () => {
    setComponentLoading(true);
    try {
      const products = (await axios.get(`${BASEURL}/product`)).data;
      setProducts(
        products.map((product) => {
          const categoryName = categories.find(
            (category) => category._id === product.categoryId
          ).name;
          const subCategoryName = subCategories.find(
            (subCategory) => subCategory._id === product.subCategoryId
          ).name;
          return { ...product, categoryName, subCategoryName };
        })
      );
    } catch (err) {
      console.error(err);
    }
    setComponentLoading(false);
  }, [categories, subCategories]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  async function addProduct(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    if (formData.categoryId === "") {
      setErr("provide category");
      setComponentLoading(false);
      return;
    }
    if (formData.subCategoryId === "") {
      setErr("provide subcategory");
      setComponentLoading(false);
      return;
    }
    setComponentLoading(true);

    try {
      let product = (await axios.post(`${BASEURL}/product`, formData)).data;

      setProducts((prev) => [...prev, product]);
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
  console.log(products);
  return (
    <>
      {loading || componentLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="mr-2">
          <h1 className="page-title">Products</h1>
          {user && user.role === "admin" && (
            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="product name"
              />
              <input
                type="text"
                name="description"
                id="description"
                placeholder="product description"
              />
              <input
                type="number"
                name="price"
                id="price"
                placeholder="product price in dollars"
              />
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="product stock"
              />
              <select name="categoryId" id="categoryId">
                <option value="">select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select name="subCategoryId" id="subCategoryId">
                <option value="">select sub category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {err && <ErrorMessage err={err} />}
              <button className="black-button">Add product</button>
            </form>
          )}
          <div>
            {products.map((product) => (
              <Product key={product._id} {...product} />
            ))}
            {products.length === 0 && <p>no products</p>}
          </div>
        </div>
      )}
    </>
  );
}
