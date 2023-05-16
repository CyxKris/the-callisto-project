
// ?THE MENU
const mainNavigationBar = document.querySelector("#navigation-bar");
const menuNavigation = document.querySelector(".navigation");
const menu = document.querySelector("#menu");
const shopIcon = document.querySelector("#shop");
const cartContent = document.querySelector("#cart-content");

const body = document.body;
let lastScroll = 0;

// ?THE MENU NAVIGATION
// Giving the menu button functionality
function show() {
    menu.classList.toggle("open");
    menuNavigation.classList.toggle("active");

    if (menuNavigation.classList.contains("active")) {
        menu.innerHTML = `<img src="images/close.svg" alt="Close Menu Icon">`;
        shopIcon.innerHTML = "";
        body.classList.add('no-scroll');
    } else {
        menu.innerHTML = `<img src="images/Menu-icon.svg" alt="Menu Icon">`;
        shopIcon.innerHTML = `<img src="images/Shop-icon.svg" alt="Shop Icon">
        <div class="cart-amount">0</div>`
        body.classList.remove('no-scroll');
    }

    // if (menu.classList.contains('open')) {
    //     menu.innerHTML = `<img src="images/close.svg" alt="Close Menu Icon">`;
    //     body.classList.add('no-scroll');
    //     // shopIcon.style.display = 'none';
    // } else {
    //     menu.innerHTML = `<img src="images/Menu-icon.svg" alt="Menu Icon">`;
    //     body.classList.remove('no-scroll');
    //     // shopIcon.style.display = 'block';
    // }

    // menu.classList.contains("open") ? menu.innerHTML = `<img src="images/close.svg" alt="Close Menu Icon">` : menu.innerHTML = `<img src="images/Menu-icon.svg" alt="Menu Icon">`;
}

// Making the navigation bar visible when scrolling up & invisible when scrolling down
window.addEventListener(
    "scroll",
    function () {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition <= 0) {
            body.classList.remove("scroll-up");
        }

        if (currentScrollPosition > lastScroll && !body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
        }

        if (currentScrollPosition < lastScroll && body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
        }

        lastScroll = currentScrollPosition;
    }
);



// ?THE FOOTER FORM
const footerForm = document.querySelector(".newsletter-form");
const footerFormSubmit = document.querySelector(".footer-submit");
const modal = document.querySelector("[data-modal]");
const closeModal = document.querySelector("[data-close-modal]");

footerFormSubmit.addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        if (footerForm.checkValidity()) {
            modal.show();
        } else {
            footerForm.reportValidity();
        }
    }
);

closeModal.addEventListener(
    'click',
    () => {
        modal.close();
        footerForm.reset();
    }
);


