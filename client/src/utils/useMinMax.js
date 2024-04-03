import { useState, useEffect } from "react";

export const useMinMax = (arr) => {

  // const priceArr = arr?.map((element) => {
  //   return element.price;
  // });

  let priceArr = [];

  useEffect(() => {
    priceArr = arr?.map((element) => {
    return element.price;
  });
  }, [arr]);

  const min = Math.min(...priceArr);
  const max = Math.max(...priceArr);

  return {min, max};
};
