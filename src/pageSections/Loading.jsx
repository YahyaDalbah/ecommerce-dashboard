import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <Oval
        visible={true}
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperClass=""
      />
    </>
  );
}
