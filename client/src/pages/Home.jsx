import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllMealsThunk, clearState } from "../store";
import { Spinner } from "../components/Spinner";

export const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, status, meals } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  useEffect(() => {
    dispatch(getAllMealsThunk());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearState());
    }, 3000);
  }

  return (
    <div className="container">
      <h1 className="display-4 my-3">Latest Delicacies</h1>
      <hr />
      <div className="row d-flex justify-content-around">
        {meals?.map((element) => {
          return (
            <div
              key={element._id}
              className="card p-0 col-md-3 mr-5"
              style={{ width: "40rem" }}
            >
              <img
                src={element.imageCover}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text">{element.summary}</p>
                <Link
                  to={`/${element.slug}`}
                  className="btn"
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
  );
};
