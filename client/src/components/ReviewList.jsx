import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Rating } from "./Rating";
import { DeleteReview } from "./DeleteReview";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";

export const ReviewList = ({ reviews, slug }) => {
  const reviewCopy = [...reviews];

  const reversedArr = reviewCopy?.reverse();

  const [reviewId, setReviewId] = useState(null);

  const { deleteModalOpen, setDeleteModalOpen } = useContext(ModalContext);

  const handleButtonClick = (e, review) => {
    if (e.target.name === "delete") {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      document.querySelector(".app-container").classList.add("blur");

      setDeleteModalOpen(true);
      setReviewId(review._id);
    }

    if (e.target.name === "update") {
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
      console.log("Update");
    }
  };

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <div className="border rounded-lg p-3 mb-5" style={{ marginTop: "6rem" }}>
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
              <p>{reversedArr[index]?.review}</p>
              <div className="btn-container">
                <button
                  name="delete"
                  className="btn"
                  onClick={(e) => handleButtonClick(e, element)}
                >
                  Delete
                </button>
                <button
                  name="update"
                  className="btn"
                  onClick={(e, element) => handleButtonClick(e, element)}
                >
                  Update
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
