# EV shops track
Checkout privacy-policy-terms before proceeding.

Devised a website for monitoring electric vehicle parts availability based on distance from current location with 1 function (POWERED BY BING MAPS API)
Data is fetched from database (using Express) and sent over to the main server for processing the results
shop-track-backend, has express js code to send data between database and angular server, essentially connecting database server to main server.
Utilized JSON mock data and conducted user testing sessions to enhance functionality and improve the user interface based on feedback

1. Setup angular and add src files to angular src folder
2. Shops displayed based on distance from user location. There are 2 funtions, 1 calculates using Haversine formula, and another uses Bing map api, to get distance between shop and user location.
3. The api can be configured to take into account time or other extra points(eg: tolls) instead of distance if required. Api key is required to run that function.
4. The sqlite also must be setup, and also by running init db file
5. Location is requested from user for this application to work as intended
6. Also shops given are just for testing and are not real shops with real values. It's just a simulation to test the application with random latitude and longitude values.
7. Note: Bing Maps API and its usage is subject to Microsoft's copyright and other policies. This is a personal project(non-commercial). Check out: https://www.microsoft.com/en-us/maps/bing-maps/product . Follow these policies along with the data storage/ retention policies.
8. Made use of some images placed in public/assets/images folder 
