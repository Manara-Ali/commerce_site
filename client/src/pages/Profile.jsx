export const Profile = () => {
    return(
        <div className="container">
      <h1 className="display-2 text-center my-3">Profile</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form
            className="d-flex flex-column align-items-center"
          >
            <input
              type="file"
              accept="image/*"
            />
            <img
              id="profile-image"
              className="w-25 rounded-circle my-2"
              alt="profile"
            />

            <div className="form-group w-100">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Username"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <button
              type="submit"
              id="signup-btn"
              className="btn w-100 mb-3"
            >
                UPDATE PROFILE
            </button>
          </form>
            {/* <Link to="/create-listing">
              <button
              type="button"
              id="create-listing-btn"
              className="btn btn-success w-100 mb-3"
            >
              Create Listing
            </button>
            </Link> */}
          <div className="d-flex justify-content-between">
            <span
              id="span-delete"
              className="text-danger d-inline-block"
            >
              Delete Account
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <hr className="my-5"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
            <h3 className="lead display-4 text-center mb-5">Update Password</h3>
            <form
            className="d-flex flex-column align-items-center"
          >
            <div className="form-group w-100">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="***************"
              />
            </div>
            <button
              type="submit"
              id="signup-btn"
              className="btn w-100 mb-3"
            >
                UPDATE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}