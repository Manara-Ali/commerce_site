import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const DiscardReview = ({setUserInput}) => {
  const { setReviewModalOpen } = useContext(ModalContext);
  return (
    <div className="modal-message border border-secondary d-flex flex-column">
      <h1
        className="font-weight-bold"
        style={{ color: "#333", marginTop: "5rem", marginBottom: "3rem" }}
      >
        Discard review?
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
        You have a review in progress, are you sure you want to discard it ?{" "}
      </p>

      <div className="button-div">
        <button
          className="btn btn-secondary py-3 px-5"
          id="disregard-cancel-btn"
          onClick={() => {
            setReviewModalOpen(false);
            document.querySelector(".app-container").classList.remove("blur");
            // Scroll to the bottom of the page
            document.body.scrollTop = document.documentElement.scrollTop =
              document.body.scrollHeight;
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger py-3 px-5"
          type="submit"
          id="disregard-disregard-btn"
          onClick={(e) => {
            setReviewModalOpen(false);
            setUserInput("");
            document.querySelector(".app-container").classList.remove("blur");
            // Scroll to the bottom of the page
            document.body.scrollTop = document.documentElement.scrollTop =
              document.body.scrollHeight;
          }}
        >
          Disregard
        </button>
      </div>
    </div>
  );
};
