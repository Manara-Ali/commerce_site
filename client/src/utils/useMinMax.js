import { useState } from "react";

export const useMinMax = (arr) => {

  const priceArr = arr.map((element) => {
    return element.price;
  });

  const minPrice = Math.min(...priceArr);
  const maxPrice = Math.max(...priceArr);

  return {minPrice, maxPrice};
};
