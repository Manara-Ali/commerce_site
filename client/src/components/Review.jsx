import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";
import { DiscardReview } from "./DiscardReview";
import { ReviewList } from "./ReviewList";
import { createReviewThunk, getAllReviewsByMealThunk } from "../store";

export const Review = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewUserIds, setReviewUserIds] = useState([]);
  const { reviewModalOpen, setReviewModalOpen } = useContext(ModalContext);

  const slug = location.pathname.slice(1);

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const { loading, error, reviews, review, status } = useSelector((state) => {
    return state.reviewsCombinedReducer;
  });

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleButtonClick = (e) => {
    if (e.target.name === "cancel") {
      if (userInput) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.querySelector(".app-container").classList.add("blur");
        setReviewModalOpen(true);
      }
    }

    if (e.target.name === "review") {
      if (userInput) {
        dispatch(
          createReviewThunk({
            slug,
            rating,
            review: userInput,
          })
        );
        setUserInput("");
        setRating(1);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllReviewsByMealThunk({ slug }));
  }, []);

  useEffect(() => {
    dispatch(getAllReviewsByMealThunk({ slug }));
  }, [review]);

  useEffect(() => {
    if (reviews.length) {
      const ids = reviews.map((element) => {
        return element?.userId._id;
      });

      setReviewUserIds(ids);
    }
  }, [reviews.length]);

  return (
    <>
      <div style={{ marginTop: "7rem", background: "#f0f0f0" }}>
        {!reviewUserIds.includes(user._id) && (
          <div className="col-md-9 my-5 pt-2 border rounded-lg w-100">
            <textarea
              className="mb-4"
              placeholder="Leave a review"
              value={userInput}
              onChange={handleInputChange}
            />
            <div className="d-flex align-items-center">
              <Rate
                value={rating}
                allowHalf
                allowClear={false}
                style={{ color: "#d7456b" }}
                onChange={(value) => setRating(value)}
              />
              <span className="lead text-muted ml-3">
                ( {rating} / 5 stars )
              </span>
            </div>
            <div className="btn-container">
              <button name="cancel" className="btn" onClick={handleButtonClick}
              disabled={!userInput}>
                Cancel
              </button>
              <button name="review" className="btn" onClick={handleButtonClick}
              disabled={!userInput}>
                Review
              </button>
            </div>
            {reviewModalOpen && (
              <ModalWindow>
                <DiscardReview setUserInput={setUserInput} />
              </ModalWindow>
            )}
          </div>
        )}
      </div>
      {reviews?.length ? <ReviewList reviews={reviews} slug={slug} /> : null}
    </>
  );
};
