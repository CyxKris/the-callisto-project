
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
        nextEl: "#angle-right",
        prevEl: "#angle-left",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1023: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    }
});


// ?THE CONTACT US FORM
const formEl = document.querySelector("#message-form");
// const closeBtn = document.querySelector(".close");
const email = document.querySelector('#email');
const phone = document.querySelector("#phoneNumber");
const message = document.querySelector('#message');
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
// const input = formGroups.selector("input, textarea");

const formSuccessIcon = document.querySelectorAll(".success-icon");
const formErrorIcon = document.querySelectorAll(".error-icon");


const validateForm = formName => {
    // Preventing the form inputs from being validated when the form is submitted
    formName.setAttribute("novalidate", " ");



    // Validating each input elements in the form group
    const validateSingleFormGroup = formGroup => {

        return new Promise((resolve, reject) => {
            const input = formGroup.querySelector("input, textarea");
            const span = formGroup.querySelector("span");
            const groupErrorMessage = formGroup.querySelector(".error");
            const successIcon = formGroup.querySelector(".success-icon");
            const errorIcon = formGroup.querySelector(".error-icon");
            const empty = input.value === "";

            const isValid = input.checkValidity();
            
            if (empty) {
                groupErrorMessage.innerHTML = `${span.innerHTML} is required`;
                errorIcon.style.opacity = 1;
                successIcon.style.opacity = 0;
                resolve(false);
            } else if (!empty && isValid && groupErrorMessage) {
                groupErrorMessage.innerHTML = "";
                errorIcon.style.opacity = 0;
                successIcon.style.opacity = 1;
                resolve(true);
            } else if (!empty && !isValid) {
                groupErrorMessage.innerHTML = `Enter a valid ${span.innerHTML}`;
                errorIcon.style.opacity = 1;
                successIcon.style.opacity = 0;
                resolve(false);
            }
        })

    }

    // Validating each input field once it loses focus
    Array.from(formName.elements).forEach(element => {
        element.addEventListener(
            "blur",
            a => {
                console.log(a.srcElement.parentElement);
                validateSingleFormGroup(a.srcElement.parentElement);
            }
        )
    });

    // Validating the form groups
    const validateFormGroups = a => {

        return new Promise((resolve, reject) => {
            const formGroups = Array.from(a.querySelectorAll(".form-group"));
            // *Looping through the form groups and validating each of them
            // formGroups.forEach(formGroup => {
            //     validateSingleFormGroup(formGroup);
            // })
            formGroups.forEach(async formGroup => {
                const validFormGroup = await validateSingleFormGroup(formGroup);
                if (validFormGroup) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
        
    }


    // Submitting the form
    formName.addEventListener(
        "submit",
        async e => {
            // Prevent form from submitting
            e.preventDefault();

            // Validating the form
            const validFormGroups = await validateFormGroups(formName);

            if (validFormGroups) {
                formElModal.show();
            }

            // Removing the opacity of the icons
            if (formErrorIcon || formSuccessIcon) {
                formSuccessIcon.forEach(icon => {
                    icon.style.opacity = 0;
                })
    
                formErrorIcon.forEach(icon => {
                    icon.style.opacity = 0;
                })
            }

            // Resetting the form
            formName.reset();
        }
    );
}

validateForm(formEl);


//? THE MODAL
const formElModal = document.querySelector("[form-modal]");
const formElModalClose = document.querySelector("[form-modal-close]");

// The Form Modal
formElModalClose.addEventListener(
    'click',
    () => {
        formElModal.close();
    }
);