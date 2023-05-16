
// ?THE SWIPER
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        // nextEl: ".swiper-button-next",
        // prevEl: ".swiper-button-prev",
        nextEl: "#angle-right",
        prevEl: "#angle-left",
    },
});


// *CHANGING THE BACKGROUND COLOR OF THE SWIPER BUTTONS WHEN THEY ARE CLICKED
const leftButton = document.querySelector("#angle-left");
const rightButton = document.querySelector("#angle-right");

leftButton.addEventListener(
    "mousedown",
    () => {
        leftButton.style.backgroundColor = "#004E3C";
    }
);

leftButton.addEventListener(
    "mouseup",
    () => {
        leftButton.style.backgroundColor = "#733858";
    }
);

rightButton.addEventListener(
    "mousedown",
    () => {
        rightButton.style.backgroundColor = "#004E3C";
    }
);

rightButton.addEventListener(
    "mouseup",
    () => {
        rightButton.style.backgroundColor = "#733858";
    }
);

