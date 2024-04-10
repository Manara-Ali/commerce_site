import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";
import { Rating } from "./Rating";
import { DeleteReview } from "./DeleteReview";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";
import { updateReviewThunk } from "../store";

export const ReviewList = ({ reviews, slug }) => {
  const reviewCopy = [...reviews];

  const reversedArr = reviewCopy?.reverse();

  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [reviewId, setReviewId] = useState(null);
  const [updateTextArea, setUpdateTextArea] = useState(false);
  const [userInput, setUserInput] = useState("");

  const { deleteModalOpen, setDeleteModalOpen } = useContext(ModalContext);

  const handleButtonClick = (e, review) => {
    if (e.target.textContent === "Delete") {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      document.querySelector(".app-container").classList.add("blur");

      setDeleteModalOpen(true);
      setReviewId(review?._id);
    }

    if(e.target.textContent === "Cancel") {
      setUpdateTextArea(false);
    }

    if (e.target.textContent === "Edit") {
      // if (userInput) {
      //   dispatch(
      //     createReviewThunk({
      //       slug,
      //       rating,
      //       review: userInput,
      //     })
      //   );
      //   setUserInput("");
      //   setRating(1);
      // }
      console.log("Edit");
      setUpdateTextArea(true);
      setReviewId(review?._id);
      setUserInput(review.review);
    }
    
    if(e.target.textContent === "Update") {
      console.log("Update");
      dispatch(updateReviewThunk({userInput, slug, rating, reviewId}));
    }
  };

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const { review, status } = useSelector((state) => {
    return state.reviewsCombinedReducer;
  });

  useEffect(() => {
      setUpdateTextArea(false);
  }, [review]);

  return (
    <div
      className="border rounded-lg p-3 mb-5"
      style={{ marginTop: "6rem", background: "#f0f0f0" }}
    >
      {reversedArr?.map((element, index) => {
        const firstName = reversedArr[index]?.userId?.name.split(" ")[0];

        const lastNameInitial = reversedArr[index]?.userId?.name?.split(
          " "
        )?.[1]?.[0];

        if (user?._id === element?.userId?._id) {
          return (
            <div key={element._id} className="review-div">
              <div style={{ display: "flex" }}>
                <div
                  // key={element._id}
                  style={{
                    // border: "1px solid red",
                    backgroundImage: `url(${reversedArr[index]?.userId?.photo})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    // margin: "auto",
                    height: "50px",
                    width: "50px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    borderRadius: "50%",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "2px",
                      marginBottom: "0px",
                    }}
                  >
                    {firstName} {lastNameInitial}.
                  </p>
                  <Rating value={reversedArr[index]?.rating} />
                </div>
              </div>
              {updateTextArea ? (
                <div className="col-md-9 mb-5 mt-3 pt-2 border rounded-lg w-100">
                  <textarea
                    className="mb-4"
                    placeholder="Add a review"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
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
                </div>
              ) : (
                <p>{reversedArr[index]?.review}</p>
              )}
              <div className="btn-container">
                <button
                  // name="delete"
                  className="btn"
                  onClick={(e) => handleButtonClick(e, element)}
                >
                  {updateTextArea ? "Cancel" : "Delete"}
                </button>
                <button
                  // name="update"
                  className="btn"
                  onClick={(e) => handleButtonClick(e, element)}
                >
                  {updateTextArea ? "Update" : "Edit"}
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={element._id} className="review-div">
              <div style={{ display: "flex" }}>
                <div
                  // key={element._id}
                  style={{
                    // border: "1px solid red",
                    backgroundImage: `url(${reversedArr[index]?.userId?.photo})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    // margin: "auto",
                    height: "50px",
                    width: "50px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    borderRadius: "50%",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "2px",
                      marginBottom: "0px",
                    }}
                  >
                    {firstName} {lastNameInitial}.
                  </p>
                  <Rating value={reversedArr[index]?.rating} />
                </div>
              </div>
              <p>{reversedArr[index]?.review}</p>
            </div>
          );
        }
      })}
      {deleteModalOpen && (
        <ModalWindow style={{ backgroundColor: "red" }}>
          <DeleteReview slug={slug} reviewId={reviewId} />
        </ModalWindow>
      )}
    </div>
  );
};
