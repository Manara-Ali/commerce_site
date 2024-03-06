import tempIcon from "../assets/temp.png";

export const Weather = ({ location, weather }) => {
  const tempFarenheit = Math.ceil(weather.main?.temp - 273.15) * (9 / 5) + 32;
  return (
    <div className="d-flex flex-column align-items-center mr-3">
      <span>
        {location.city}, {location.state}
      </span>
      <span>
        <img id="weather-icon"
          src={`http://openweathermap.org/img/w/${weather?.weather?.[0]?.icon}.png`}
          alt="weather icon"
        />
      </span>
      <div className="d-flex align-items-center" id="temp-container">
        <img id="temp-icon" src={tempIcon} alt="temperature icon"/>
        <span>{tempFarenheit}ºF</span>
      </div>
    </div>
  );
};
