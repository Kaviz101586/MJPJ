
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
            var Brand_Name_City_State_Website = response.locations.map(function (locations) { 
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
     /*   .then(function (response) {
            console.log("SI RESPONSE: " + JSON.stringify(response));
        });*/
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

// Code Execution begins here 
var userSearchQuery = 'pizza';
const limit = 50;
const distance = '10mi';

var lat;
var long;

var city;
var state;

getLocation();



