//getting form and input elements from the html using their id's
const form = document.getElementById("id-form");
const fname = document.getElementById("first-name");
const lname = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

//for displaying errors
function showError(input, message) {
  const formControl = input.parentElement; //getting the parent element of the input
  const errorMsg = formControl.querySelector("small"); //then we find the small element in the parent div to display error message in it
  formControl.classList.add("error"); //we add error class to the parent element to show error, that is explained in css file
  errorMsg.textContent = message; //then we set the error message to the small element
}

//when everything is valid, we have to remove error class from the parent class, so errors will not be displayed anymore
function showSuccess(input) {
  const formControl = input.parentElement; //same here we acces input's parent element that has/if it has error class in it
  formControl.classList.remove("error"); //we remove the error class from the parent class
}

//function to check all the inputs and see if they are valid
function validateForm() {
  let isValid = true; //we set isValid to true, and if there is an error we set it to false, we use this in the end to check if it is true or false, so we can submit th e form and display the game

  if (fname.value.trim() === "") {
    //using trim() we remove whitespaces from the names and if the name is empty we thros an error
    showError(fname, "First name is required"); //we call showError function and pass the input and error message to it
    isValid = false; //we set isValid to false, so we know that there is an error in the form
  } else {
    showSuccess(fname); //if there is no errors, we call success function and remove error class from the parent
  }

  //same as it is for the first name
  if (lname.value.trim() === "") {
    showError(lname, "Last name is required");
    isValid = false;
  } else {
    showSuccess(lname);
  }

  //same as the above to, but in this case we also check if email is valid using isValidEmail function
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email"); //not valid? we use showError function to show error message
    isValid = false;
  } else {
    showSuccess(email); //valid? then we remove errors
  }

  //same as above, but here we check if password is at least 8 characters long
  if (password.value.trim() === "") {
    showError(password, "Password is required");
    isValid = false;
  } else if (password.value.trim().length < 8) {
    showError(password, "Password must be at least 8 characters long");
    isValid = false;
  } else {
    showSuccess(password);
  }

  //this part was a bit tricky, first we get all the checked checkboxes, then we check if there are at least 3 of them, if not we show error message and set isValid to false
  const checkedThree = document.querySelectorAll(
    '.technology input[type="checkbox"]:checked'
  );
  if (checkedThree.length < 3) {
    document.querySelector(".tech").classList.add("error"); //instead of using showError function, We just added error class to the parent element because since showError is for single inputs, we could not make it work for multiple inputs, so we manually added error class to the parent element of the checkboxes
    const errorMsg = document.querySelector(".tech small"); //then we get the small element in the parent div to display error message in it
    errorMsg.textContent = "Choose at least 3 services"; //we set the message
    isValid = false;
  } else {
    document.querySelector(".tech").classList.remove("error"); //if then at least 3 is chosen, manually remove error class from parent class
    document.querySelector(".tech small").textContent = ""; //and clear the message
  }

  return isValid; //we return isvalid in the end, and check if it is true or false, so we can use it in even listener
}

//we use this function to check if email is valid using regex for email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

//this is called when submit is clicked, we prevent the submitting and check if the form is filled out correctly
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = validateForm(); //we call validateForm function and store the result in isValid variable
  if (isValid) {
    //if isValid is true, we know that the form is filled out correctly and we can submit it, if it is false, we display errors and wait till everything is filled out correctly
    document.getElementById("container").style.display = "none"; //we hide the form
    document.getElementById("containerr").style.visibility = "visible"; //we show the next div, that vas hidden before using css
    document.getElementById("containerr").style.height = "100vh"; //and we set the height to 100vh, so it takes up the whole screen
  }
});
