'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });
}






//Sender name validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  const senderName = document.getElementById("senderName").value;
  const errorElement = document.getElementById("error");

  // Regular expression to check for symbols or commas
  const invalidCharacters = /[^a-zA-Z\s]/;

  if (senderName.length === 1) {
      errorElement.textContent = "Sender name must be more than one character.";
  } else if (invalidCharacters.test(senderName)) {
      errorElement.textContent = "Sender name must not contain symbols or commas.";
  } else {
      errorElement.textContent = ""; // Clear error message
      // alert("Form submitted successfuASDASDASDFlly!");
      // Proceed with form submission or additional actions here
  }
});






// contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }
//   });
// }



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Contact Form Validation
let contactForm = document.getElementById('contact-form');
let fromName = document.getElementById('senderName');
let fromEmail = document.getElementById('senderMail');
let message = document.getElementById('message');
let nameError = document.getElementById('nameError');
let mailError = document.getElementById('mailError');
let msgError = document.getElementById('msgError');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /[^a-zA-Z\s]/

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Reset previous error messages
  nameError.textContent = '';
  mailError.textContent = '';
  msgError.textContent = '';

  let isValid = true;

  // Validate Name
  if (fromName.value.trim() === '') {
    nameError.textContent = 'Please enter your name.';
    isValid = false;
  } else if (nameRegex.test(fromName.value)) {
    nameError.textContent = 'Name cannot have numbers or symbols.';
    isValid = false;
  }

  // Validate Email
  if (!emailRegex.test(fromEmail.value)) {
    mailError.textContent = 'Please enter a valid email.';
    isValid = false;
  }

  // Validate Message
  if (message.value.trim() === '') {
    msgError.textContent = 'Please enter a message.';
    isValid = false;
  }

  // If all validations pass, send email
  if (isValid) {
    sendMail();
  }
});

// Send Email Function
function sendMail() {
  emailjs.init('X6fxbsF0Q4bcCat-C'); // Replace with your EmailJS User ID
  const serviceID = 'service_wa5amm8';
  const templateID = 'template_i6q2f2p';

  let params = {
    fromName: fromName.value,
    fromEmail: fromEmail.value,
    message: message.value
  };

  emailjs.send(serviceID, templateID, params)
    .then((response) => {
      alert('Message sent successfully!');
      console.log('SUCCESS!', response.status, response.text);

      // Reset the form fields and error messages
      contactForm.reset();
      nameError.textContent = '';
      mailError.textContent = '';
      msgError.textContent = '';
    })
    .catch((error) => {
      alert('Failed to send message. Please try again later.');
      console.error('FAILED...', error);
    });
}
     
