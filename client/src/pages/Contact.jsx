import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const Contact = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta
          name="description"
          content="Contact us anytime with questions and/or comments that you may have or simply if you're looking for more information."
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
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
      <h1 className="display-3 mt-5 mb-4 text-center">Contact Us</h1>
      <p
        className="px-4"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Thank you for considering <span className="business-name">Mimi's Kitchen & Grill</span> for your catering needs
        and online orders! We're excited to help make your event unforgettable.
      </p>

      <p
        className="px-4"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        We're here to help and assist you with any questions or inquiries you
        may have. Please feel free to reach out to us using the contact
        information below:
      </p>

      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Address:
        <p className="lead my-0">[Your Business Address]</p>
        <p className="lead my-0">[City, State, ZIP Code]</p>
        <p className="lead my-0">[Country]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Phone:
        <p className="lead my-0">[Your Phone Number]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Email:
        <p className="lead my-0">[Your Email Address]</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Operating Hours:
        <p className="lead my-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="lead my-0">Saturday: 10:00 AM - 4:00 PM</p>
        <p className="lead my-0"> Sunday: Closed</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Connect With Us:
        <p className="lead my-0">Facebook</p>
        <p className="lead my-0">Instagram</p>
        <p className="lead my-0">LinkedIn</p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Event Inquiries:
        <p className="lead my-0">
          For event inquiries, consultations, and catering quotes, please email
          us at [Your Event Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        General Inquiries:
        <p className="lead my-0">
          For general questions and information, please email us at [Your
          General Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Feedback:
        <p className="lead my-0">
          We appreciate your feedback! Let us know how we did by emailing [Your
          Feedback Email Address].
        </p>
      </p>
      <p
        className="px-4 lead font-weight-bold"
        style={{ fontSize: "1.5rem", fontWeight: "400", color: "#262626" }}
      >
        Customer Support:
        <p className="lead my-0">
          For customer support, please email us at [Your Customer Support Email
          Address] or call us at [Your Customer Support Phone Number].
        </p>
        <p className="lead mt-5">
          At <span className="business-name">Mimi's Kitchen & Grill</span>, we always look forward to creating an exceptional culinary experience for you and your loved ones!
        </p>
      </p>
    </div>
    </>
  );
};
