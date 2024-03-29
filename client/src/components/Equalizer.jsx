import { useState, useRef } from "react";
import { useMinMax } from "../utils/useMinMax";
import toggleSortSelected from "../utils/toggleSortSelected";
import togglePriceSelected from "../utils/togglePriceSelected";

export const Equalizer = ({ meals }) => {
  const ascSortRef = useRef();
  const descSortRef = useRef();
  const ascPriceRef = useRef();
  const descPriceRef = useRef();
  const { minPrice, maxPrice } = useMinMax(meals);
  const [desiredPrice, setDesiredPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [priceOrder, setPriceOrder] = useState(1);

  const handlePriceChange = (e) => {
    setDesiredPrice(e.target.value);
  };

  const handleSortPriceOrder = (e) => {
    if (e.target.name === "sort") {
      setSortOrder((sortOrder) => -sortOrder);
    }

    if (e.target.name === "price") {
      setPriceOrder((priceOrder) => -priceOrder);
    }
  };

  console.log({ sortOrder, priceOrder });

  return (
    <div className="modal-message border border-secondary">
      <form className="w-100">
        <h1 className="mt-5" style={{ color: "#333" }}>
          Sort, Filter, and More...
        </h1>
        {/* <div className="d-flex justify-content-center">
            <div className="delete-image">
          </div>
          </div> */}
        <div
          //   id="sort-container"
          className="d-flex justify-content-center mb-4"
        >
          <div
            id="sort-container"
            className="d-flex justify-content-between w-50 mt-3 align-items-center pb-3"
          >
            <label for="exampleInputEmail1">Sort</label>
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
              class="fa fa-sort-alpha-desc fa-2x"
              aria-hidden="true"
              onClick={(e) => {
                toggleSortSelected(e);
                descSortRef.current.click();
              }}
            ></i>
          </div>
        </div>
        <div
          //   id="sort-container"
          className="d-flex justify-content-center mb-4"
        >
          <div id="price-container" className="d-flex justify-content-between w-50 mt-3 align-items-center pb-3">
            <label className="m-0" for="exampleInputEmail1">
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
                ascSortRef.current.click();
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
                descSortRef.current.click();
              }}
            ></i>
          </div>
        </div>
        <div
          //   id="sort-container"
          className="d-flex justify-content-center mb-4"
        >
          {/* <div className="w-100 mt-3 mx-5"> */}
          <div className="w-100 mx-5 form-group my-3">
            <label className="mb-3" for="formControlRange">
              Price Range
            </label>
            <input
              type="range"
              id="price-range"
              className="form-control-range"
              min={minPrice}
              max={maxPrice}
              step={(maxPrice - minPrice) / meals?.length}
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
          {/* </div> */}
        </div>
        <div className="button-div-sort d-flex justify-content-center mt-5">
          <button
          type="button"
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
