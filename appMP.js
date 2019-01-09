// document ready
$(document).ready(function () {

    // Pass in lat long from another api call that uses zip code to get lat long
    // https://www.zipcodeapi.com/API
    //
    // pass in food query parameter
    // 
    function access_nutritionix_api(lat, long, userSearchQuery) {
        var appID = '88905904';
        var appKey = '61e818ca55274f66563f3835e3fe414e';
        var limit = 50;
        var distance = '50mi';

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
            console.log("BRAND IDs = " + brand_ids);
            //console.log("RESPONSE: " + JSON.stringify(response));

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

    var userSearchQuery = 'salad';
    var lat = 40.319498;
    var long = -74.428933;
    access_nutritionix_api(lat, long, userSearchQuery);

}) // end of document ready
