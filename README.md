
__# MJPJ__\

__Rutgers Full Stack coding Bootcamp Program Project__\
Description: _Happy Healthy Tummies!_ __|__ A quick food finder, for the health conscious.\

_Sign in_, or _start a new account_, the enter the limits you would like to keep for the categories listed.\
Use you devices location, or a location you set for a quick search of local restaurant menu items that fall under your set guidline! \

Authors : __Mukti Pancholi__, __Jason Mapou__, __Prashanth Mijar__, __John Maquire__\
Date: 12-Jan-2019\

_Powered by:_\
[__Nutritionix!__](https://www.nutritionix.com/business/api)\

_Data Handleing by:_\
[__Google FireBase__](https://firebase.google.com/)\

_Geocoding by:_\
[__OpenStreetMaps__](https://www.openstreetmap.org/)\

_Maps Made by:_\
[__Mapquest!__](https://www.mapquest.com/)\
=======
# MJPJ
January 3rd, 2019 sent over appMP.js which showed the nested fucntion for the API.
January 5th, uploading to repo the Dashboard.html, appMP2.js (which has comments in green specifing where Prashant can add his code in and firebase needs to be added to it.), restaurants_icons.png, preferences.html (it's blank), login.html (it's blank).
Dashboard.html file is a good solid foundation to the over all look of the our project.  I am still working on the aesthetics.  I will tweek some colors and fonts and the Preferences to allign the nutriional numbers correctly.  If anyone knows how to do this please advise.
As of now I have just named this Dashboard "Nutritional Personalized". This can be changed later.

January 8, 2019 : I created a checkbox so user the indicate they want to use their current location. I commented out the get location call because don’t want it popping on start. Instead made a similar call when the user clicks a submit button. I also changed the hard coded query parameter from “app” to the var userSearchQuery.  Also added more error checks when user enters address, current location, or zip code.

Upcoming issues we will have to deal with are:  Currently, the table “Results” on the dashboard is displayed food name, restaurant, location and website.  The instant search only gives food and restaurants… we will need to figure out how to get location and website information from the location search.  Maybe some sort of mapping of the two in javascript.

