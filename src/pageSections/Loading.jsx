import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
