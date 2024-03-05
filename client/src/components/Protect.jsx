import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Protect = ({ children }) => {
  const location = useLocation();
  
  const { isAuthenticated } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace={true} />
      )}
    </>
  );
};
