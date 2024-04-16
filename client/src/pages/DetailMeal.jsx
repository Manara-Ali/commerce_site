import { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMealThunk,
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

export const DetailMeal = ({ children }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef();
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const { quantity, setQuantity } = useContext(QuantityContext);

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

  const checkForMealInCart = (meal) => {
    const mealInCart = cartItems?.find((element) => {
      return element._id === meal._id;
    });

    if(mealInCart) setQuantity(mealInCart.qty);
    else setQuantity(1);
  };

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
    setTimeout(() => {
      dispatch(clearState());
      navigate("/");
    }, 5000);
  }
  return (
    <>
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
        {error ? <Alert type="alert-danger" message={error.message} /> : null}
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
        <div className="col-md-9 offset-md-3 mt-5 mx-auto border rounded-lg p-4">
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Name:</span>
            <h4 className="text-center">{meal?.name}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Price:</span>
            <h4 className="text-center">${meal?.price}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Spice Level:</span>
            <h4 className="text-center">
              {meal?.spiceLevel === 0 ? "Not Spicy" : "🌶️"}{" "}
              <i
                className="ml-3 fa fa-power-off"
                aria-hidden="true"
                style={{ color: "#d7456b" }}
              ></i>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Serving(s):</span>
            <h4 className="text-center">
              {meal?.serving}{" "}
              <i
                className="ml-3 fa fa-user-o"
                aria-hidden="true"
                style={{ color: "#d7456b", fontWeight: "bolder" }}
              ></i>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Number Of Ratings:</span>
            <h4 className="text-center">
              {meal?.ratingsQuantity}{" "}
              <i
                className="ml-3 fa fa-bar-chart"
                aria-hidden="true"
                style={{ color: "#d7456b", marginRight: "-0.6rem" }}
              ></i>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="lead mr-3">Ratings Average:</span>
            <h4 className="text-center">
              {meal?.ratingsAverage}
              <i
                className="ml-3 fa fa-star-o"
                aria-hidden="true"
                style={{ color: "#d7456b", fontWeight: "bold" }}
              ></i>
            </h4>
          </div>
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
                <Link to="/cart" style={{color: "#f4f4f4"}}>
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
