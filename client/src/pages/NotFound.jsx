import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const NotFound = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta
          name="description"
          content="Uh-oh... Looks like something went wrong. Please verify your url and try again."
        />
        <link rel="canonical" href="/page-not-found" />
      </Helmet>
    <div style={{height: "55vh"}}>
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={"/"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <h1 className="display-3 text-center">Page Not Found</h1>
      <div style={{
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/silver-spoon-21910.appspot.com/o/notfound.png?alt=media&token=a2883574-4425-4842-94f1-02b53654692b)`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        height: "70%",
        width: "100%",
      }}></div>
      <p className="display-5 px-5" style={{fontSize: "1.7rem"}}>The page you are looking for does not exist.</p>
      <p className="display-5 px-5" style={{fontSize: "1.7rem"}}>Click on the back button to return to the home page.</p>
    </div>
    </>
  );
};
