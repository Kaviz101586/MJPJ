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