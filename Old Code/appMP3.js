var Brand_Name_City_State_Website;

$(document).ready(function () {

    // Need to add any Firebase stuff
    /*var config = {
        apiKey: 
        authDomain: 
        databaseURL: 
        projectId: 
        storageBucket: 
        messagingSenderId: 
    };
    firebase.initializeApp(config);
    var database = firebase.database();*/

    // hard coded response from api. This will get replaced by Prashant's function.
    var response = [{ food: "pizza", restaurant: "Dominos", location: "East Windsor", website: "www.dominos.com" },
    { food: "burger", restaurant: "Smash Burger", location: "Monroe", website: "www.smash.com" },
    { food: "noodles", restaurant: "Lins", location: "Freehold", website: "www.lins.com" }];

    // data that will come from Firebase but hard-coding for now.
    var firebase_calories = 100;
    var firebase_carbs = 20;
    var firebase_protein = 10;
    var firebase_sugar = 2;

    displayPreferences(firebase_calories, firebase_carbs, firebase_protein, firebase_sugar);

    // Code Execution begins here 

var userSearchQuery = 'salad';
const limit = 50;
const distance = '10mi';

var lat;
var long;

var city;
var state;

getLocation();
// PM code ends here

    function displayPreferences(calories, carbs, protein, sugar) {
        $("#Calories").text(calories);
        $("#Carbs").text(carbs);
        $("#Protein").text(protein);
        $("#Sugar").text(sugar);
    }

    function addToTable(Brand_Name_City_State_Website) {
        // clear table first
        $("#results-table tbody tr").remove()

        
        for (i = 0; i < Brand_Name_City_State_Website.length; i++) {
            // Below creates the new row
            var newRow = $("<tr>").append(
                $("<td>").text(Brand_Name_City_State_Website[i].food),
                $("<td>").text(Brand_Name_City_State_Website[i].restaurant),
                $("<td>").text(Brand_Name_City_State_Website[i].location),
                $("<td>").text(Brand_Name_City_State_Website[i].website)
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
        var address = $("#address-input").val().trim();
        var city = $("#city-input").val().trim();
        var state = $("#state-input").val().trim();
        var zipcode = $("#zip-code-input").val().trim();
        var food = $("#food-input").val().trim()

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
        if ( zipcode == "" && 
            (address == "" || city == "" || state == "") ) {
                alert("Enter zipcode or valid address");
        }

        // if all entries valid, then call Prashant' function to search

        // once function returns, need to update table with response
        addToTable(Brand_Name_City_State_Website);
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
            Brand_Name_City_State_Website = response.locations.map(function (locations) { 
                return {
                    food: userSearchQuery,
                    brand: locations.brand_id,
                    restaurant: locations.name,
                    location: locations.city,
                    website: locations.website
                }
            })
            //console.log("RESPONSE: " + JSON.stringify(response));
            console.log('Brand_Name_City_State_Website ' + JSON.stringify(Brand_Name_City_State_Website));

            // Need to do next AJAX call for search/instant/
            var siURL = 'https://trackapi.nutritionix.com/v2/search/instant';


            return $.ajax({
                url: siURL,
                headers: {
                    'x-app-id': appID,
                    'x-app-key': appKey
                },
                method: 'GET',
                contentType: 'application/json',
                data: {
                    query: userSearchQuery,
                    branded: true,
                    self: false,
                    common: false,
                    detailed: true,
                    brand_ids: JSON.stringify(brand_ids)
                }
            })
        })
       .then(function (response) {
            console.log("SI RESPONSE: " + JSON.stringify(response));

            
        });
    };


    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getPosition);
        } else {
         // Ask the user to enter the address

            var geocoder = new google.maps.Geocoder();
            var address = "new york"; // Take this information from the user entry screen

            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat;
                    long = results[0].geometry.location.long;
                    access_nutritionix_api(userSearchQuery, lat, long, distance, limit);
                } 
            });
        }
    }

        function getPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Your Latitude :: "+lat);
        console.log("Your Longitude :: "+long);     
        access_nutritionix_api(userSearchQuery, lat, long, distance, limit);
        }


   

}) // end document ready