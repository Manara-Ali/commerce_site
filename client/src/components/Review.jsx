import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";
import { DiscardReview } from "./DiscardReview";
import { ReviewList } from "./ReviewList";
import { createReviewThunk, getAllReviewsByMealThunk } from "../store";

export const Review = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const { reviewModalOpen, setReviewModalOpen } = useContext(ModalContext);

  const slug = location.pathname.slice(1);

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
            review: userInput,
            rating: 3.2,
          })
        );
        setUserInput("");
      }
    }
  };

  useEffect(() => {
    dispatch(getAllReviewsByMealThunk({ slug }));
  }, []);

  useEffect(() => {
    dispatch(getAllReviewsByMealThunk({ slug }));
  }, [review])

  return (
    <>
      <div className="col-md-9 my-5 pt-2 border rounded-lg w-100">
        <textarea
          placeholder="Add a review"
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="btn-container">
          <button name="cancel" className="btn" onClick={handleButtonClick}>
            Cancel
          </button>
          <button name="review" className="btn" onClick={handleButtonClick}>
            Review
          </button>
        </div>
        {reviewModalOpen && (
          <ModalWindow style={{ backgroundColor: "red" }}>
            <DiscardReview setUserInput={setUserInput} />
          </ModalWindow>
        )}
      </div>
      {reviews?.length ? <ReviewList reviews={reviews} /> : null}
    </>
  );
};
