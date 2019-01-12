
var instantSearch_Brands = [];
var LocationSearch_Brands = [];
var intersect_Brands = [];

nutritionAPI_InstantSearch("pizza");
nutritionAPI_LocationSearch("38.89814,-77.029446", "50", "10");

intersect_Brands = intersectBrands(instantSearch_Brands,LocationSearch_Brands);



function nutritionAPI_InstantSearch(query){

    //Standard parameters for Instant Search

    var parameters = "&branded=true&common=false&self=false";
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?query="+query+parameters;

    $.ajax({
      url: queryURL,
      headers: {
        'x-app-id':'f60a4070',
        'x-app-key':'ccfdb9db76fa612f78059d77d877a0ad',
        'Content-Type':'application/json'
      },
      method: "GET"
    }).then(function(response) {
      instantSearch_Brands = parseResponse(response, "branded", "nix_brand_id")
    });
}

function nutritionAPI_LocationSearch(latlong, distance, searchLimit){

    //Standard parameters for Location Search

    var parameters = "&distance="+distance+"mi&limit="+searchLimit;
    var queryURL = "https://trackapi.nutritionix.com/v2/locations?ll="+latlong+parameters;

    $.ajax({
      url: queryURL,
      headers: {
        'x-app-id':'f60a4070',
        'x-app-key':'ccfdb9db76fa612f78059d77d877a0ad',
        'Content-Type':'application/json'
      },
      method: "GET"
    }).then(function(response) {
      LocationSearch_Brands = parseResponse(response, "locations", "brand_id")
    });
}


function parseResponse(responseAPI, key1, key2){

  var brand_ids = []; 

    for (var i = 0; i < responseAPI[key1].length; i++){
        brand_ids[i] =  responseAPI[key1][i][key2];
    }
    
    //Only unique values in array would be returned
    return [...new Set(brand_ids)];
}

function intersectBrands(a, b){
    return a.filter(x => b.has(x));
}


