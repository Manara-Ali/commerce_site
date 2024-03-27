import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {createSelector} from '@reduxjs/toolkit'
import { getAllMealsThunk, clearState } from "../store";
import { Spinner } from "../components/Spinner";

export const Home = ({ children }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, status } = useSelector((state) => {
    return state?.mealsCombinedReducer;
  });

  const memoizedMeals = createSelector(
    (state) => state.mealsCombinedReducer.meals,
    (meals) => {
      return meals.filter((element) =>
        element?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
    }
  );

  const meals = useSelector(memoizedMeals);

  const handleInputChange = (e) => {
    // if (searchParams.size) {
    //   setSearchParams();
    // }
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(searchTerm);

    // setSearchTerm("");

    // if (searchTerm) {
    //   setSearchParams({ name: searchTerm });
    //   setSearchTerm("");
    // }
  };

  // console.log(searchParams.get("name"));

  useEffect(() => {
    dispatch(getAllMealsThunk());
  }, []);

  // useEffect(() => {
  //   if(searchTerm) {
  //     meals.filter((element) => {

  //     })
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   if (searchParams.get("name")) {
  //     dispatch(getAllMealsThunk(searchParams.get("name")));
  //   } else {
  //     dispatch(getAllMealsThunk());
  //   }
  // }, [searchParams.get("name")]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearState());
    }, 3000);
  }

  return (
    <>
      <div className="d-flex justify-content-between">{children}</div>
      <div className="container">
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <i
            className="fa fa-sliders fa-2x border rounded-lg p-2 pr-3"
            aria-hidden="true"
            style={{ color: "#d7456b" }}
          ></i>
          <form
            className="form-inline my-2 my-lg-0 border rounded-lg p-2"
            onSubmit={handleSubmit}
          >
            <div className="d-flex align-items-center w-100">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Menu"
                aria-label="Search"
                style={{ fontSize: "1.5rem" }}
                value={searchTerm}
                onChange={handleInputChange}
              />
              {/* <button
                className="btn ml-3 my-sm-0 py-0"
                type="submit"
                style={{
                  color: "#ececec",
                  backgroundColor: "#d7456b",
                  fontSize: "1.3rem",
                }}
              >
                <i className="fa fa-search fa-2x" aria-hidden="true"></i>
              </button> */}
              <div className="dropdown border rounded-lg ml-3" style={{ backgroundColor: "#d7456b", fontSize: "1.rem" }}>
            <button
              className="btn"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa fa-chevron-down fa-2x"
                aria-hidden="true"
                style={{ color: "#ececec", fontSize: "1.rem" }}
              ></i>
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Food
              </a>
              <a className="dropdown-item" href="#">
                Snacks
              </a>
              <a className="dropdown-item" href="#">
                Drinks
              </a>
            </div>
          </div>
            </div>
          </form>
          {/* <div className="dropdown border rounded-lg">
            <button
              className="btn"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa fa-chevron-down fa-2x"
                aria-hidden="true"
                style={{ color: "#d7456b", fontSize: "1.rem" }}
              ></i>
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Food
              </a>
              <a className="dropdown-item" href="#">
                Snacks
              </a>
              <a className="dropdown-item" href="#">
                Drinks
              </a>
            </div>
          </div> */}
          <div className="cart-div border rounded-lg p-2 pr-3">
            <i
              className="fa fa-shopping-cart fa-2x"
              aria-hidden="true"
              style={{ color: "#d7456b", fontSize: "1.rem" }}
            ></i>
            <span className="badge badge-warning" id="lblCartCount">
              {/* {cartItems.length > 0 ? cartItems.length : null} */}3
            </span>
          </div>
        </div>
        <h1 className="display-4 my-3">Latest Delicacies</h1>
        <hr />
        <div className="row" id="dish-div">
          {meals?.map((element) => {
            return (
              <div
                key={element._id}
                className={`${
                  element.secretMeal ? "blur hidden-meal" : ""
                } card p-0 col-md-3 my-4`}
                id="card"
              >
                <Link
                  to={`/${element.slug}`}
                  // className="btn w-50"
                >
                  <img
                    src={element.coverImage}
                    className="card-img-top"
                    alt={`${element?.name}-${element?._id}`}
                  />
                </Link>
                <div className="card-body">
                  <h4 className="card-title">{element.name}</h4>
                  <p className="card-text">{element.summary}</p>
                  <div
                    className="d-flex w-50 mb-3 justify-content-start"
                    id="icons"
                  >
                    <div className="d-flex align-items-center border rounded-lg px-2 py-1 mr-3">
                      <i
                        className="fa fa-comments-o fa-1x mr-2"
                        style={{ color: "#d7456b" }}
                        aria-hidden="true"
                      ></i>
                      <span className="text-muted">
                        {element.ratingsQuantity}
                      </span>
                    </div>
                    <div className="d-flex align-items-center border rounded-lg px-2 mr-3">
                      <i
                        className="fa fa-star-o fa-1x mr-2"
                        style={{ color: "#d7456b" }}
                        aria-hidden="true"
                      ></i>
                      <span className="text-muted">
                        {element.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/${element.slug}`}
                    className="btn w-50"
                    id="read-more-btn"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
