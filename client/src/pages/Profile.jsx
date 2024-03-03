import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { updateUserDataThunk, clearErrors } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";

export const Profile = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({});
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const { loading, user, error } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const handleChange = (e) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.id]: e.target.value || user?.[e.target.id],
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

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

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
      <h1 className="display-2 text-center my-3">User Profile</h1>
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
                placeholder="Username"
                onChange={handleChange}
                value={formData.name || ""}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email || ""}
              />
            </div>
            <button
              type="submit"
              id="update-profile-btn"
              className="btn w-100 mb-3"
              disabled={loading}
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
            <Link to={"/delete-account"}>
            <span id="span-delete" className="text-danger d-inline-block">
              Delete Account
            </span>
            </Link>
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
          <form className="d-flex flex-column align-items-center">
            <div className="form-group w-100">
              <label htmlFor="password">Current Password</label>
              <input
                type="text"
                className="form-control"
                id="password-current"
                placeholder="Current Password"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="passwordConfirm">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password-new"
                placeholder="New Password"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              id="update-password-btn"
              className="btn w-100 mb-3"
            >
              UPDATE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
