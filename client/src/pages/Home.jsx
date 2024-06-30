import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { getAllMealsThunk, clearState, resetSortedMeals } from "../store";
import { Spinner } from "../components/Spinner";
import { PaginationSpinner } from "../components/PaginationSpinner";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";
import { Equalizer } from "../components/Equalizer";
import { useMinMax } from "../utils/useMinMax";
import { usePagination } from "../utils/usePagination";
import { calcItemsInCart } from "../utils/calcItemsInCart";
import { Helmet } from "react-helmet-async";

export const Home = ({ children }) => {
  const { pageNumber, setPageNumber } = children[0].props;
  const observer = useRef();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [min, setMinPrice] = useState(1);
  const [max, setMaxPrice] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [applySort, setApplySort] = useState(false);
  const [isSorted, setIsSorted] = useState([]);
  const [category, setCategory] = useState("all");
  // const [data, setData] = useState();

  const { totalMeals, paginatedMeals } = usePagination(
    debouncedSearchTerm,
    pageNumber
  );

  let {
    loading,
    loadingPagination,
    error,
    mealsCount,
    sortedMeals,
    status,
  } = useSelector((state) => {
    return state?.mealsCombinedReducer;
  });

  const { review } = useSelector((state) => {
    return state?.reviewsCombinedReducer;
  });

  const {
    loading: cartLoading,
    error: cartError,
    status: cartStatus,
    cartItems,
  } = useSelector((state) => {
    return state?.cartsCombinedReducer;
  });

  const lastMealElementRef = useCallback(
    (node) => {
      if (loadingPagination) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          totalMeals.length !== mealsCount &&
          paginatedMeals.length > 0
        ) {
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingPagination, totalMeals, mealsCount]
  );

  const memoizedMeals = createSelector(
    (state) => totalMeals,
    (meals) => {
      if (isSorted?.length) {
        return isSorted?.filter((element) => {
          return element?.name
            ?.toLowerCase()
            .includes(debouncedSearchTerm?.toLowerCase());
        });
      }
      return totalMeals?.filter((element) => {
        return element?.name
          ?.toLowerCase()
          .includes(debouncedSearchTerm?.toLowerCase());
      });
      // return totalMeals?.filter((element) =>
      //   element?.name
      //     ?.toLowerCase()
      //     .includes(debouncedSearchTerm?.toLowerCase())
      // );
    }
  );

  const meals = useSelector(memoizedMeals);

  // console.log("pageNumber", pageNumber);
  // console.log("sortedMeals", sortedMeals);
  // console.log("total", totalMeals);
  // console.log("mealsCount", mealsCount);
  // console.log("paginated", paginatedMeals);
  // console.log(applySort);
  // console.log(isSorted);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
    setApplySort(false);
    setIsSorted([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllMealsThunk());
  }, [review]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 250);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    if (totalMeals?.length) {
      const { min, max } = useMinMax(totalMeals);
      setMinPrice(min);
      setMaxPrice(max);
    } else {
      const { min, max } = useMinMax(sortedMeals);
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, []);

  useEffect(() => {
    if (applySort && status === "success") {
      setIsSorted(sortedMeals);
    } else if (searchTerm) {
      setIsSorted(meals);
    } else {
      (totalMeals?.length && setIsSorted(totalMeals)) ||
        setIsSorted(sortedMeals);
    }
  }, [applySort, status, totalMeals, sortedMeals]);

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
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Check out our wide variety of dishes available for order. For more detail navigate to the detail page for each meal."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="d-flex justify-content-between">{children}</div>
      <div className="container">
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <i
            className="fa fa-home fa-2x border rounded-lg p-2 pr-3"
            aria-hidden="true"
            style={{ color: "#d7456b" }}
            onClick={() => {
              dispatch(resetSortedMeals());
              dispatch(getAllMealsThunk());
            }}
          ></i>
          <i
            className="fa fa-sliders fa-2x border rounded-lg p-2 pr-3"
            aria-hidden="true"
            style={{ color: "#d7456b" }}
            onClick={() => {
              document.body.scrollTop = document.documentElement.scrollTop = 0;

              document.querySelector(".app-container").classList.add("blur");

              setModalOpen(true);
            }}
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
            </div>
          </form>
          <div className="border rounded-lg p-2">
            <div
              className="dropdown"
              style={{ backgroundColor: "#d7456b", fontSize: "1.rem" }}
            >
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setCategory(e.target.textContent.toLowerCase())
                  }
                >
                  Food
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setCategory(e.target.textContent.toLowerCase())
                  }
                >
                  Snacks
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setCategory(e.target.textContent.toLowerCase())
                  }
                >
                  Drinks
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setCategory(e.target.textContent.toLowerCase())
                  }
                >
                  All
                </a>
              </div>
            </div>
          </div>
          <div className="cart-div border rounded-lg p-2 pr-3">
            <Link to="/cart">
              <i
                className="fa fa-shopping-cart fa-2x"
                aria-hidden="true"
                style={{
                  color: "#d7456b",
                  fontSize: "1.rem",
                  cursor: "pointer",
                }}
              ></i>
            </Link>
            <span
              className="badge badge-warning"
              id="lblCartCount"
              style={{
                paddingRight: `${
                  calcItemsInCart(cartItems) < 10
                    ? "0.5rem"
                    : calcItemsInCart(cartItems) === 10
                    ? "1.7rem"
                    : "2.2rem"
                }`,
              }}
            >
              {calcItemsInCart(cartItems) > 0
                ? calcItemsInCart(cartItems) <= 10
                  ? calcItemsInCart(cartItems)
                  : "10+"
                : null}
            </span>
          </div>
        </div>
        <h1 className="display-4 my-3">Latest Delicacies</h1>
        <hr />
        <div className="row" id="dish-div">
          {isSorted
            ?.filter((element) => {
              if (category === "all") return element;
              else return element.category === category;
            })
            ?.map((element, index) => {
              if (totalMeals?.length === index + 1) {
                return (
                  <div key={element._id}>
                    {loadingPagination && <PaginationSpinner />}
                    {loadingPagination ? null : (
                      <div
                        ref={lastMealElementRef}
                        // key={element._id}
                        className={`${
                          element.secretMeal ? "blur hidden-meal" : ""
                        } card p-0 col-md-3 my-4`}
                        id="card"
                      >
                        <Link to={`/${element.slug}`}>
                          <img
                            src={element.coverImage}
                            className="card-img-top"
                            alt={`${element?.name}-${element?._id}`}
                          />
                        </Link>
                        <div className="card-body">
                          <h4 className="card-title">{element.name}</h4>
                          <p className="card-text">
                            {element.summary.slice(0, 235) + "..."}
                          </p>
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
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={element._id}>
                    {
                      // <PaginationSpinner/>
                    }
                    <div
                      // key={element._id}
                      className={`${
                        element.secretMeal ? "blur hidden-meal" : ""
                      } card p-0 col-md-3 my-4`}
                      id="card"
                    >
                      <Link to={`/${element.slug}`}>
                        <img
                          src={element.coverImage}
                          className="card-img-top"
                          alt={`${element?.name}-${element?._id}`}
                        />
                      </Link>
                      <div className="card-body">
                        <h4 className="card-title">{element.name}</h4>
                        <p className="card-text">
                          {element.summary.slice(0, 235) + "..."}
                        </p>
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
                  </div>
                );
              }
            })}
        </div>
      </div>
      {modalOpen && (
        <ModalWindow>
          {
            <Equalizer
              totalMeals={totalMeals}
              min={min}
              max={max}
              setApplySort={setApplySort}
            />
          }
          {/* {<Equalizer meals={meals} min={min} max={max} />} */}
        </ModalWindow>
      )}
    </>
  );
};
