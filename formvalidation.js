const form = document.getElementById("id-form");
const fname = document.getElementById("first-name");
const lname = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

function showError(input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector("small");
  formControl.classList.add("error");
  errorMsg.textContent = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
}

function validateForm() {
  let isValid = true;

  if (fname.value.trim() === "") {
    showError(fname, "First name is required");
    isValid = false;
  } else {
    showSuccess(fname);
  }

  if (lname.value.trim() === "") {
    showError(lname, "Last name is required");
    isValid = false;
  } else {
    showSuccess(lname);
  }

  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email");
    isValid = false;
  } else {
    showSuccess(email);
  }
  if (password.value.trim() === "") {
    showError(password, "Password is required");
    isValid = false;
  } else if (password.value.trim().length < 8) {
    showError(password, "Password must be at least 8 characters long");
    isValid = false;
  } else {
    showSuccess(password);
  }

  const checkedThree = document.querySelectorAll(
    '.technology input[type="checkbox"]:checked'
  );
  if (checkedThree.length < 3) {
    document.querySelector(".tech").classList.add("error");
    const errorMsg = document.querySelector(".tech small");
    errorMsg.textContent = "Choose at least 3 services";
    isValid = false;
  } else {
    document.querySelector(".tech").classList.remove("error");
    document.querySelector(".tech small").textContent = "";
  }

  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    document.getElementById("container").style.display = "none";
  }
});
