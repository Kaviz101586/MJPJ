var Brand_Name_City_State_Website; // the object that holds the AJAX response from the instant search that filters the products based on user location
var si_Response; // the object that holds the AJAX response from the instant search that filters the products based on user preference value

var results;


$(document).ready(function () {

    // Need to add any Firebase stuff
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

    // data that will come from Firebase but hard-coding for now.
    var firebase_calories;
    var firebase_carbs;
    var firebase_protein;
    var firebase_sugar;

    var uid;

    firebase.auth().onAuthStateChanged(function (fbUser) {
        if (fbUser) {  
            var user = firebase.auth().currentUser;
            uid=user.uid;
            console.log(uid);    
            
            database.ref("users/"+uid).once("value", function(userSnap){
                var snap=userSnap.val();
                $("#Calories").text(snap.calories);
                $("#Carbs").text(snap.carbs);
                $("#Protein").text(snap.protein);
                $("#Sugars").text(snap.sugar);
    });
        }});

        displayPreferences(firebase_calories, firebase_carbs, firebase_protein, firebase_sugar)

   // data that will come from Firebase but hard-coding for now.
 /*   var firebase_calories = 500;  // attr_id = 208
    var firebase_carbs = 400; // attr_id = 205
    var firebase_protein = 10; // attr_id = 203
    var firebase_sugar = 13; // attr_id = 269 




    displayPreferences(firebase_calories, firebase_carbs, firebase_protein, firebase_sugar); */

    // Code Execution begins here 
    var ocdkey = "&key=e39eaae9080247218a11a430ebd3a003&limit=1&pretty=1";
    var ocdbase = "https://api.opencagedata.com/geocode/v1/json?q=";
    var userSearchQuery = 'app';
    const limit = 50;
    const distance = '10mi';

    var lat;
    var long;

    var city;
    var state;

    // need to run this code only after user puts in their search query, address etc.  So need to move
    // the function call to submit button click handler
    //getLocation();
    // PM code ends here


    function displayPreferences(calories, carbs, protein, sugar) {
        $("#Calories").text(calories);
        $("#Carbs").text(carbs);
        $("#Protein").text(protein);
        $("#Sugar").text(sugar);
    }



    function addToTable(arr) {
        // clear table first
        $("#results-table tbody tr").remove()


        for (i = 0; i < arr.length; i++) {
            // Below creates the new row
            var distan = (Brand_Name_City_State_Website[i].distance / 1.609)
            var dist = distan.toFixed(2)
            var newRow = $("<tr>").append(
                $("<td>").text(arr[i].food),
                $("<td>").text(arr[i].restaurant),
                $("<td>").text(arr[i].location),
                $("<td>").text(dist+"mi"),
                $("<td>").text(arr[i].website)
            );

            // Below appends the new row to the table
            $("#results-table > tbody").append(newRow);
        }
    }

    //  searching
    $("#search-btn").on("click", function (event) {
        console.log("search-btn click");
        event.preventDefault();

        // Grabing user input and triming
        var useMyLocation = $("#currentLocation").is(":checked");
        var address = $("#address-input").val().trim();
        var city = $("#city-input").val().trim();
        var state = $("#state-input").val().trim();
        var zipcode = $("#zip-code-input").val().trim();
        var food = $("#food-input").val().trim()

        console.log("useMyLocation = " + useMyLocation);
        console.log("address = " + address);
        console.log("city    = " + city);
        console.log("state   = " + state);
        console.log("zipcode = " + zipcode);
        console.log("food    = " + food);
        // need to verify all entries to make sure valid or at least user entered data
        // checking that user entered food
        if (food == "") {
            alert("Enter valid Food");
        }
        // checking if both zip and address are blank
        if (useMyLocation == false && zipcode == "" &&
            (address == "" || city == "" || state == "")) {
            alert("Enter zipcode or valid address or check Use My Location");
        }
        else if (useMyLocation == true && zipcode != "" && (address != "" || city != "" || state != "")) {
            alert("Please only enter Use My Location or zipcode or address");
        }
        else if (useMyLocation == true && (address != "" || city != "" || state != "")) {
            alert("Please only enter Use My Location or address");
        }
        else if (useMyLocation == true && zipcode != "") {
            alert("Please only enter Use My Location or zipcode");
        }
        else if (zipcode != "" && (address != "" || city != "" || state != "")) {
            alert("Please only enter zipcode or address");
        }

        // if all entries valid, then call Prashanth' function to search
        newSearchCall(food, useMyLocation, address, city, state, zipcode);

        // once function returns, need to update table with response
        addToTable(results);
    });

    function access_nutritionix_api(userSearchQuery, lat, long, distance, limit) {
        var appID = '88905904';
        var appKey = '61e818ca55274f66563f3835e3fe414e';
        var locationURL = 'https://trackapi.nutritionix.com/v2/locations?ll='

        locationURL = locationURL + lat + ',' + long + '&distance=' + distance + '&limit=' + limit;

        console.log("URL = " + locationURL);

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: locationURL,
            headers: {
                'x-app-id': appID,
                'x-app-key': appKey
            },
            method: 'GET',
            contentType: 'application/json'
        }).then(function (response) {
            // javascript map method - goes through all locations from response and creates new array
            var brand_ids = response.locations.map(function (locations) { return locations.brand_id });
            console.log(response.locations);
            // returns the JSON object needed in PART A section above for Prashanth's code
            Brand_Name_City_State_Website = response.locations.map(function (locations) { 
                return {
                    food: userSearchQuery,
                    brand: locations.brand_id,
                    restaurant: locations.name,
                    location: locations.city,
                    website: locations.website,
                    distance: locations.distance_km,
                }
            })
            //console.log("RESPONSE: " + JSON.stringify(response));
            console.log('Brand_Name_City_State_Website ' + JSON.stringify(Brand_Name_City_State_Website));

            // Need to do next AJAX call for search/instant/
            var siURL = 'https://trackapi.nutritionix.com/v2/search/instant';


            return  $.ajax({
                url: siURL,
                headers: {
                    'x-app-id': appID,
                    'x-app-key': appKey,
                    'contentType': 'application/json'
                },
                method: 'POST',
                data: {
                    "query": "app",
                    "common": false,
                    "self": false,
                    "branded": true,
                    "brand_ids": brand_ids,
                    "detailed": true,
                    "full_nutrients": {
                      "203": {
                        "lte": firebase_protein
                      },
                      "269": {
                        "lte": firebase_sugar
                      },
                      "205": {
                        "lte": firebase_carbs
                      },
                      "208": {
                        "lte": firebase_calories
                      }
                    }
                  }
            })
        })
       .then(function (response) {
            //console.log("SI RESPONSE: " + JSON.stringify(response));   
            //This returns the response JSON object as below after filtering the preference values of the user
            si_Response = response.branded.map(function (branded) { 
                return {
                    food: branded.food_name,
                    brand: branded.nix_brand_id,
                    restaurant: branded.brand_name,
                    full_nutrient: branded.full_nutrients
                }
            })
            console.log(response.branded);
            console.log("SI RESPONSE JSON :: " + JSON.stringify(si_Response));  
            results = consolidateArray();
        });
    };

    function newSearchCall(food, useMyLocation, address, city, state, zipcode) {
        userSearchQuery = food;
        if (useMyLocation == true) {
            navigator.geolocation.getCurrentPosition(getPosition);
        }
        else {
            // call John's geocoding 
            var ocdURL = ocdbase +","+ address +","+ city +","+ state +","+ zipcode + ocdkey
            openGate(ocdURL);
        }
    }

    function getPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Your Latitude :: " + lat);
        console.log("Your Longitude :: " + long);
        access_nutritionix_api(userSearchQuery, lat, long, distance, limit);
    }

    function openGate(x) {
        $.ajax({
            url: x,
            method: "GET"
            })
            .then(function(response) {
                lat = (response.results[0].geometry.lat)
                long = (response.results[0].geometry.lng)
                console.log("Your Latitude :: " + lat);
                console.log("Your Longitude :: " + long);
            access_nutritionix_api(userSearchQuery, lat, long, distance, limit);                 
            })  
    }

    // this function looks into 2 array of json objects and return only the records common to both based on brand
    function consolidateArray(){

            var arrayList = [];
            var results;
  
            for (var i in si_Response) {
                
                var item = Brand_Name_City_State_Website.find(item => item.brand === si_Response[i].brand);

                results = {
                    brand: si_Response[i].brand,
                    food: si_Response[i].food,
                    restaurant: si_Response[i].restaurant,
                    full_nutrient: si_Response[i].full_nutrient,
                    location: item.location,
                    website: item.website
                }
                console.log('Results :: '+results);


  /*
                var obj = {
                      food: si_Response[i].food
                    }
                


            for (var j in Brand_Name_City_State_Website) {
                if (Brand_Name_City_State_Website[j].brand === si_Response[i].brand) {
                    obj.brand = Brand_Name_City_State_Website[j].brand; 
                    obj.restaurant = Brand_Name_City_State_Website[j].restaurant;
                    obj.location = Brand_Name_City_State_Website[j].location;
                    obj.website = Brand_Name_City_State_Website[j].website;
                }
            }

            */
            arrayList.push(results);
          }
        console.log(arrayList);   
        return arrayList;
    }

}) // end document ready