const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid")
  }
}

// Check required fields

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    // console.log(input.value);
    if(input.value.trim() === "") {
      showError(input, `${getFieldName(input.id)} is required`);
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
const checkLength = (input, min, max) => {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input.id)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input.id)} must be less than ${max} characters`);
  } else {
    showSuccess(input)
  }
}

// Check passwords match

const checkPasswordMatch = (input1, input2) => {
  if(input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
}


const getFieldName = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// Event Listener
form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});














  // if(username.value === "") {
  //   showError(username, "Username is required");
  // } else {
  //   showSuccess(username);
  // };

  // if(email.value === "") {
  //   showError(email, "Email is required");
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, "Email is not valid");
  // } else {
  //   showSuccess(email);
  // };

  // if(password.value === "") {
  //   showError(password, "Username is required");
  // } else {
  //   showSuccess(password);
  // };

  // if(password2.value === "") {
  //   showError(password2, "Username is required");
  // } else {
  //   showSuccess(password2);
  // };