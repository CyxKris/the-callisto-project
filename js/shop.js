
const mainNavigationBar = document.querySelector("#navigation-bar");
const menuNavigation = document.querySelector(".navigation");
const menu = document.querySelector("#menu");
// ?THE SHOP
const shopIcon = document.querySelector("#shop");
const closeIcon = document.querySelector("#close");
const cartContent = document.querySelector("#cart-content");

const cartLabel = document.querySelector("#cart-label");
const cartBoxes = document.querySelector("#cart-boxes");
const cartTotal = document.querySelector("#cart-total");
const cartOrder = document.querySelector("#cart-order");

const body = document.body;
let lastScroll = 0;


// ?THE MENU NAVIGATION
// Giving the menu button functionality
function show() {
    menu.classList.toggle("open");
    menuNavigation.classList.toggle("active");

    if (menuNavigation.classList.contains("active")) {
        menu.innerHTML = `<img src="images/close.svg" alt="Close Menu Icon">`;
        body.classList.add('no-scroll');
        shopIcon.style.display = 'none';
    } else {
        menu.innerHTML = `<img src="images/Menu-icon.svg" alt="Menu Icon">`;
        body.classList.remove('no-scroll');
        shopIcon.style.display = 'block';
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

// ?THE CART SECTION
// Giving the shop Icon functionality
function showCart() {
    generateCartItems();
    shopIcon.classList.toggle("open");
    cartContent.classList.toggle("active");

    if (cartContent.classList.contains("active")) {
        shopIcon.style.display = 'none';
        menu.innerHTML = "";
        closeIcon.style.display = "block";
        // body.classList.add('no-scroll');
    } else {
        shopIcon.style.display = 'block';
        menu.innerHTML = `<img src="images/Menu-icon.svg" alt="Menu Icon">`;
        closeIcon.style.display = "none";
        // body.classList.remove('no-scroll');
    }
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






// ?THE SHOP PAGE
const products = document.querySelector(".products-container");


// Creating an array of objects containing the products added to the cart.
// Setting the cart to the cart stored on the local storage (if it exists).
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

// Function to put the data into the HTML page
const generateProducts = () => {
    return (products.innerHTML = productData.map(
        (x) => {
            let { id, name, image, alt, link, content, price} = x;

            // Search through the cart, if the id is present already, put it in the search function, else, the search becomes an empty array.
            // let search = cart.find((x) => x.id === id) || [];

            return `
            <div id="${id}" class="product">
                <div class="product-image">
                    <a href="${link}"><img src=${image} alt="${alt}"></a>
                </div>

                <p class="product-name">${name}</p>

                <div class="purchase flex">
                    <div>
                        <p class="product-content">${content}</p>
                        <p class="product-price">₦${price}</p>
                    </div>
                    <div>
                        <a class="buy-button" onclick="addToCart(${id})">ADD TO CART</a>
                    </div>
                </div>
            </div>
            `
        }
    ).join(""));
};

generateProducts();


// *The Add To Cart function
const addToCart = (id) => {
    let selectedItem = id;

    // Searching through the products array for the selected item
    let searchProducts = productData.find((item) => item.id === selectedItem.id);
    // Searching through the cart array for the selected item
    let searchCart = cart.find((item) => item.id === selectedItem.id);

    // Adding the selected item to the cart if it isn't found there already
    if (!searchCart) {
        cart.push(
            {
                // id: selectedItem.id,
                id: searchProducts.id,
                amount: searchProducts.amount,
                amountId: searchProducts.amountId
            },
        );
    } else return;

    // Getting the sum of the amount of all items
    calculation();

    // Adding the items in the cart to the local storage
    localStorage.setItem("Cart", JSON.stringify(cart));
    generateCartItems();
    totalAmount();
};


const generateCartItems = () => {
    if (cart.length !== 0) {
        cartLabel.style.display = "none";
        cartBoxes.style.display = 'block';
        cartTotal.style.display = 'flex';
        cartOrder.style.display = 'block';
        return (cartBoxes.innerHTML = cart.map(
            (box) => {
                let { id, amount, amountId} = box;
                let search = productData.find((x) => x.id === id) || [];
                return `
                <div class="cart-box">
                    <img class="cart-product-image" src="${search.image}">
                    <div class="cart-detail">
                        <p class="card-product-name">${search.name}</p>
                        <p class="card-product-price">₦${search.price}</p>
                        <div class="amount flex">
                            <img src="images/minus.svg" onclick="decrement('${amountId}')">

                            <p id="${amountId}" class="cart-card-amount">${amount}</p>

                            <img src="images/plus.svg" onclick="increment('${amountId}')">
                        </div>
                    </div>
                    <div class="delete-container flex"><img src="images/delete-solid.svg" class="delete-icon" onclick="deleteItem(${id})"></div>
                </div>
                `
            }
        ).join("")
        );
    }
    else {
        cartBoxes.style.display = 'none';
        cartTotal.style.display = 'none';
        cartOrder.style.display = 'none';
        cartLabel.style.display = 'block';
        // cartLabel.innerHTML = ` <h3>Cart Is Empty</h3> `;
    }
}

generateCartItems();


// *Function to increase the amount (the text that shows the amount on the cart page)
const increment = (id) => {
    let selectedItem = id;

    // let search = productData.find((item) => item.amountId === selectedItem);
    let search = cart.find((item) => item.amountId === selectedItem);

    search.amount += 1;
    
    generateCartItems();
    update(selectedItem);
    localStorage.setItem("Cart", JSON.stringify(cart));
}


// *Function to increment the amount (the text that shows the amount on the cart page)
const decrement = (id) => {
    let selectedItem = id;

    // let search = productData.find((item) => item.id === selectedItem);
    let search = cart.find((item) => item.amountId === selectedItem);

    if (!search) return;
    else if (search.amount === 0) return;
    else {
        search.amount -= 1;
        // update(selectedItem.id);
    }

    update(selectedItem);

    // Removing any product that doesn't have an amount greater than 0.
    cart = cart.filter((x) => x.amount !== 0);

    generateCartItems();

    localStorage.setItem("Cart", JSON.stringify(cart));
};


const deleteItem = (id) => {
    let selectedItem = id;

    cart = cart.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("Cart", JSON.stringify(cart));
};




// *Function to update the amount (the text that shows the amount on the cart page)
const update = (id) => {
    let search = cart.find((item) => item.amountId === id);

    document.getElementById(id).innerHTML = search.amount;
    calculation();
    totalAmount();
}

const totalAmount = () => {
    if (cart.length !== 0) {
        let totalCartAmount = cart.map((x) => {
            let { id, amount } = x;
            let search = productData.find((y) => y.id === id) || [];
            return amount * search.price;
        }).reduce((a, b) => a + b, 0);
        document.querySelector(".total-price").innerHTML = "₦" + totalCartAmount;
    } else return;
}

totalAmount();

// *Function to get the total amount of items in the cart
const calculation = () => {
    const cartAmount = document.getElementById("cart-amount");
    if (cart.length === 0) {
        if (cartAmount) {
            cartAmount.innerHTML = 0;
        }
        return;
    }
    
    const totalAmount = cart.map((x) => x.amount).reduce((a, b) => a + b);
    if (cartAmount) {
        cartAmount.innerHTML = totalAmount;
    }
};


calculation();

const clearCart = () => {
    cart = [];
    generateCartItems();
    calculation();
    localStorage.setItem("Cart", JSON.stringify(cart));
};

// ?THE SEND ORDER MODAL
const modal = document.querySelector("[cart-modal]");
const closeModal = document.querySelector("[cart-close-modal]");
const openModal = document.querySelector("[cart-open-modal]");

openModal.addEventListener(
    'click',
    () => {
        modal.show();
    }
);

closeModal.addEventListener(
    'click',
    () => {
        modal.close();
        clearCart();
    }
);

// ?THE FOOTER FORM
const footerForm = document.querySelector(".newsletter-form");
const footerFormSubmit = document.querySelector(".footer-submit");
const footerModal = document.querySelector("[data-modal]");
const footerCloseModal = document.querySelector("[data-close-modal]");

footerFormSubmit.addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        if (footerForm.checkValidity()) {
            footerModal.show();
        } else {
            footerForm.reportValidity();
        }
    }
);

footerCloseModal.addEventListener(
    'click',
    () => {
        footerModal.close();
        footerForm.reset();
    }
);