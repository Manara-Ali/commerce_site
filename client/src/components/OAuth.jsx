import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleAuthThunk } from "../store";

export const OAuth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 1. Create Google auth function
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    dispatch(googleAuthThunk({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
    }));
  };
  
  return (
    <button
      type="button"
      id="google-login-btn"
      className="btn btn-outline-info w-100 mt-4 d-flex align-items-center justify-content-center"
      onClick={handleGoogleClick}
    >
      {children}
    </button>
  );
};
