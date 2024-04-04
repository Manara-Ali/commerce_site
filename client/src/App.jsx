import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Footer } from "./components/Footer";
import { Protect } from "./components/Protect";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PrivateNavbar } from "./components/PrivateNavbar";
import { Profile } from "./pages/Profile";
import { DeleteAccount } from "./pages/DeleteAccount";
import { Greeting } from "./components/Greeting";
import { Weather } from "./components/Weather";
import { CreateMeal } from "./pages/CreateMeal";
import { DetailMeal } from "./pages/DetailMeal";
import { UpdateMeal } from "./pages/UpdateMeal";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { getMealsCountThunk, clearState, storePagination } from "./store";

export const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userIp, setUserIp] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getMealsCountThunk());
    dispatch(clearState());
    dispatch(storePagination());
    setPageNumber(1);
  }, []);

  // useEffect(() => {
  //   axios.get("https://api.ipify.org?format=json").then((response) => {
  //     setUserIp(response.data.ip);
  //   });
  // }, []);

  // useEffect(() => {
  //   const params = {
  //     auth: import.meta.env.VITE_GEOCODE_API_KEY,
  //     locate: userIp,
  //     json: "1",
  //   };

  //   axios
  //     .get("https://geocode.xyz", { params })
  //     .then((response) => {
  //       // console.log(response);
  //       setUserLocation(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [userIp]);

  // useEffect(() => {
  //   const getWeather = async () => {
  //     const response = await axios({
  //       url: `https://api.openweathermap.org/data/2.5/weather?lat=${
  //         userLocation.latt
  //       }&lon=${userLocation.longt}&appid=${
  //         import.meta.env.VITE_OPENWEATHER_API_KEY
  //       }`,
  //     });

  //     setWeatherData(response.data);
  //   };

  //   if (userLocation.latt && userLocation.longt) {
  //     getWeather();
  //   }
  // }, [userLocation?.latt, userLocation?.longt]);

  const { isAuthenticated, user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <div className="app-container">
      {isAuthenticated || user?._id ? <PrivateNavbar /> : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Greeting  pageNumber={pageNumber} setPageNumber={setPageNumber}/>
              <Weather location={userLocation} weather={weatherData}/>
            </Home>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <Protect url="/login">
              <Profile>
                <Greeting />
                <Weather location={userLocation} weather={weatherData} />
              </Profile>
            </Protect>
          }
        />
        <Route
          path="/delete-account"
          element={
            <DeleteAccount>
              <Greeting />
              <Weather location={userLocation} weather={weatherData} />
            </DeleteAccount>
          }
        />
        <Route
          path="/create-meal"
          element={
            user?.role === "admin" ? (
              <CreateMeal>
                <Greeting />
                <Weather location={userLocation} weather={weatherData} />
              </CreateMeal>
            ) : (
              <Navigate to={"/"} state={{ from: location }} replace={true} />
            )
          }
        />
        <Route
          path="/:slug"
          element={
            <Protect url="/login">
              <DetailMeal>
                <Greeting />
                <Weather location={userLocation} weather={weatherData} />
              </DetailMeal>
            </Protect>
          }
        />
        <Route
          path="/edit/:slug"
          element={
            <Protect url="/login">
              <UpdateMeal>
                <Greeting />
                <Weather location={userLocation} weather={weatherData} />
              </UpdateMeal>
            </Protect>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
