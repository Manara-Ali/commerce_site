import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../context/ModalContext";
import { removeFromCart } from "../store";
import { QuantityContext } from "../context/QuantityContext";

export const RemoveFromCart = ({ itemToRemove }) => {
  const dispatch = useDispatch();
  const { setCartModalOpen } = useContext(ModalContext);
  const { setQuantity } = useContext(QuantityContext);

  const handleRemoveFromCart = (itemToRemove) => {
    setCartModalOpen(false);
    setQuantity(1);
    document.querySelector(".app-container").classList.remove("blur");
    // Scroll to the bottom of the page
    document.body.scrollTop = document.documentElement.scrollTop;
    dispatch(removeFromCart(itemToRemove));
  };

  return (
    <div className="modal-message border border-secondary d-flex flex-column">
      <h1
        className="font-weight-bold"
        style={{ color: "#333", marginTop: "5rem", marginBottom: "3rem" }}
      >
        Remove From Cart?
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
        Confirm removing{" "}
        <span className="font-weight-bold">{itemToRemove.name}</span> from your
        cart?
      </p>

      <div className="button-div">
        <button
          className="btn btn-secondary py-3 px-5"
          id="disregard-cancel-btn"
          onClick={() => {
            setCartModalOpen(false);
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
          onClick={() => handleRemoveFromCart(itemToRemove)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
