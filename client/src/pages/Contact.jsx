import { Link } from "react-router-dom";

export const Contact = ({ children }) => {
  return (
    <div>
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
      <h1 className="display-3 text-center">Contact Us</h1>
      <p
        className="px-4"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Thank you for your interest in Silver Spoon! We're here to assist you
        with any questions or inquiries you may have. Please feel free to reach
        out to us using the contact information below:
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000"}}
      >
        Address:
        {/* <p className="lead my-0">105 Leyland Xing,</p>
        <p className="lead my-0">Dallas, GA</p>
        <p className="lead my-0">30132, USA</p> */}
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000"}}
      >
        Address:
        {/* <p className="lead my-0">105 Leyland Xing,</p>
        <p className="lead my-0">Dallas, GA</p>
        <p className="lead my-0">30132, USA</p> */}
      </p>
      

    </div>
  );
};
