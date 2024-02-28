export const ResetPassword = () => {

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-1 mb-5 text-center">Reset Password</h1>
          <form>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="password-confirm"
                name="password-confirm"
              />
            </div>
            <button id="reset-password-btn" type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
