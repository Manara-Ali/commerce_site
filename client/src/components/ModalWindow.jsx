import { useContext} from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../context/ModalContext";

export const ModalWindow = ({ children }) => {
  const { setModalOpen, setReviewModalOpen } = useContext(ModalContext);

  const handleModalClose = (e) => {
    if (
      e.target === document.querySelector(".modal-container") ||
      e.target === document.querySelector(".app-container") ||
      e.target === document.querySelector(".modal-message")
    ) {
      document.querySelector(".app-container").classList.remove("blur");

      setModalOpen(false);
      setReviewModalOpen(false);
    }
  };

  return createPortal(
    <div
      className="modal-container"
      onClick={(e) => {
        return handleModalClose(e);
      }}
    >
      <div className="modal-content">{children}</div>
    </div>,
    document.querySelector("#portal")
  );
};
