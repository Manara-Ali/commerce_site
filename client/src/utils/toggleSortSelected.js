const toggleSortSelected = (e) => {
    [...document.querySelector("#sort-container").children].forEach((element) => {
        element.classList.remove("selected");
    });

    e.target.classList.add("selected");
  };

export default toggleSortSelected;