import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { QuantityContext } from "../context/QuantityContext";
import { Alert } from "../components/Alert";
import { checkoutPaymentThunk, clearPaymentState } from "../store";

export const Checkout = ({ children }) => {
  const dispatch = useDispatch();
  const { quantity } = useContext(QuantityContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const { itemsPrice, taxPrice, totalPrice, cartItems } = useSelector(
    (state) => {
      return state.cartsCombinedReducer;
    }
  );

  const {
    clientSecret,
    paymentId,
    metadata,
    loading,
    status,
    error: paymentError,
  } = useSelector((state) => {
    return state.paymentsCombinedReducer;
  });

  console.log(paymentError);

  // Configure stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements === null) return;

    const { error: submitError } = await elements.submit();

    if (submitError) return;

    try {
      const data = {
        itemsPrice: Number(itemsPrice),
        taxPrice: Number(taxPrice),
        totalPrice: Number(totalPrice),
        cartItems,
      };

      dispatch(checkoutPaymentThunk(data));

      //   if (status === "success") {
      //     const { error } = await stripe.confirmPayment({
      //       elements,
      //       clientSecret,
      //       confirmParams: {
      //         return_url: "http://localhost:5173/payment/success",
      //       },
      //     });

      //     if (error) {
      //       setErrorMessage(error.message);
      //     }
      //   }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const helperFn = async () => {
      if (status === "success" && !paymentError) {
        console.log("Here");
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: "https://commerce-site-igmb.onrender.com/payment/success",
          },
        });

        // if (paymentError) {
        //     console.log("There");
        //   setErrorMessage(error.message);
        // }
      }
    };

    helperFn();
  }, [status, paymentError]);

  useEffect(() => {
    if (paymentError) {
      console.log("There");
      setErrorMessage(paymentError.message);
    }

    setTimeout(() => {
        dispatch(clearPaymentState());
        setErrorMessage("");
    }, 3000)
  }, [paymentError]);

  return (
    <div
      className="container"
      // style={{ border: "1px solid red" }}
    >
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={"/cart"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>
          Back
        </button>
      </Link>
      <h1 className="display-4 text-center my-5 pb-4 border-bottom">
        Summary & Checkout
      </h1>
      <h1 className="display-4 text-center col border-bottom w-75 mx-auto mb-5">
        Order Detail
      </h1>
      {/* <div className="row" style={{ border: "1px solid red" }}>
        {!cartItems.length && (
          <Alert type="alert-danger" message="Your cart is empty." />
        )}
        </div> */}
      <div className="list-group mb-5">
        {cartItems.map((item) => {
          return (
            <div
              key={item._id}
              className="mb-3 cart-border border-bottom row order-item"
            >
              <div
                className="col-3 ml-4"
                style={{
                  backgroundImage: `url(${item.coverImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "8rem",
                  //   width: "40rem",
                  border: "2px solid #939393",
                  borderRadius: "1rem",
                }}
              ></div>
              <div
                className="col-4 text-center d-flex justify-content-center"
                //   style={{border: "1px solid blue"}}
              >
                <Link to={`/${item.slug}`} className="d-flex">
                  <div className="row d-flex align-items-center">
                    <p
                      className="text-dark font-weight-bold"
                      style={{ textDecoration: "underline" }}
                    >
                      {item.name}
                    </p>
                  </div>
                </Link>
              </div>
              <div
                className="col-4 d-flex justify-content-center align-items-center p-0 w-100"
                //   style={{border: "1px solid salmon"}}
              >
                <p>
                  {item.qty} x ${item.price} ={" "}
                  <span className="font-weight-bold">
                    ${item.qty * item.price}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        <h1 className="display-4 text-center col border-bottom w-100 mx-auto my-3">
          Order Summary
        </h1>
        <div className="row ml-0">
          <div className="list-group list-group-flush col">
            <div
              className="list-group-item text-center mb-3 p-3 border d-flex justify-content-between"
              style={{ fontSize: "1.8rem" }}
            >
              Order Price:
              <span className="font-weight-bold ml-5 text-center">
                ${itemsPrice}
              </span>
            </div>
            <div
              className="list-group-item text-center mb-3 p-3 border d-flex justify-content-between"
              style={{ fontSize: "1.8rem" }}
            >
              Taxes: <span className="font-weight-bold ml-5">${taxPrice}</span>
            </div>
            <div
              className="list-group-item text-center mb-3 p-3 border d-flex justify-content-between"
              style={{ fontSize: "1.8rem" }}
            >
              Total:{" "}
              <span className="font-weight-bold ml-5">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="display-4 text-center col border-bottom w-75 mx-auto mb-5">
        Payment
      </h1>
      <form className="border rounded-lg p-3" onSubmit={handleSubmit}>
        <div>
          <PaymentElement />
        </div>
        <button
          className="btn btn-success w-100 my-4 p-3 font-weight-bold"
          id="checkout-btn"
          style={{ fontSize: "1.5rem" }}
        >
          Pay
        </button>
        <div className="row">
          {errorMessage && <Alert type="alert-danger" message={errorMessage} />}
        </div>
      </form>
    </div>
  );
};
