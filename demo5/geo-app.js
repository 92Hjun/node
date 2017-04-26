var nodeGeocoder = require('node-geocoder');
var ForecastIO = require('forecastio');

var option = {
   provider:'google',
   httpAdapter:'https',
   apikey:'AIzaSyAUlw1fE1Ai5MNkEJ6WztjGary6l7O6dVw',   // google api key
   formatter:null
};

var geocoder = nodeGeocoder(option);
var weather = new ForecastIO('a5de91ee7d3c293cd7b58cedeeed9f0a');

var address = '장암동';
geocoder.geocode(address, function(err, data) {
   if (err) {            // 에러발생
	  console.log(err);
      return;
   }

   if (!data.length) {      // 주소에 해당하는 위도경도 정보가 존재하지 않음
      return;
   }

   var lat = data[0].latitude;
   var lon = data[0].longitude;

   weather.forecast(lat,lon, function(err, weatherData){
   		if (err){
   			console.log(err);
   			return;
   		}
   		console.log(weatherData);
   });
   
});