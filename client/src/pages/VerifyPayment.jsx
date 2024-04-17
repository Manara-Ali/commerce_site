import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyPaymentThunk, clearPaymentState, clearCart } from "../store";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";

export const VerifyPayment = () => {
  const dispatch = useDispatch();

  const { loading, error, status, paymentId } = useSelector((state) => {
    return state.paymentsCombinedReducer;
  });

  useEffect(() => {
    dispatch(verifyPaymentThunk({ paymentId }));
  }, [paymentId]);

  useEffect(() => {
    if(status === "success") {
        dispatch(clearCart());
    }
  }, [status])

  if (loading) {
    return <Spinner />;
  }

  if(error) {
    return <Alert type="alert-danger" message={error.message} />
  }

  if (error || error?.message) {
    setTimeout(() => {
      dispatch(clearPaymentState());
    }, 5000);
  }

  return (
    <div className="d-flex align-items-center" id="verify-payment-container" 
    // style={{ border: "1px solid red" }}
    >
      <div className="jumbotron d-flex flex-column align-items-center mx-4" style={{marginTop: "10rem"}}>
        <i className="fa fa-check-circle fa-5x" aria-hidden="true" style={{color: "#66ba30"}}></i>
        <h1 className="display-4"  style={{color: "#66ba30"}}>Payment Successful!</h1>
        <p className="lead text-center pb-2" style={{fontSize: "2rem"}}>
          Thank you for supporting your local businesses.
        </p>
        <p className="lead text-center pb-5 border-bottom" style={{fontSize: "2rem"}}>
          You should receive an email containing your order receipt shortly.
        </p>
        <hr className="my-4" />
        <p className="mb-5">
          Your transaction Id is: <span className="font-weight-bold">{paymentId}</span>
        </p>
        <Link to="/" className="btn btn-lg d-flex align-items-center" href="#" role="button" style={{background: "#d7456b", fontWeight: "bold", color: "#fff"}}>
          RETURN HOME 
          <i className="fa fa-home fa-2x ml-4" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
    // <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
    //   {isLoading ? (
    //     // Simulate loading state
    //     <div className="flex flex-col items-center justify-center">
    //       <FaSpinner className="animate-spin text-4xl text-blue-500 mb-3" />
    //       <p className="text-lg text-gray-600">
    //         Verifying your payment, please wait...
    //       </p>
    //     </div>
    //   ) : isError ? (
    //     // Simulate error state
    //     <div className="text-center text-red-500">
    //       <FaTimesCircle className="text-5xl mb-3" />
    //       <p className="text-xl">Payment verification failed</p>
    //       <p>An error occurred</p>
    //     </div>
    //   ) : (
    //     // Simulate success state
    //     <div className="text-center text-green-500">
    //       <FaCheckCircle className="text-5xl mb-3" />
    //       <h1 className="text-2xl font-bold mb-3">Payment Successful</h1>
    //       <p className="text-gray-600 mb-4">
    //         Thank you for your payment. Your transaction ID is {paymentIntentID}
    //         .
    //       </p>
    //       <Link
    //         to="/generate-content"
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //       >
    //         Start Using AI
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
};
