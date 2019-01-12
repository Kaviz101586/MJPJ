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


    function displayPreferences(calories, carbs, protein, sugar) {
        $("#Calories").text(calories);
        $("#Carbs").text(carbs);
        $("#Protein").text(protein);
        $("#Sugar").text(sugar);
    }

    function addToTable(response) {
        // clear table first
        $("#results-table tbody tr").remove()

        
        for (i = 0; i < response.length; i++) {
            // Below creates the new row
            var newRow = $("<tr>").append(
                $("<td>").text(response[i].food),
                $("<td>").text(response[i].restaurant),
                $("<td>").text(response[i].location),
                $("<td>").text(response[i].website)
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
        addToTable(response);
    });

   

}) // end document ready