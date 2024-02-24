import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk, clearErrors } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";

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

  console.log(form);

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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-1 mb-5 text-center">Login</h1>
          {error ? <Alert type="alert-danger" message={error.message} /> : null}
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
            </div>
            <button id="login-btn" type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
