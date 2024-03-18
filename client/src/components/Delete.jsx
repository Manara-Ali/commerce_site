import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {useNavigate} from 'react-router-dom';
import { ModalContext } from "../context/ModalContext";
import { deleteMealThunk } from "../store";

export const Delete = ({ title, meal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setModalOpen} = useContext(ModalContext);

  const {loading, error, status} = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteMealThunk(meal.slug));
  }

  console.log({loading, status, error});

  useEffect(() => {
    if (status === 204) {
      setModalOpen(false);
      document.querySelector(".app-container").classList.remove("blur");
      navigate("/");
    }
  }, [status, setModalOpen, navigate]);

  return (
    <div className="modal-message border border-secondary">
         {meal ? <form onSubmit={handleSubmit}>
          <h1 className="font-weight-bold mt-5" style={{color: "#333"}}>Delete {title}</h1>
          <p className="lead delete-text">
            Are you sure you want to delete{" "}
            <span className="font-weight-bold">{meal.name}</span>?
          </p>
          <div className="d-flex justify-content-center">
            <div className="delete-image" style={{backgroundImage: `url(${meal.coverImage})`}}>
          </div>
          </div>
          <div className="button-div">
            <button
              className="btn btn-secondary py-3 px-5"
              //   type="submit"
              onClick={() => {
                setModalOpen(false);
                document
                  .querySelector(".app-container")
                  .classList.remove("blur");
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
            //   onClick={() => {
            //     return handleBookDeletion(book._id);
            //   }}
            >
              Delete
            </button>
          </div>
        </form> : null}
    </div>
  );
};
