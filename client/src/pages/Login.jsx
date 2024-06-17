import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { loginThunk, clearErrors } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { OAuth } from "../components/OAuth";
import googleIcon from "../assets/icons8-google.svg";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loading, user, error } = useSelector((state) => {
    return state.usersCombinedReducer;
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
    dispatch(loginThunk(form));
    setForm({});
  };

  useEffect(() => {
    if (user?.name) {
      navigate("/");
    }
  }, [user?.name]);

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
        <title>Login</title>
        <meta
          name="description"
          content="Login to our site to learn more about our amazing products and offers!"
        />
        <link rel="canonical" href="/login" />
      </Helmet>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-3 mb-5 text-center">Login</h1>
            {error ? (
              <Alert type="alert-danger" message={error.message} />
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-between">
                  <p>
                    <Link
                      to={"/forgot/password"}
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Forgot Password?
                    </Link>
                  </p>
                  <p>
                    <Link
                      to={"/signup"}
                      style={{ color: "#66ba30", fontWeight: "bold" }}
                    >
                      Sign Up here!
                    </Link>
                  </p>
                </div>
              </div>
              <button id="login-btn" type="submit" className="btn">
                Submit
              </button>
              {/* <OAuth><i className="fa fa-google fa-2x pr-3" aria-hidden="true"></i>Login With Google</OAuth> */}
              <OAuth>
                <img src={googleIcon} alt="google" className="pr-3" />
                Login With Google
              </OAuth>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
