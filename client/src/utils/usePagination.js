import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllMealsThunk } from "../store";

export const usePagination = (query, pageNumber) => {
    const dispatch = useDispatch()
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        dispatch(getAllMealsThunk({pageNumber}));
    }, [query, pageNumber]);
    
    return null;
}