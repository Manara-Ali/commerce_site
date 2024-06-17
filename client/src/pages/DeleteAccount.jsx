import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccountThunk, logoutThunk } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { Helmet } from "react-helmet-async";

export const DeleteAccount = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");

  const { loading, error, status, user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const handleChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAccountThunk({ currentPassword }));
  };

  useEffect(() => {
    if (status === "No Content") {
      dispatch(logoutThunk());
    }
    if (!user) {
      navigate("/login");
    }
  }, [status, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }
  return (
    <>
      <Helmet>
        <title>Delete Account</title>
        <meta
          name="description"
          content="Looking to delete your account? Use this page to accomplish that. We are truly sad to see you leave but hopeful you will join our family soon again."
        />
        <link rel="canonical" href="/delete-account" />
      </Helmet>
    <div className="d-flex justify-content-between">{children}</div>   
    <Link style={{width: "15rem"}} to={"/profile"}>
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
          <h1 className="display-3 mb-5 text-center">Delete Account</h1>
          {error ? <Alert type="alert-danger" message={error.message} /> : null}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                value={currentPassword}
              />
              <div className="d-flex justify-content-between">
                <Link to={"/delete-account"}>
                  <span id="span-delete" className="text-danger d-inline-block">
                    Forgot Password?
                  </span>
                </Link>
              </div>
            </div>
            <button id="delete-account-btn" type="submit" className="btn mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
