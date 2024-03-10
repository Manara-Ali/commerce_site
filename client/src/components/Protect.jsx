import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Protect = ({ children, url }) => {
  const location = useLocation();
  
  const { isAuthenticated } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={`${url}`} state={{ from: location }} replace={true} />
      )}
    </>
  );
};
