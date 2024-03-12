import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { googleAuthThunk } from "../store";

export const OAuth = ({ children }) => {
  const dispatch = useDispatch();
  // 1. Create Google auth function
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    dispatch(
      googleAuthThunk({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })
    );
  };

  return (
    <button
      type="button"
      id="google-login-btn"
      className="btn w-100 mt-4 d-flex align-items-center justify-content-center"
      onClick={handleGoogleClick}
    >
      {children}
    </button>
  );
};
