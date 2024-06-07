import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import { useUserData } from "../../provider/UserProvider.jsx";
import Product from "./Product.jsx";
import PageNumber from "./PageNumber.jsx";

export default function Products() {
  const [err, setErr] = useState("");
  const { user, categories, subCategories, dataLoading } = useUserData();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [componentLoading, setComponentLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm) // Case-insensitive search
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageNumbers = [];
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumber
          key={i} // Add unique key for each page number
          num={i}
          isActive={currentPage === i} // Highlight current page
          onClick={() => handlePageChange(i)} // Pass handlePageChange function
        />
      );
    }
  }
  async function addProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
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
      let product = (
        await axios.post(`${BASEURL}/product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;

      setProducts((prev) => [...prev, product]);
      setErr("");
    } catch (err) {
      if (err.response.data.err.code) {
        setErr(err.response.data.err.code);
      } else {
        setErr(err.response.data.err);
      }
      console.error(err);
    }
    setComponentLoading(false);
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };
  console.log(products);
  return (
    <>
      {(dataLoading || componentLoading) ? (
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
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select name="subCategoryId" id="subCategoryId">
                <option value="">select sub category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {err && <ErrorMessage err={err} />}
              <label htmlFor="mainImage">main image</label>
              <input type="file" name="mainImage" id="mainImage" />
              <label htmlFor="subImages">
                sub images, you can choose up to 5 files
              </label>
              <input type="file" multiple name="subImages" id="subImages" />
              <button className="black-button">Add product</button>
            </form>
          )}
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search"
            onChange={handleSearch}
          />
          <div className="grid grid-cols-2">
            {paginatedProducts.map((product) => (
              <Product
                key={product._id}
                products={products}
                setProducts={setProducts}
                {...product}
              />
            ))}
            {products.length === 0 && <p>no products</p>}
          </div>

          <footer className="mb-10 flex justify-around">{pageNumbers}</footer>
        </div>
      )}
    </>
  );
}
