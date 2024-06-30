import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { addToCartRequest, addToCartSuccess, clearCart } from "../store";
import { Alert } from "../components/Alert";
import { RemoveFromCart } from "../components/RemoveFromCart";
import { QuantityContext } from "../context/QuantityContext";
import { SizeContext } from "../context/SizeContext";
import { PriceContext } from "../context/PriceContext";
import { ModalWindow } from "../components/ModalWindow";
import { ModalContext } from "../context/ModalContext";

export const Cart = ({ children }) => {
  const dispatch = useDispatch();
  const { quantity } = useContext(QuantityContext);
  const { size, setSize } = useContext(SizeContext);
  const { price, setPrice } = useContext(PriceContext);
  const [dropDownItem, setDropDownItem] = useState({});
  const [itemToRemove, setItemToRemove] = useState(null);

  const { loading, error, status, cartItems } = useSelector((state) => {
    return state?.cartsCombinedReducer;
  });

  const { cartModalOpen, setCartModalOpen } = useContext(ModalContext);

  const handleQuantityChange = (e, item) => {
    dispatch(addToCartRequest());
    dispatch(addToCartSuccess({ ...item, qty: Number(e.target.value) }));
  };

  const handleSizeChange = (e, item) => {
    const drinkSize = Number(e.target.value);

    setSize(drinkSize);

    if (drinkSize === 16) {
      setPrice(4.99);
    } else if (drinkSize === 12) {
      setPrice(3.99);
    } else if (drinkSize === 10) {
      setPrice(2.99);
    }

    // dispatch(addToCartRequest());
    // dispatch(addToCartSuccess({ ...item, size: Number(e.target.value), price }));
  };

  const handleItemRemoveRequest = (item) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.querySelector(".app-container").classList.add("blur");
    setCartModalOpen(true);
    setItemToRemove(item);
  };

  const selectItem = (e, item) => {
    console.log({
      ...item,
      size: Number(e.target.value),
      price: Number(e.target.value),
    });
    return { ...item, size, price };
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if(dropDownItem.name) {
      dispatch(addToCartRequest());
      dispatch(
        addToCartSuccess({...dropDownItem, price})
      );
    }
  }, [dropDownItem]);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta
          name="description"
          content="Use the cart to save the products you find interesting before heading to the check out page."
        />
        <link rel="canonical" href="/cart" />
      </Helmet>
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
                      // width: "5rem",
                      border: "2px solid #939393",
                      borderRadius: "1rem",
                    }}
                  ></div>
                  {item.size ? (
                    <div className="col-4 d-flex align-items-center">
                      <Link
                        to={`/${item.slug}?size=${item.size}`}
                        className="d-flex"
                      >
                        <div className="row d-flex align-items-center">
                          <p
                            className="text-dark font-weight-bold col-10"
                            style={{ textDecoration: "underline" }}
                          >
                            {item.name}
                          </p>
                        </div>
                      </Link>
                      <i
                        className="fa fa-trash-o fa-2x mb-4"
                        aria-hidden="true"
                        style={{ color: "#d7456b" }}
                        // onClick={() => dispatch(removeFromCart(item))}
                        onClick={() => handleItemRemoveRequest(item)}
                      ></i>
                    </div>
                  ) : (
                    <div className="col-4 d-flex align-items-center">
                      <Link to={`/${item.slug}`} className="d-flex">
                        <div className="row d-flex align-items-center">
                          <p
                            className="text-dark font-weight-bold col-10"
                            style={{ textDecoration: "underline" }}
                          >
                            {item.name}
                          </p>
                        </div>
                      </Link>
                      <i
                        className="fa fa-trash-o fa-2x mb-4"
                        aria-hidden="true"
                        style={{ color: "#d7456b" }}
                        // onClick={() => dispatch(removeFromCart(item))}
                        onClick={() => handleItemRemoveRequest(item)}
                      ></i>
                    </div>
                  )}
                  <div className="col-2 d-flex justify-content-center align-items-center p-0">
                    {/* <p>${item.price}</p> */}
                    <p>${price}</p>
                  </div>
                  <div className="d-flex align-items-center" style={{border: "1px solid red"}}>
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
                    {item.size ? (
                    <div className="d-flex align-items-center">
                      <p className="text-muted col-md-6">Size:</p>
                      <select
                        className=" custom-select mb-3"
                        style={{ fontSize: "1.3rem" }}
                        value={size === item.size ? item.size : size}
                        onChange={(e) => {
                          handleSizeChange(e, item);
                          setDropDownItem({...item, size: Number(e.target.value)});
                        }}
                      >
                        {[16, 12, 10].map((element) => {
                          return (
                            <option key={element} value={element}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : null}
                  </div>
                  {/* {item.size ? (
                    <div className="d-flex align-items-center">
                      <p className="text-muted col-md-6">Size:</p>
                      <select
                        className=" custom-select mb-3"
                        style={{ fontSize: "1.3rem" }}
                        value={size === item.size ? item.size : size}
                        onChange={(e) => {
                          handleSizeChange(e, item);
                          setDropDownItem({...item, size: Number(e.target.value)});
                        }}
                      >
                        {[16, 12, 10].map((element) => {
                          return (
                            <option key={element} value={element}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : null} */}
                </div>
              </div>
            );
          })}
          {cartItems.length ? (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger w-25 text-uppercase font-weight-bold"
                id="clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          ) : null}
        </div>
        {cartItems.length ? (
          <div className="row mt-5 ml-0">
            <div className="list-group list-group-flush col">
              <h2 className="list-group-item text-center display-5 mb-1 p-5 border rounded-lg text-uppercase">
                Subtotal
              </h2>
              <div
                className="list-group-item text-center mb-1 p-3 border"
                style={{ fontSize: "1.8rem" }}
              >
                Number of Items: (
                <span className="font-weight-bold">
                  {cartItems.reduce((accumulator, element) => {
                    return (accumulator += element.qty);
                  }, 0)}
                </span>
                ) Items
              </div>
              <div
                className="list-group-item text-center mb-3 p-3 border"
                style={{ fontSize: "1.8rem" }}
              >
                Items Total:{" "}
                <span className="font-weight-bold">
                  $
                  {cartItems
                    .reduce((accumulator, element) => {
                      return (accumulator += element.price * element.qty);
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
              <Link to="/checkout">
                <button className="btn w-100 p-3" id="checkout-btn">
                  <h2 className="display-6 mb-0">
                    Checkout{" "}
                    <i
                      className="fa fa-credit-card"
                      style={{ color: "" }}
                      aria-hidden="true"
                    ></i>
                  </h2>
                </button>
              </Link>
            </div>
          </div>
        ) : null}
        {cartModalOpen && (
          <ModalWindow>
            <RemoveFromCart itemToRemove={itemToRemove} />
          </ModalWindow>
        )}
      </div>
    </>
  );
};
