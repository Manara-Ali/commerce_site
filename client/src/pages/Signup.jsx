export const Signup = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-1 my-5 text-center">Sign Up</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                aria-describedby="nameHelp"
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
            <div className="form-group">
              <label htmlFor="confirm-password">Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                name="confirm-password"
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
