// //
// const budgetSlider = document.getElementById("budgetRange");
// const budget = document.getElementById("budget");
// budgetSlider.addEventListener("input", updateValue);

// function updateValue(e) {
//   budget.textContent = e.target.value;
// }

//Styles the Range Slider
let config = {
    //Range Input Styles
    "--range-input-width": "100%",
    "--range-margin-top": "0",
    "--range-margin-bottom": "36px",

    //Thumb/Handle Styles
    "--thumb-bg": "#2c4bff",
    "--thumb-height": "30px",
    "--thumb-width": "30px",
    "--thumb-margin-top": "-9px",
    "--thumb-border": "none",
    "--thumb-border-radius": "15px",
    "--thumb-focus-outline": "none",
    "--thumb-focus-border": "1px solid #80bdff",
    "--thumb-focus-box-shadow": "0 0 0 0.2rem rgb(0 123 255 / 25%)",

    //Track Styles
    "--track-bg": "#eaeaea",
    "--track-height": "12px",
    "--track-width": "100%",
    "--track-border": "none",
    "--track-border-radius": "6px"
};

let r = document.querySelector(":root");
Object.keys(config).forEach(function (key) {
    r.style.setProperty(key, config[key]);
});