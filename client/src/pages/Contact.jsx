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
      <h1 className="display-3 my-5 text-center">Contact Us</h1>
      <p
        className="px-4"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Thank you for considering Mimi's Kitchen & Grill for your catering needs
        and online orders! We're excited to help make your event unforgettable.
      </p>

      <p
        className="px-4"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        We're here to help and assist you with any questions or inquiries you
        may have. Please feel free to reach out to us using the contact
        information below:
      </p>

      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Address:
        <p className="lead my-0">[Your Business Address]</p>
        <p className="lead my-0">[City, State, ZIP Code]</p>
        <p className="lead my-0">[Country]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Phone:
        <p className="lead my-0">[Your Phone Number]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Email:
        <p className="lead my-0">[Your Email Address]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Operating Hours:
        <p className="lead my-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="lead my-0">Saturday: 10:00 AM - 4:00 PM</p>
        <p className="lead my-0"> Sunday: Closed</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Connect With Us:
        <p className="lead my-0">Facebook</p>
        <p className="lead my-0">Instagram</p>
        <p className="lead my-0">LinkedIn</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Event Inquiries:
        <p className="lead my-0">
          For event inquiries, consultations, and catering quotes, please email
          us at [Your Event Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        General Inquiries:
        <p className="lead my-0">
          For general questions and information, please email us at [Your
          General Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Feedback:
        <p className="lead my-0">
          We appreciate your feedback! Let us know how we did by emailing [Your
          Feedback Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
      >
        Customer Support:
        <p className="lead my-0">
          For customer support, please email us at [Your Customer Support Email
          Address] or call us at [Your Customer Support Phone Number].
        </p>
      </p>
        <p className="lead mt-5">
          At Mimi's Kitchen & Grill, we always look forward to creating an exceptional culinary experience for you and your loved ones!
        </p>
    </div>
  );
};
