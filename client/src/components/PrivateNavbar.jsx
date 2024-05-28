import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mimisKitchen.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, clearCart } from "../store";
import { calcItemsInCart } from "../utils/calcItemsInCart";

export const PrivateNavbar = () => {
  const navRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, loading, isAuthenticated } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  const {
    loading: cartLoading,
    error: cartError,
    status: cartStatus,
    cartItems,
  } = useSelector((state) => {
    return state?.cartsCombinedReducer;
  });

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(clearCart());
    setTimeout(() => {
      location.reload();
    }, 500)
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
    }
  }, [status]);

  return (
    <nav
      className="navbar navbar-expand-xl d-flex justify-content-between"
      onClick={() => navRef.current?.click()}
    >
      {/* <div className="container"> */}
      <Link className="navbar-brand" href="/">
        <img src={logo} alt="log" style={{ width: "100px", height: "auto" }} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref={navRef}
      >
        <span className="navbar-toggler-icon">
          <i id="menu" className="fa fa-bars fa-3x" aria-hidden="true"></i>
        </span>
      </button>

      <div className="collapse navbar-collapse" id="navbar-content">
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Menu"
            aria-label="Search"
          />
          <button className="btn my-2 my-sm-0" type="submit">
            <i className="fa fa-search fa-2x" aria-hidden="true"></i>
          </button>
        </form> */}
        <ul className="navbar-nav ml-xl-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <div className="cart-div rounded-lg p-2 pr-3 mb-4" style={{border: "1px solid #fff"}}>
            <i
              className="fa fa-shopping-cart fa-2x"
              aria-hidden="true"
              style={{ color: "#fff", fontSize: "1.rem" }}
            ></i>
            <span
              className="badge badge-warning"
              id="lblCartCountNav"
              style={{
                paddingRight: `${
                  calcItemsInCart(cartItems) < 10
                    ? "0.5rem"
                    : calcItemsInCart(cartItems) === 10
                    ? "1.7rem"
                    : "2.2rem"
                }`,
              }}
            >

              {calcItemsInCart(cartItems) > 0
                ? calcItemsInCart(cartItems) <= 10
                  ? calcItemsInCart(cartItems)
                  : "10+"
                : null}
            </span>
          </div>
            </Link>
          </li>
          <li className="nav-item" id="profile-img-item">
            <Link className="nav-link" to="/profile">
              <img src={user.photo} alt="user photo" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={handleLogout}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
};
