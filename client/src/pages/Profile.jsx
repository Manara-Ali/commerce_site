import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  updateUserDataThunk,
  updatePasswordThunk,
  clearErrors,
} from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { Helmet } from "react-helmet-async";

export const Profile = ({ children }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({});
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [passwordObj, setPasswordObj] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const {
    loading,
    user,
    isAuthenticated,
    error,
    status,
    message,
    passwordUpdateError,
  } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const handleChange = (e) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
        // [e.target.id]: e.target.value || user?.[e.target.id],
      };
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordObj(() => {
      return {
        ...passwordObj,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFileUpload = (file) => {
    // Create storage
    const storage = getStorage(app);

    // Create filename
    const filename = `${Date.now()}-${user?._id}-${file?.name}`;

    // Create storage reference
    const storageRef = ref(storage, filename);

    // Create an uploadTask
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            photo: downloadURL,
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fileUploadError) {
      dispatch(updateUserDataThunk(formData));
    } else {
      console.error(fileUploadError);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePasswordThunk(passwordObj));

    setPasswordObj({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
  };

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const fileUploader = () => {
    if (fileUploadError) {
      setTimeout(() => {
        setFileUploadError(false);
      }, 2000);
      return (
        <span className="text-danger">
          Image Upload Error. Try again later!
        </span>
      );
    } else if (fileUploadPercentage > 0 && fileUploadPercentage < 100) {
      return (
        <span className="text-muted">{`Uploading Image... ${fileUploadPercentage}%`}</span>
      );
    } else if (!fileUploadError && fileUploadPercentage === 100) {
      setTimeout(() => {
        setFileUploadPercentage(0);
      }, 3000);
      return <span className="text-success">Image successfully uploaded!</span>;
    } else {
      return null;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  if (passwordUpdateError) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  if (status === "success" || status === "fail") {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  if (message) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta
          name="description"
          content="Use the profile page to update your information such name, email, and/or password."
        />
        <link rel="canonical" href="/profile" />
      </Helmet>
      <div className="d-flex justify-content-between">{children}</div>
      <div className="container">
        <h1 className="display-3 text-center my-3">User Profile</h1>
        {error ? <Alert type="alert-danger" message={error.message} /> : null}
        {fileUploadError ? (
          <Alert type="alert-danger" message={fileUploadError} />
        ) : null}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              <input
                type="file"
                accept="image/*"
                hidden
                ref={inputRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                id="profile-img-item"
                className="w-25 rounded-circle my-2"
                src={formData.photo || user?.photo}
                alt="profile"
                onClick={() => inputRef.current.click()}
              />
              <p>{fileUploader()}</p>
              <div className="form-group w-100">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name || ""}
                  placeholder={user?.name}
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email || ""}
                  placeholder={user?.email}
                />
              </div>
              <button
                type="submit"
                id="update-profile-btn"
                className="btn w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "UPDATE PROFILE"}
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
              <div className="d-flex justify-content-between">
                <Link to={"/delete-account"}>
                  <span
                    id="span-delete"
                    className=" text-danger d-inline-block font-weight-bold"
                  >
                    Delete Account
                  </span>
                </Link>
              </div>
              {user?.role === "admin" && (
                <div className="d-flex justify-content-between">
                  <Link to={"/create-meal"}>
                    <span
                      id="span-create-meal"
                      className="font-weight-bold d-inline-block"
                    >
                      Create Meal
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr className="my-5" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="lead display-4 text-center mb-5">Update Password</h3>
            {passwordUpdateError ? (
              <Alert
                type="alert-danger"
                message={passwordUpdateError.message}
              />
            ) : null}
            {message && <Alert type={"alert-success"} message={message} />}
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={handlePasswordSubmit}
            >
              <div className="form-group w-100">
                <label htmlFor="password">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-current"
                  name="currentPassword"
                  onChange={handlePasswordChange}
                  value={passwordObj.currentPassword}
                  placeholder="**************"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="passwordConfirm">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-new"
                  name="newPassword"
                  onChange={handlePasswordChange}
                  value={passwordObj.newPassword}
                  placeholder="**************"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="newPasswordConfirm"
                  onChange={handlePasswordChange}
                  value={passwordObj.newPasswordConfirm}
                  placeholder="**************"
                />
              </div>
              <button
                type="submit"
                id="update-password-btn"
                className="btn w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "UPDATE PASSWORD"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
