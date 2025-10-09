import React, { useEffect } from "react";
import NecklaceCarousel from "../pagesinfo/Necklace";
import NecklaceApi from "../lib/necklaceApi";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
function Necklace() {
  return (
    <>
      <NecklaceCarousel />
      <div style={{ display: "flex", flexWrap: "wrap", margin: "12px" }}>
        {NecklaceApi.map((element, id) => (
          <ProductCard product={element} />
        ))}
      </div>
    </>
  );
}

export default Necklace;
