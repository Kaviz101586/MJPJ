/*
Rutgers Full Stack coding Bootcamp Program Project
Description: This Javascript preferences.js is tied to preferences.html page and is responsible for
           1. Setting user preferences from Firebase
           2. Allowing existing users to use their pre-populated preferences pulled directly from the Firebase
           3. Passing the preferences through to the dashboard.html
           4. Addressing any login/registration errors utilizing Bootstrap 4 Alerts
Author : Mukti Pancholi, Jason Mapou, Prashanth Mijar, John Maquire
Date: 12-Jan-2019
*/


console.log("hello1");

// Initialize Firebase

var config = {
  apiKey: "AIzaSyC1c1GiOESAxQ8-aEPGYH8Bf2VdsBoTXWw",
  authDomain: "project1mjpj.firebaseapp.com",
  databaseURL: "https://project1mjpj.firebaseio.com",
  projectId: "project1mjpj",
  storageBucket: "project1mjpj.appspot.com",
  messagingSenderId: "755858814706"
};
firebase.initializeApp(config);

var database = firebase.database();
var uid;

firebase.auth().onAuthStateChanged(function (fbUser) {
  if (fbUser) {
    console.log("onAuthStateChange");
    var user = firebase.auth().currentUser;
    uid = user.uid;
    console.log("user = " + JSON.stringify(user));
    console.log("uid = " + uid);
  }
});

$(document).on("click", "#prefSubmit", prefSubmit);
$(document).on("click", "#prefExist", prefExist);

// Click handler for adding/editing new data//
//$("#prefExist").on("click", function (event) {
function prefExist() {
  event.preventDefault();
  console.log("hello2")

  window.open("dashboard.html", "_self")
}

//$("#prefSubmit").on("click", function (event) {}
function prefSubmit() {
  console.log("hello3")
  event.preventDefault();

  // Capture user inputs and store them into variables
  var newCalories = $('#caloriesInput').val().trim();
  var newCarbs = $('#carbsInput').val().trim();
  var newProtein = $('#proteinInput').val().trim();
  var newSugar = $('#sugarInput').val().trim();

  if ((newCalories && newCalories !== "0") && (newCarbs && newCarbs !== "0") && (newProtein && newProtein !== "0") && (newSugar && newSugar !== "0")) {
    // Clear the text boxes once pushed//

    $('#caloriesInput').val("");
    $('#carbsInput').val("");
    $('#proteinInput').val("");
    $('#sugarInput').val("");

    // Create local temporary object to hold the new data//

    var newData = {
      calories: newCalories,
      carbs: newCarbs,
      protein: newProtein,
      sugar: newSugar,
    };

    // Push to firebase//

    database.ref("users/" + uid).update(newData);
    console.log(newData);

    window.open("dashboard.html", "_self")
  } else {
    $("#errorText").text("Please fill out all fields - no zeroes allowed")
  }
}