import { useState, useEffect, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toggleSortSelected from "../utils/toggleSortSelected";
import togglePriceSelected from "../utils/togglePriceSelected";
import { getAllMealsThunk } from "../store/thunks/mealThunks/getAllMealsThunk";
import { ModalContext } from "../context/ModalContext";

export const Equalizer = ({ meals, min, max }) => {
  const ascSortRef = useRef();
  const descSortRef = useRef();
  const ascPriceRef = useRef();
  const descPriceRef = useRef();
  const dispatch = useDispatch();
  const { setModalOpen } = useContext(ModalContext);
  const [minPrice] = useState(min);
  const [maxPrice] = useState(max);
  const [desiredPrice, setDesiredPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("name");
  const [priceOrder, setPriceOrder] = useState("price");
  const [searchParams, setSearchParams] = useSearchParams();

  const { status } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  const handlePriceChange = (e) => {
    setDesiredPrice(e.target.value);
  };

  const handleSortPriceOrder = (e) => {
    if (e.target.name === "sort") {
      sortOrder === "name" ? setSortOrder("-name") : setSortOrder("name");
    }

    if (e.target.name === "price") {
      priceOrder === "price" ? setPriceOrder("-price") : setPriceOrder("price");
    }
  };

  const handleModalClose = (e) => {
    document.querySelector(".app-container").classList.remove("blur");

    setModalOpen(false);

    setSearchParams();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      sort: searchParams.get("sort"),
      price: searchParams.get("price[lte]"),
    };

    dispatch(getAllMealsThunk(data));

    handleModalClose();
  };

  useEffect(() => {
    setSearchParams(
      {
        sort: `${sortOrder},${priceOrder}`,
        "price[lte]": desiredPrice || minPrice,
      },
      { replace: true }
    );
  }, [sortOrder, priceOrder, desiredPrice]);

  return (
    <div className="modal-message border border-secondary">
      <form className="w-100" onSubmit={handleSubmit}>
        <h1 className="mt-5" style={{ color: "#333" }}>
          Sort, Filter, and More...
        </h1>
        <div
          className="d-flex justify-content-center mb-3"
        >
          <div
            id="sort-container"
            className="d-flex justify-content-between w-50 mt-2 align-items-center pb-3"
          >
            <label htmlFor="exampleInputEmail1">Sort</label>
            <input
              ref={ascSortRef}
              hidden
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
              name="sort"
              value={1}
              onChange={handleSortPriceOrder}
            />
            <i
              className="fa fa-sort-alpha-asc fa-2x selected"
              aria-hidden="true"
              onClick={(e) => {
                toggleSortSelected(e);
                ascSortRef.current.click();
              }}
            ></i>
            <input
              ref={descSortRef}
              hidden
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
              name="sort"
              value={-1}
              onChange={handleSortPriceOrder}
            />
            <i
              className="fa fa-sort-alpha-desc fa-2x"
              aria-hidden="true"
              onClick={(e) => {
                toggleSortSelected(e);
                descSortRef.current.click();
              }}
            ></i>
          </div>
        </div>
        <div
          className="d-flex justify-content-center mb-3"
        >
          <div
            id="price-container"
            className="d-flex justify-content-between w-50 mt-1 align-items-center pb-3"
          >
            <label className="m-0" style={{marginRight: "-30px"}} htmlFor="exampleInputEmail1">
              Price
            </label>
            <input
              ref={ascPriceRef}
              hidden
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
              name="price"
              value={1}
              onChange={handleSortPriceOrder}
            />
            <i
              className="fa fa-sort-numeric-asc fa-2x selected"
              aria-hidden="true"
              onClick={(e) => {
                togglePriceSelected(e);
                ascPriceRef.current.click();
              }}
            ></i>
            <input
              ref={descPriceRef}
              hidden
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
              name="price"
              value={-1}
              onChange={handleSortPriceOrder}
            />
            <i
              className="fa fa-sort-numeric-desc fa-2x"
              aria-hidden="true"
              onClick={(e) => {
                togglePriceSelected(e);
                descPriceRef.current.click();
              }}
            ></i>
          </div>
        </div>
        <div
          //   id="sort-container"
          className="d-flex justify-content-center mb-4"
        >
          {/* <div className="w-100 mt-3 mx-5"> */}
          <div className="w-100 mx-5 form-group my-2">
            <label className="mb-2" htmlFor="formControlRange">
              Price Range
            </label>
            <input
              type="range"
              id="price-range"
              className="form-control-range"
              min={minPrice}
              max={maxPrice}
              step={((maxPrice - minPrice) / meals?.length)?.toFixed(2)}
              onChange={handlePriceChange}
              value={desiredPrice || 0}
            />
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: "600" }}>${minPrice}</span>
              {desiredPrice && (
                <span>
                  Your budget ={" "}
                  <span style={{ color: "#d7456b", fontWeight: "600" }}>
                    ${desiredPrice}
                  </span>
                </span>
              )}
              <span style={{ fontWeight: "600" }}>${maxPrice}</span>
            </div>
          </div>
        </div>
        <div className="button-div-sort d-flex justify-content-center mt-3">
          <button
            className="btn py-2 px-5 w-75"
            id="filter-btn"
          >
            Apply Filter
          </button>
        </div>
      </form>
    </div>
  );
};
