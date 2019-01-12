// Initialize Firebase//
console.log("hello"); 

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
        var user = firebase.auth().currentUser;
        uid=user.uid;
    }});
    
  
  // Click handler for adding/editing new data//

  $("#prefSubmit").on("click", function(event) {
    event.preventDefault();
    console.log("hello")

  // Capture user inputs and store them into variables
  var newCalories = $('#caloriesInput').val().trim();
  var newCarbs = $('#carbsInput').val().trim();
  var newProtein = $('#proteinInput').val().trim();
  var newSugar = $('#sugarInput').val().trim();

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

database.ref("users/"+uid).update(newData);
console.log(newData);

window.open("Dashboard.html","_self")

 })