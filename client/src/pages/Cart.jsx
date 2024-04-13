import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartRequest, addToCartSuccess } from "../store";
import { Alert } from "../components/Alert";
import { QuantityContext } from "../context/QuantityContext";

export const Cart = ({ children }) => {
  const dispatch = useDispatch();
  const { quantity } = useContext(QuantityContext);

  const { loading, error, status, cartItems } = useSelector((state) => {
    return state?.cartsCombinedReducer;
  });

  const handleQuantityChange = (e, item) => {
    dispatch(addToCartRequest());
    dispatch(addToCartSuccess({ ...item, qty: Number(e.target.value) }));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={"/"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>
          <i className="fa fa-home fa-2x" aria-hidden="true"></i>
        </button>
      </Link>
      <h1 className="display-3 text-center my-5 pb-4 border-bottom">
        Shopping Cart
      </h1>
      {!cartItems.length && (
        <Alert type="alert-danger" message="Your cart is empty." />
      )}
      <div className="list-group mb-5">
        {cartItems.map((item) => {
          return (
            <div key={item._id} className="mb-5 cart-border border-bottom">
              <div className="row mb-5 mx-0">
                <div
                  className="col-3 p-0"
                  style={{
                    backgroundImage: `url(${item.coverImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "10rem",
                    width: "5rem",
                    border: "2px solid #939393",
                    borderRadius: "1rem",
                  }}
                ></div>
                <div className="col-4 d-flex align-items-center">
                  <Link to={`/${item.slug}`} className="d-flex">
                    <div className="row d-flex align-items-center">
                      <p className="text-dark font-weight-bold col-10" 
                      style={{textDecoration: "underline"}}
                      >
                        {item.name}
                      </p>
                    </div>
                  </Link>
                  <i
                    className="fa fa-trash-o fa-2x mb-4"
                    aria-hidden="true"
                    style={{ color: "#d7456b" }}
                  ></i>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center p-0">
                  <p>${item.price}</p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="text-muted col-md-6">Qty:</p>
                  <select
                    className=" custom-select mb-3"
                    style={{ fontSize: "1.3rem" }}
                    value={quantity === item.qty ? quantity : item.qty}
                    onChange={(e) => handleQuantityChange(e, item)}
                  >
                    {Array.from({ length: 5 }, (_, index) => {
                      return ++index;
                    }).map((element) => {
                      return (
                        <option key={element} value={element}>
                          {element}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row mt-5 ml-0">
        <div className="list-group list-group-flush col">
          <h2 className="list-group-item text-center display-5 mb-1 p-5 border rounded-lg text-uppercase">
            Subtotal
          </h2>
          <div
            className="list-group-item text-center mb-1 p-3 border"
            style={{ fontSize: "1.8rem" }}
          >
            Number of Items: (<span className="font-weight-bold">
            {cartItems.reduce((accumulator, element) => {
              return (accumulator += element.qty);
            }, 0)}
            </span>) Items
          </div>
          <div
            className="list-group-item text-center mb-3 p-3 border"
            style={{ fontSize: "1.8rem" }}
          >
            Items Total: <span className="font-weight-bold">
            ${(cartItems.reduce((accumulator, element) => {
              return (accumulator += element.price * element.qty);

            }, 0)).toFixed(2)
            }
            </span>
          </div>
          <button className="btn w-100 p-3" id="checkout-btn">
            <h2 className="display-6 mb-0">Checkout <i className="fa fa-credit-card" style={{color: ""}} aria-hidden="true"></i></h2>
          </button>
        </div>
      </div>
    </div>
  );
};
