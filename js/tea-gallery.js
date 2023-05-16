
// ?TEA GALLERY VARIABLES
// const headerEl = document.querySelector("header");
// const heroEl = document.querySelector("#hero");
// const heroElPadding = heroEl.style.padding;
// const mainEl = document.querySelector("main");
// const footerEl = document.querySelector("footer");

// const targetEl = document.querySelector("#target");

// const headerContent = headerEl.innerHTML;
// const heroContent = heroEl.innerHTML;
// const mainContent = mainEl.innerHTML;
// const footerContent = footerEl.innerHTML;

// const emptyContent = "";

// Defining the scrollPosition and the currentScrollPosition
// let scrollPosition = "";
// let currentScrollPosition = document.documentElement.scrollTop = document.body.scrollTop;



// ?THE TEA GALLERY PAGE
// const loadFile = name => {
//     // getting the scroll position before the file is loaded
//     scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
//     fetch(`popup-${name}.html`)
//         .then(res => {
//             if (res.ok) {
//                 return res.text();
//             }
//         })
//         .then(htmlSnippet => {
//             // resetting the scroll position to 0 when the file is loaded
//             window.scroll(0, 0);

//             targetEl.innerHTML = htmlSnippet;

//             headerEl.classList.add("hidden");
//             heroEl.classList.add("hidden");
//             mainEl.classList.add("hidden");
//             footerEl.classList.add("hidden");
//         });
// };


// const closeFile = () => {
//     // setting the scroll position back to what it was before the file was loaded
//     window.scroll(0, scrollPosition);

//     targetEl.innerHTML = '';
//     targetEl.classList.add("hidden");

//     headerEl.classList.remove("hidden");
//     heroEl.classList.remove("hidden");
//     mainEl.classList.remove("hidden");
//     footerEl.classList.remove("hidden");
// }


// ?TEA GALLERY PAGE
const headerEl = document.querySelector("header");
const heroEl = document.querySelector("#hero");
const heroElPadding = heroEl.style.padding;
const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");

const targetEl = document.querySelector("#target");

// Defining the scrollPosition and the currentScrollPosition
let scrollPosition = "";
let currentScrollPosition = document.documentElement.scrollTop = document.body.scrollTop;


const loadFile = name => {
    // getting the scroll position before the file is loaded
    scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    fetch(`popup-${name}.html`)
        .then(res => {
            // if (res.ok) {
            //     return res.text();
            // }
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();
        })
        .then(htmlSnippet => {
            // resetting the scroll position to 0 when the file is loaded
            window.scroll(0, 0);

            headerEl.classList.add("hidden");
            heroEl.classList.add("hidden");
            mainEl.classList.add("hidden");
            footerEl.classList.add("hidden");

            targetEl.innerHTML = htmlSnippet;
            targetEl.classList.remove("hidden");
        });
};

const closeFile = () => {
    // setting the scroll position back to what it was before the file was loaded
    window.scroll(0, scrollPosition);

    targetEl.innerHTML = '';
    targetEl.classList.add("hidden");

    headerEl.classList.remove("hidden");
    heroEl.classList.remove("hidden");
    mainEl.classList.remove("hidden");
    footerEl.classList.remove("hidden");
}