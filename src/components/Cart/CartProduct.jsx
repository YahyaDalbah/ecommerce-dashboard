import React, { useState } from "react";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import axios from "axios";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";

export default function CartProduct({
  productId,
  setCartProducts,
  name,
  price,
  qty,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputQty, setInputQty] = useState(qty);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function updateCart(qty) {
    setLoading(true);
    try {
      await axios.put(`${BASEURL}/cart`, { qty, productId });
      setCartProducts((prev) => {
        if (qty === 0) {
          return prev.filter((product) => product.productId !== productId);
        } else {
          return prev.map((product) =>
            product.productId === productId ? { ...product, qty } : product
          );
        }
      });
      setIsUpdating(false);
      setErr("");
    } catch (err) {
      console.error(err);
      setErr(err.response.data.err);
    }
    setLoading(false);
  }
  return (
    <div className="flex">
      <div>
        <p>
          name: <span className="text-lg font-semibold">{name}</span>
        </p>
        <p>
          price: <span className="text-lg font-semibold">{price}</span>
        </p>
        <p>
          qty:{" "}
          {isUpdating ? (
            <input
              type="text"
              name="qty"
              className=" inline w-fit"
              value={inputQty}
              onChange={(e) => setInputQty(e.target.value)}
              placeholder="type 0 to delete"
            />
          ) : (
            <span className="text-lg font-semibold">{qty}</span>
          )}
        </p>
        <ErrorMessage err={err} />
        <button
          onClick={() =>
            isUpdating ? updateCart(inputQty) : setIsUpdating(true)
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
              updateCart(0);
            }
            setErr("");
          }}
          className={`${isUpdating ? "black-button" : "red-button"}`}
        >
          {isUpdating ? "cancel" : "delete"}
        </button>
        <p className="my-2">--------------------------</p>
      </div>
      {loading && <Loading />}
    </div>
  );
}
