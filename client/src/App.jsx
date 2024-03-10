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

export const App = () => {
  const location = useLocation();
  const [userIp, setUserIp] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setUserIp(response.data.ip);
    });
  }, []);

  useEffect(() => {
    const params = {
      auth: import.meta.env.VITE_GEOCODE_API_KEY,
      locate: userIp,
      json: "1",
    };

    axios
      .get("https://geocode.xyz", { params })
      .then((response) => {
        setUserLocation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userIp]);

  console.log(userLocation);

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${
          userLocation.latt
        }&lon=${userLocation.longt}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`,
      });

      setWeatherData(response.data);
    };

    if (userLocation.latt && userLocation.longt) {
      getWeather();
    }
  }, [userLocation?.latt, userLocation?.longt]);

  const { isAuthenticated, user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <div className="app-container">
      {isAuthenticated || user?._id ? <PrivateNavbar /> : <Navbar />}
      {/* <div className="d-flex justify-content-between"> */}
      {/* {isAuthenticated && ( */}
      {/* <>
            <Greeting />
            <Weather location={userLocation} weather={weatherData} />
          </> */}
      {/* )} */}
      {/* </div> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Greeting />
              <Weather location={userLocation} weather={weatherData} />
            </Home>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <Protect>
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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
