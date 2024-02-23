export const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-1 my-5 text-center">Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
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
