import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../context/ModalContext";
import { deleteReviewThunk } from "../store";

export const DeleteReview = ({ setUserInput, slug, reviewId }) => {
  const dispatch = useDispatch();

  const { setDeleteModalOpen } = useContext(ModalContext);

  const handleReviewClick = (e) => {
    if (e.target.name === "cancel") {
      setDeleteModalOpen(false);
      document.querySelector(".app-container").classList.remove("blur");
      // Scroll to the bottom of the page
      document.body.scrollTop = document.documentElement.scrollTop =
        document.body.scrollHeight;
    }

    if (e.target.name === "delete") {

      setDeleteModalOpen(false);

      document.querySelector(".app-container").classList.remove("blur");

      // Scroll to the bottom of the page
      document.body.scrollTop = document.documentElement.scrollTop =
        document.body.scrollHeight;

      dispatch(
        deleteReviewThunk({
          slug,
          reviewId,
        })
      );
    }
  };

  return (
    <div className="modal-message border border-secondary d-flex flex-column">
      <h1
        className="font-weight-bold"
        style={{ color: "#333", marginTop: "5rem", marginBottom: "3rem" }}
      >
        Delete review?
      </h1>
      <p
        className="lead delete-text"
        style={{
          color: "#333",
          lineHeight: "2",
          marginTop: "2rem",
          marginBottom: "-3rem",
        }}
      >
        Are you sure you want to delete your review for{" "}
        <span className="font-weight-bold text-capitalize">{slug}</span>?{" "}
      </p>

      <div className="button-div">
        <button
          className="btn btn-secondary py-3 px-5"
          id="disregard-cancel-btn"
          name="cancel"
          onClick={handleReviewClick}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger py-3 px-5"
          type="submit"
          id="disregard-disregard-btn"
          name="delete"
          onClick={handleReviewClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
