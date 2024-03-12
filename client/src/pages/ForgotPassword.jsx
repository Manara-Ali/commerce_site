import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordThunk, clearErrors } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setForm(() => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(form));

    setForm({});
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 5000);
  }

  if (message) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  return (
    <>
      <Link style={{width: "15rem"}} to={"/login"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-3 mb-3 text-center">Forgot Password</h1>
            {error ? (
              <Alert type="alert-danger" message={error.message} />
            ) : null}
            {message ? <Alert type="alert-success" message={message} /> : null}
            <form onSubmit={handleSubmit}>
              <i
                className="fa fa-envelope-o fa-3x d-flex justify-content-center"
                aria-hidden="true"
              ></i>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                  value={form.email}
                />
              </div>
              <button id="forgot-password-btn" type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
