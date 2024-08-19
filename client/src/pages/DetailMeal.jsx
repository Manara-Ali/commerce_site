import { useState, useEffect, useRef, useContext } from "react";
import { LuDot } from "react-icons/lu";
import { PiLineVerticalThin } from "react-icons/pi";
import { FaHeart, FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMealThunk,
  getMealBySizeThunk,
  clearState,
  addToCartRequest,
  addToCartSuccess,
  clearCartState,
} from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { ImageSlider } from "../components/ImageSlider";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";
import { QuantityContext } from "../context/QuantityContext";
import { Delete } from "../components/Delete";
import { Review } from "../components/Review";
import { Helmet } from "react-helmet-async";
import { SizeContext } from "../context/SizeContext";
import { PriceContext } from "../context/PriceContext";

export const DetailMeal = ({ children }) => {
  const { slug } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef();
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const { quantity, setQuantity } = useContext(QuantityContext);
  const { size, setSize } = useContext(SizeContext);
  const { price, setPrice } = useContext(PriceContext);

  const getWindowSize = function () {
    return {
      width: window?.screen?.width,
      height: window?.screen?.height,
    };
  };

  const windowData = function () {
    setSliderWidth(sliderRef.current?.getBoundingClientRect()?.width);
  };

  const handleWindowSize = function () {
    setWindowSize(getWindowSize());
    setSliderWidth(sliderRef.current?.getBoundingClientRect()?.width);
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [sliderWidth, setSliderWidth] = useState(null);

  const [addedToCart, setAddedToCart] = useState(false);

  const { loading, error, status, meal } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  const { user, isAuthenticated, message } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const { review } = useSelector((state) => {
    return state.reviewsCombinedReducer;
  });

  const {
    loading: cartLoading,
    error: cartError,
    status: cartStatus,
    cartItems,
  } = useSelector((state) => {
    return state?.cartsCombinedReducer;
  });

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = (qty) => {
    dispatch(addToCartRequest());
    dispatch(addToCartSuccess({ ...meal, qty }));
    setAddedToCart(true);
  };

  const handleSizeChange = (e) => {
    const drinkSize = Number(e.target.value);

    setSize(drinkSize);
    if (drinkSize === 16) {
      setPrice(4.99);
      setSearchParam({ size: drinkSize });
    } else if (drinkSize === 12) {
      setPrice(3.99);
      setSearchParam({ size: drinkSize });
    } else if (drinkSize === 10) {
      setPrice(2.99);
      setSearchParam({ size: drinkSize });
    }
  };

  const checkForMealInCart = (meal) => {
    const mealInCart = cartItems?.find((element) => {
      return element?._id === meal?._id;
    });

    if (mealInCart) setQuantity(mealInCart.qty);
    else setQuantity(1);
  };

  useEffect(() => {
    if (slug.includes("juice")) {
      setSearchParam({ size: searchParam.get("size") });

      if (searchParam.get("size")) setSize(searchParam.get("size"));
      else setSearchParam({ size: 16 });
    }

    if (Number(searchParam.get("size")) === 16) {
      setPrice(4.99);
    } else if (Number(searchParam.get("size")) === 12) {
      setPrice(3.99);
    } else if (Number(searchParam.get("size")) === 10) {
      setPrice(2.99);
    }
  }, []);

  useEffect(() => {
    dispatch(getMealThunk(slug));
  }, [slug, review]);

  useEffect(() => {
    windowData();
  }, []);

  useEffect(() => {
    if (meal) {
      dispatch(clearState());
    }
  }, [meal]);

  useEffect(() => {
    if (searchParam.get("size")) {
      dispatch(
        getMealBySizeThunk({ data: slug, size: searchParam.get("size") })
      );
    }
  }, [size]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);

    return () => window.removeEventListener("resize", handleWindowSize);
  }, [loading, windowSize.width, windowSize.height, sliderWidth]);

  useEffect(() => {
    setTimeout(() => {
      setAddedToCart(false);
    }, 750);
  }, [addedToCart]);

  useEffect(() => {
    checkForMealInCart(meal);
  }, [meal]);

  // console.log({width: windowSize.width, height: windowSize.height, sliderWidth})

  if (loading) {
    return <Spinner />;
  }

  if (error || error?.message) {
    // setTimeout(() => {
    //   dispatch(clearState());
    //   navigate("/page-not-found");
    // }, 5000);
    dispatch(clearState());
    navigate("/page-not-found");
  }
  return (
    <>
      <Helmet>
        <title>Meal Details</title>
        <meta
          name="description"
          content="Learn more about our dish and cooking process to familiarize yourself with your order."
        />
        <link rel="canonical" href="/:slug" />
      </Helmet>
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={"/"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <h1 className="display-3 text-center">Meal Detail</h1>
      <div
        className={`${
          meal?.secretMeal ? "blur hidden-meal" : ""
        } col-md-9 mx-auto`}
      >
        {/* {error ? <Alert type="alert-danger" message={error.message} /> : null} */}
        <div className="border rounded-lg p-3">
          <img className="card-img-top" src={meal?.coverImage} alt={slug} />
        </div>
        <div className="message-alert mt-5">
          {addedToCart && (
            <Alert
              type="alert-success"
              message="Your item was added to the cart"
            />
          )}
        </div>
        <div className="col-md-9 offset-md-3 mx-auto">
          <div className="d-flex justify-content-between">
            <h1 className="text-center">{meal?.name}</h1>
          </div>
          <div className="d-flex align-middle">
            {meal.category === "drinks" ? (
              <h4 className="text-center">
                ${price === meal?.price ? meal?.price : price}
              </h4>
            ) : (
              <h4 className="text-center">
                ${price === meal?.price ? price : meal?.price}
              </h4>
            )}
            <LuDot size={20} color="#d7456b" />
            <h4 className="text-center">
              {meal?.spiceLevel > 0 ? "🌶️" : null}{" "}
            </h4>
            {meal?.spiceLevel > 0 ? <LuDot size={20} color="#d7456b" /> : null}{" "}
            <span className="mr-3">Serving:</span>
            <h4 className="text-center mr-1">{meal?.serving} </h4>
            <div style={{ marginTop: "-0.3rem" }}>
              <FiUser size={20} color="#d7456b" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between col-md-9 offset-md-3 mt-5 mx-auto border rounded-lg p-4">
          <div
            className="d-flex flex-column align-items-center"
            style={{ marginLeft: "2.5rem" }}
          >
            <h4 className="">{meal?.ratingsAverage}</h4>
            <FaRegStar size={20} color="#d7456b" />
          </div>
          <PiLineVerticalThin size={50} />
          <div className="d-flex flex-column align-items-center">
            <h4 className="">
              {meal?.ratingsAverage >= 4.5
                ? "User's Favorite"
                : "Many Users loved it"}
            </h4>
            <FaHeart size={20} color="#d7456b" />
          </div>
          <PiLineVerticalThin size={50} />
          <div
            className="d-flex flex-column align-items-center"
            style={{ marginRight: "2.5rem" }}
          >
            <h4 className="">{meal?.ratingsQuantity} </h4>
            <p
              className="font-weight-light"
              style={{ textDecoration: "underline" }}
            >
              Reviews
            </p>
          </div>
        </div>
        <div className="col-md-9 offset-md-3 mt-5 mx-auto border rounded-lg p-4">
          <div className="">
            <h2 className="text-center mb-4">Description</h2>
            <p className="text-center">{meal?.description}</p>
          </div>
          <div className="message-alert mt-5">
            {addedToCart && (
              <Alert
                type="alert-success"
                message="Your item was added to the cart"
              />
            )}
          </div>
          <div className="message-alert mt-5">
            {addedToCart && (
              <Alert
                type="alert-success"
                message="Your item was added to the cart"
              />
            )}
          </div>
          {meal?.size && (
            <div className="mt-5 mx-auto border rounded-lg pr-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="pt-3 text-muted font-weight-bold col-md-6">
                  Size:
                </p>
                <select
                  className=" custom-select"
                  style={{ fontSize: "1.3rem" }}
                  onChange={handleSizeChange}
                  value={size}
                >
                  {[16, 12, 10].map((element, index) => {
                    return (
                      <option key={index} value={element}>
                        {`${element} oz`}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="d-flex flex-row-reverse my-3 pl-4"></div>
            </div>
          )}
          <div className="mt-5 mx-auto border rounded-lg pr-4">
            <div className="d-flex justify-content-between align-items-center">
              <p className="pt-3 text-muted font-weight-bold col-md-6">
                Quantity:
              </p>
              <select
                className=" custom-select"
                style={{ fontSize: "1.3rem" }}
                onChange={handleQuantityChange}
                value={quantity}
              >
                {Array.from({ length: 5 }, (_, index) => {
                  return ++index;
                }).map((element) => {
                  return (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex flex-row-reverse my-3 pl-4">
              <button
                className="btn w-100 btn-secondary font-weight-bold ml-2"
                disabled={addedToCart}
              >
                <Link to="/cart" style={{ color: "#f4f4f4" }}>
                  {cartLoading ? "Loading..." : "Go To Cart"}
                </Link>
              </button>
              <button
                className="btn w-100 font-weight-bold btn-success mr-2"
                // id="cart-btn"
                disabled={addedToCart}
                onClick={() => handleAddToCart(quantity)}
              >
                {cartLoading ? "Loading..." : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-md-9 mx-auto mt-5 mb-5 border rounded-lg w-100"
          id="slider-ref-div"
          style={{ backgroundColor: "#eee", height: "30rem" }}
          ref={sliderRef}
        >
          {sliderWidth && (
            <ImageSlider slides={meal?.images} parentWidth={sliderWidth} />
          )}
        </div>
        <div style={{ marginTop: "50px" }}></div>
        <Review />
      </div>
      {user?.role === "admin" && (
        <div className="d-flex justify-content-between border rounded-lg mx-4 p-3">
          <span
            id="span-delete-meal"
            className="font-weight-bold d-inline-block"
            onClick={() => {
              document.body.scrollTop = document.documentElement.scrollTop = 0;

              document.querySelector(".app-container").classList.add("blur");

              setModalOpen(true);
            }}
          >
            Delete Meal
          </span>
          <Link to={`/edit/${slug}`}>
            <span
              id="span-create-meal"
              className="font-weight-bold d-inline-block"
            >
              Update Meal
            </span>
          </Link>
        </div>
      )}
      {modalOpen && (
        <ModalWindow>{<Delete title={"Meal"} meal={meal} />}</ModalWindow>
      )}
    </>
  );
};
