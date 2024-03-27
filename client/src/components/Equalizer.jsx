import { useEffect, useState } from "react";
import { useMinMax } from "../utils/useMinMax";

export const Equalizer = ({ meals }) => {
  const [desiredPrice, setDesiredPrice] = useState(0);
  const { minPrice, maxPrice } = useMinMax(meals);

  const handlePriceChange = (e) => {
    setDesiredPrice(e.target.value);
  };

  console.log(desiredPrice);

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
          id="sort-container"
          className="border d-flex justify-content-center"
        >
          <div className="sort-div d-flex justify-content-between w-50 mt-3">
            <label for="exampleInputEmail1">Sort</label>
            <input
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
            />
            <i className="fa fa-sort-alpha-asc fa-2x" aria-hidden="true"></i>
            <i class="fa fa-sort-alpha-desc fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div
          id="sort-container"
          className="border d-flex justify-content-center"
        >
          <div className="sort-div d-flex justify-content-between w-50 mt-3">
            <label for="exampleInputEmail1">Price</label>
            <input
              type="radio"
              className="form-control"
              id="sortInput"
              aria-describedby="sortInput"
            />
            <i class="fa fa-sort-numeric-asc fa-2x" aria-hidden="true"></i>
            <i className="fa fa-sort-numeric-desc fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div
          id="sort-container"
          className="border d-flex justify-content-center"
        >
          <div className="w-100 mt-3 mx-5">
            <div className="form-group my-3">
              <label className="mb-3" for="formControlRange">
                Price Range
              </label>
              <input
                type="range"
                className="form-control-range"
                min={minPrice}
                max={maxPrice}
                step={(maxPrice - minPrice) / (meals?.length)}
                id="price-range"
                onChange={handlePriceChange}
                value={desiredPrice}
              />
              <div className="d-flex justify-content-between">
                <span style={{fontWeight: "600"}}>${minPrice}</span>
                <span>Desired Price = <span style={{color: "red", fontWeight: "600"}}>${desiredPrice}</span></span>
                <span  style={{fontWeight: "600"}}>${maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="button-div-sort d-flex justify-content-center">
          <button
            className="btn py-3 px-5 w-75"
            //   type="submit"
            //   onClick={() => {
            //     setModalOpen(false);
            //     document
            //       .querySelector(".app-container")
            //       .classList.remove("blur");
            //     // Scroll to the bottom of the page
            //     document.body.scrollTop = document.documentElement.scrollTop =
            //       document.body.scrollHeight;
            //   }}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};
