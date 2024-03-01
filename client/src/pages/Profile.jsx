import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";

console.log(app)

export const Profile = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({});
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { loading, user, error } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const handleChange = (e) => {
    console.log(user)
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

          console.log(progress);
          setFilePercentage(Math.round(progress));
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

  console.log(formData);

  useEffect(() => {
    if(file) handleFileUpload(file);
  }, [file]);

  return (
    <div className="container">
      <h1 className="display-2 text-center my-3">User Profile</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="d-flex flex-column align-items-center">
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
              src={user?.photo}
              alt="profile"
              onClick={() => inputRef.current.click()}
            />

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
            <span id="span-delete" className="text-danger d-inline-block">
              Delete Account
            </span>
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
