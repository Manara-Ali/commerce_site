import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllMealsThunk } from "../store";
import { getPaginatedMealsThunk, storePagination } from "../store";

export const usePagination = (query, pageNumber) => {
  const dispatch = useDispatch();

  let { totalMeals, paginatedMeals, status } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  useEffect(() => {
    dispatch(getPaginatedMealsThunk({ pageNumber }));
  }, [query, pageNumber]);

  useEffect(() => {
    dispatch(storePagination())
  }, [paginatedMeals]);

  return { totalMeals, paginatedMeals };
};
