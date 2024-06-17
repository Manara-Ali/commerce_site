import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { updateMealThunk, clearState } from "../store";
import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { Helmet } from "react-helmet-async";

export const UpdateMeal = ({ children }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    images: [],
  });
  const [checked, setChecked] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImgUploadPercentage, setCoverImgUploadPercentage] = useState(0);
  const [coverImgUploadError, setCoverImgUploadError] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesUploadError, setImagesUploadError] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const { loading, status, error, meal } = useSelector((state) => {
    return state.mealsCombinedReducer;
  });

  const handleCoverImageUpload = (file) => {
    if (file) {
      const storage = getStorage(app);

      const filename = `${Date.now()}-${user?._id}-${coverImage?.name}`;

      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, coverImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // console.log(progress);

          setCoverImgUploadPercentage(Math.round(progress));
        },
        (error) => {
          setCoverImgUploadError(true);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
            setFormData({
              ...formData,
              coverImage: downLoadURL,
            });
          });
        }
      );
    } else {
      console.log("No file selected");
    }
  };

  const handleImagesUpload = (files) => {
    if (files.length && files.length < 4) {
      const promiseArr = [];

      for (let i = 0; i < files.length; i++) {
        promiseArr.push(storeImage(files[i]));
      }

      Promise.all(promiseArr).then((urls) => {
        setFormData({
          ...formData,
          images: [...formData.images, ...urls],
        });
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);

      const filename = `${Date.now()}-${user?._id}-${file?.name}`;

      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // console.log(progress);

          setCoverImgUploadPercentage(Math.round(progress));
        },
        (error) => {
          setImagesUploadError(true);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
            resolve(downLoadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMealThunk(formData));
    setFormData({
      images: [],
    });
  };

  useEffect(() => {
    setFormData({ ...formData, secretMeal: checked, slug });
  }, [checked]);

  useEffect(() => {
    if(meal.secretMeal) {
      setChecked(true);
    }
    setFormData({ ...formData, ...meal });
  }, []);

  useEffect(() => {
    if (status === "success") {
      setMessage("Your meal was successfully added to the menu!");

      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 2500);
    }
  }, [status]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    setTimeout(() => {
      dispatch(clearState());
    }, 5000);
  }

  if (coverImgUploadError) {
    setTimeout(() => {
      setCoverImgUploadError(false);
    }, 5000);
  }

  if (imagesUploadError) {
    setTimeout(() => {
      setImagesUploadError(false);
    }, 2500);
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Update a meal name, description, price, etc... through this page and persist any changes."
        />
        <link rel="canonical" href="/edit/:meal" />
      </Helmet>
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={`/${slug}`}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-3 mb-5 text-center">Update Meal</h1>
            {error ? (
              <Alert type="alert-danger" message={error.message} />
            ) : null}
            {message && <Alert type="alert-success" message={message} />}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  id="price"
                  step={0.01}
                  min={0}
                  onChange={handleChange}
                  value={formData.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Discount</label>
                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  id="discount"
                  value={formData.discount}
                  min={0}
                  step={0.01}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="summary"
                  id="summary"
                  value={formData.summary}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Spice Level</label>
                <input
                  type="text"
                  className="form-control"
                  name="spiceLevel"
                  id="spice-level"
                  value={formData.spiceLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Serving</label>
                <input
                  type="number"
                  className="form-control"
                  name="serving"
                  id="serving"
                  min={0}
                  value={formData.serving}
                  onChange={handleChange}
                />
              </div>
              {coverImgUploadError && (
                <p className="text-center text-danger">
                  An error occured while uploading your image
                </p>
              )}
              <div>
                <div className="form-group d-flex align-items-center border rounded-lg mb-4 p-3 meal-input">
                  <label className="w-100" htmlFor="password">
                    Image Cover
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    name="imageCover"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    value={formData.imageCover?.name}
                  />
                  {coverImage ? (
                    <button
                      type="button"
                      className="btn btn-outline-success px-5"
                      onClick={() => handleCoverImageUpload(coverImage)}
                    >
                      Edit Cover Image
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-5"
                      disabled
                    >
                      Edit Cover Image
                    </button>
                  )}
                </div>
                {imagesUploadError && (
                  <p className="text-center text-danger">
                    An error occured while uploading your images
                  </p>
                )}
              </div>
              <div className="form-group d-flex border rounded-lg mb-4 p-3 meal-input align-items-center">
                <label className="w-100" htmlFor="password">
                  Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="form-control"
                  name="images"
                  // value={formData.images}
                  onChange={(e) => setImages(e.target.files)}
                />
                {images.length ? (
                  <button
                    type="button"
                    className="btn btn-outline-success px-5"
                    onClick={() => handleImagesUpload(images)}
                  >
                    Edit Images
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-5"
                    disabled
                  >
                    Edit Images
                  </button>
                )}
              </div>
              <div className="form-group d-flex">
                <label className="w-50" htmlFor="password">
                  Secret Meal
                </label>
                <input
                  type="checkbox"
                  className="form-control"
                  name="secretMeal"
                  value={formData.secretMeal}
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  style={{ width: "7rem" }}
                />
              </div>
              <button id="create-meal-btn" type="submit" className="btn mt-3">
                Update Meal
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
