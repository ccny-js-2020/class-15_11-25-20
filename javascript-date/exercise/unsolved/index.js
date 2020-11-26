/*
	Using the open weather map api:
		- using an (input and button) or a form, search for the weather of an input city
		- find the sunrise and sunset values, which will be timestamps
		- Using javascript date, convert that timestamp value to a date ... https://stackoverflow.com/questions/19485353/function-to-convert-timestamp-to-human-date-in-javascript
		- You can show the date in GMT
		- Append the sunrise and sunset dates to the dom
*/

//key create to gain access to weather map api
var apiKey = '';
//url required for get response
var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial&q=';

//when the weather button is clicked, set up the weather api call and the logic
$('#weather-button').on('click', function(){
	var cityInputValue = $('#city-input').val()
	if(cityInputValue == ""){
		$("#error-message").text("Please enter City");
		$("#error-toast").toast("show")
	} else {
		var urlCityInputValue = cityInputValue.toLowerCase().split(" ").join("+");
		console.log(urlCityInputValue)

		var totalUrl = weatherApiUrl + urlCityInputValue;
		console.log(weatherApiUrl)
		$.ajax({
			type: 'GET',
			url: totalUrl,
			error: function (err) {
				if(err.status == 404){
					$("#error-message").text("City Not Found");
					$("#error-toast").toast("show")
				}
			},
			success: function(response){
				//this will originally show as an error in the console. Make this have no error.
				console.log(response);
				$('#city-input').val("");

				var sunriseTime = new Date(response.sys.sunrise * 1000).toGMTString();
				var sunsetTime = new Date(response.sys.sunset * 1000).toGMTString();

				$("#sunrise").text("Sunrise: " + sunriseTime.substring(17, 29));
				$("#sunset").text("Sunset: " + sunsetTime.substring(17, 29));

			}
		});
	}

});
