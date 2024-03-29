import { useState } from "react";

export const useMinMax = (arr) => {

  const priceArr = arr.map((element) => {
    return element.price;
  });

  const min = Math.min(...priceArr);
  const max = Math.max(...priceArr);

  return {min, max};
};
