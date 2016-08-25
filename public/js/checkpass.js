function validate() {
  isValid = (document.newUserCredentials.passphrase1.value == document.newUserCredentials.passphrase2.value) && document.newUserCredentials.passphrase1.value.length > 4;
  // Add any additional validation here
  document.newUserCredentials.submitbtn.disabled = !isValid;
}

function checkPassConfirmation() {
  //Store the password field objects into variables ...
  var passphrase1 = document.getElementById('passphrase1');
  var passphrase2 = document.getElementById('passphrase2');
  //Store the Confimation Message Object ...
  var message = document.getElementById('confirmMessage');
  //Set the colors we will be using ...
  var goodColor = "#66cc66";
  var doesntMatchColor = "#ff6666";
  //Compare the values in the password field
  //and the confirmation field
  if (passphrase1.value == passphrase2.value) {
    //The passwords match.
    //Set the color to the good color and inform
    //the user that they have entered the correct password
    passphrase2.style.backgroundColor = goodColor;
    message.style.color = goodColor;
    message.innerHTML = "Passwords Match!"
  } else {
    //The passwords do not match.
    //Set the color to the bad color and
    //notify the user.
    passphrase2.style.backgroundColor = doesntMatchColor;
    message.style.color = doesntMatchColor;
    message.innerHTML = "Passwords Do Not Match!"

  }
}
