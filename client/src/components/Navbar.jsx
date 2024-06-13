import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import logo from "../assets/mimisKitchen.png";

export const Navbar = () => {
  const navRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-xl d-flex justify-content-between"
      onClick={() => {
        navRef.current?.click();
        setOpenMenu(!openMenu);
      }}
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
        {openMenu ? (
          <MdOutlineRestaurantMenu
            size={50}
            color="#66ba30"
            style={{ margin: 0 }}
          />
        ) : (
          <span className="navbar-toggler-icon">
            <i id="menu" className="fa fa-bars fa-3x" aria-hidden="true"></i>
          </span>
        )}
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
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
};
