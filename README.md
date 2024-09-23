EV shops track:
Devised a website for monitoring electric vehicle parts availability based on distance from current location 
Data is fetched from database (using Express) and sent over to the main server for processing the results
shop-track-backend, has express js code to send data between database and angular server, essentially connecting database server to main server.

1. Setup angular and add src files to angular src folder
2. Shops displayed based on distance from user location. There are 2 funtions, 1 calculates using Haversine formula, and another uses Bing map api, to get distance between shop and user location.
3. The api can be configured to take into account time or other extra points(eg: tolls) instead of distance if required. Api key is required to run that function.
4. The sqlite also must be setup
5. Location is requested from user for this application to work as intended
