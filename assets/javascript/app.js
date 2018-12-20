
      $("#find-restaurant").on("click", function(event) {

        event.preventDefault();

        var queryURL = "https://trackapi.nutritionix.com/v2/locations?ll=38.89814,-77.029446&distance=50mi&limit=10";


        $.ajax({
          url: queryURL,
          headers: {
            'x-app-id':'f60a4070',
            'x-app-key':'ccfdb9db76fa612f78059d77d877a0ad',
            'Content-Type':'application/json'
          },
          method: "GET"
        }).then(function(response) {
          console.log('Success :: '+ response);
        });

        // -----------------------------------------------------------------------

      });

