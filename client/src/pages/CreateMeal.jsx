import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";

export const CreateMeal = () => {
  const [formData, setFormData] = useState({
    images: [],
  });
  const [checked, setChecked] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImgUploadPercentage, setCoverImgUploadPercentage] = useState(0);
  const [coverImgUploadError, setCoverImgUploadError] = useState(false);
  const [imagesUploadError, setImagesUploadError] = useState(false);
  const [images, setImages] = useState([]);

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
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

          console.log(progress);

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

          console.log(progress);

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
            [e.target.name] : e.target.value,
        }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  useEffect(() => {
      setFormData({...formData, secretMeal: checked})
  }, [checked])

  console.log(formData);

  if(coverImgUploadError) {
    setTimeout(() => {
        setCoverImgUploadError(false);
    }, 5000)
  }

  if(imagesUploadError) {
    setTimeout(() => {
        setImagesUploadError(false);
    }, 5000)
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-3 mb-5 text-center">Create New Meal</h1>
          {/* {error ? <Alert type="alert-danger" message={error.message} /> : null} */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={(e) => handleChange(e)}
                value={formData.name || ""}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                onChange={handleChange}
                value={formData.price || ""}
                min={0}
                step={0.01}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Discount</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                id="discount"
                onChange={handleChange}
                value={0 || formData.discount}
                min={0}
                step={0.01}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Summary</label>
              <textarea
                type="text"
                className="form-control"
                name="summary"
                id="summary"
                onChange={handleChange}
                value={formData.summary || ""}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                id="description"
                onChange={handleChange}
                value={0 ||formData.description}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Spice Level</label>
              <input
                type="text"
                className="form-control"
                name="spiceLevel"
                id="spice-level"
                onChange={handleChange}
                value={formData.spiceLevel || ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Serving</label>
              <input
                type="number"
                className="form-control"
                name="serving"
                id="serving"
                onChange={handleChange}
                value={0 || formData.serving}
                min={0}
                required
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
                  // value={meal.imageCover?.name || ""}
                  required
                />
                {coverImage ? (
                  <button
                    type="button"
                    className="btn btn-outline-success px-5"
                    onClick={() => handleCoverImageUpload(coverImage)}
                  >
                    Upload Cover Image
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-5"
                    disabled
                  >
                    Upload Cover Image
                  </button>
                )}
              </div>
              {
                imagesUploadError && <p className="text-center text-danger">
                  An error occured while uploading your images
                </p>
              }
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
                onChange={(e) => setImages(e.target.files)}
                // value={meal.images || ""}
              />
              {images.length ? (
                <button
                  type="button"
                  className="btn btn-outline-success px-5"
                  onClick={() => handleImagesUpload(images)}
                >
                  Upload Images
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-5"
                  disabled
                >
                  Upload Images
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
                checked={checked}
                onChange={() => setChecked(!checked)}
                style={{ width: "7rem" }}
              />
            </div>
            <button id="create-meal-btn" type="submit" className="btn mt-3">
              Create Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
