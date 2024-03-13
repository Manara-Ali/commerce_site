import { useState, useEffect, useRef } from "react";

export const ImageSlider = ({ slides, parentWidth }) => {
  const timerId = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [clicked, setClicked] = useState(false);

  const nextSlide = function () {
    // setClicked(true);
    setSlideIndex((slideIndex) => (slideIndex + 1) % slides?.length);
  };

  const prevSlide = function () {
    // setClicked(true);
    if (slideIndex - 1 < 0) {
      setSlideIndex(slideIndex - 1 + slides.length);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  useEffect(() => {
    if (clicked) {
      return () => clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      nextSlide();
    }, 1500);

    return () => clearTimeout(timerId.current);
  }, [slideIndex, clicked]);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 3000);
    }
  }, [clicked]);

  return (
    <div className="slider-container">
      <i
        className="fa fa-chevron-left fa-2x"
        id="left-arrow"
        aria-hidden="true"
        onClick={() => {
          setClicked(true);
          prevSlide();
        }}
      ></i>
      <div
        className="img-slider-div"
        style={{ backgroundImage: `url(${slides[slideIndex]})` }}
      ></div>
      <i
        className="fa fa-chevron-right fa-2x"
        id="right-arrow"
        aria-hidden="true"
        onClick={() => {
          setClicked(true);
          nextSlide();
        }}
      ></i>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "50%",
          margin: "auto",
          color: "#d7456b",
        }}
      >
        {slides.map((_, index) => {
          return (
            <div
              key={index}
              className={`rectangle ${index === slideIndex ? "current" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
