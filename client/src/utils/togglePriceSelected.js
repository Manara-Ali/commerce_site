const togglePriceSelected = (e) => {
    [...document.querySelector("#price-container").children].forEach((element) => {
        element.classList.remove("selected");
    });

    e.target.classList.add("selected");
  };

export default togglePriceSelected;