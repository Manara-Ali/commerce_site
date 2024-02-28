import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk, clearErrors } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";

export const ResetPassword = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
    resetToken,
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
    dispatch(resetPasswordThunk(form));
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

  useEffect(() => {
    if(isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 3000)
    }
  }, [isAuthenticated])

  return (
    <>
      <Link to={"/forgot/password"}>
        <button
          className="btn btn-secondary w-25 m-3 
  p-3 d-flex align-items-center justify-content-center"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-1 mb-5 text-center">Reset Password</h1>
            {error ? (
              <Alert type="alert-danger" message={error.message} />
            ) : message ? (
              <Alert type="alert-success" message={message} />
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={form.passwordConfirm || ""}
                />
              </div>
              <button id="reset-password-btn" type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
