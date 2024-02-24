import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { clearErrors } from "../store";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  console.log(user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
    dispatch(signupThunk(form));
    setForm({});
  };

  useEffect(() => {

    if(user?.name) {
      console.log("hello");
      navigate("/");
    }
  }, [user?.name])

  if (loading) {
    return <Spinner />;
  }

  if(error) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-1 my-2 text-center">Sign Up</h1>
          {error ? <Alert type="alert-danger" message={error.message} /> : null}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                aria-describedby="nameHelp"
                onChange={handleChange}
                value={form.name || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
                value={form.email || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
              <label htmlFor="passwordConfirm">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={handleChange}
                value={form.passwordConfirm || ""}
              />
            </div>
            <button id="signup-btn" type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
