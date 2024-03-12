import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMealThunk, clearState } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

export const DetailMeal = ({ children }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { loading, error, status, meal } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  useEffect(() => {
    dispatch(getMealThunk(slug));
  }, [slug]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearState());
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
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-3 text-center">Meal Detail</h1>
            {error ? (
              <Alert type="alert-danger" message={error.message} />
            ) : null}
            <div className="border rounded-lg p-3">
              <img className="card-img-top" src={meal?.coverImage} alt={slug} />
            </div>
            <div className="col-md-6 offset-md-3 mt-5 border rounded-lg p-4">
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
                  {meal?.ratingsQuantity}
                  <i
                    className="ml-3 fa fa-star-o"
                    aria-hidden="true"
                    style={{ color: "#d7456b", fontWeight: "bold" }}
                  ></i>
                </h4>
              </div>
            </div>
            <div className="col-md-6 offset-md-3 p-3 mt-5 border rounded-lg">
              <Carousel>
                {meal?.images?.map((element, index) => {
                  return (
                    <Carousel.Item className="carousel-item" key={index}>
                      <img style={{width: "100%", height: "100%"}} src={element} alt={element} />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
