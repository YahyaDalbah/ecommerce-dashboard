import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "../../index.jsx";
import CartProduct from "./CartProduct.jsx";
import Loading from "../../pageSections/Loading.jsx";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  async function getCart() {
    setLoading(true);
    try {
      const cart = (await axios.get(`${BASEURL}/cart`)).data;
      const { products } = cart;
      setCartProducts(products);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    let sum = 0
    cartProducts.forEach(cartProduct => {
      sum += cartProduct.qty * cartProduct.price
    })
    setTotalSum(sum)
  },[cartProducts])
  console.log(cartProducts);
  return (
    <>
      {!loading ? (
        <div>
          <h1 className="page-title">Cart</h1>
          {cartProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2">
                {cartProducts.map((cartProduct) => {
                  return (
                    <CartProduct
                      key={cartProduct._id}
                      setCartProducts={setCartProducts}
                      {...cartProduct}
                    />
                  );
                })}
              </div>
              <p className="text-xl">total sum = {totalSum}</p>
            </>
          ) : (
            <p>no products</p>
          )}
        </div>
      ) : (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}
    </>
  );
}
