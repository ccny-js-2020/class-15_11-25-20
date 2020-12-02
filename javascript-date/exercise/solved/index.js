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
				if(err.status == 401){
					$("#error-message").text("Unauthorized");
					$("#error-toast").toast("show")
				}
				if(err.status == 404){
					$("#error-message").text("City Not Found");
					$("#error-toast").toast("show")
				}
			},
			success: function(response){
				//this will originally show as an error in the console. Make this have no error.
				console.log(response);
				$('#city-input').val("");

				var sunriseTime = new Date(response.sys.sunrise * 1000).toString();
				var sunsetTime = new Date(response.sys.sunset * 1000).toString();

				console.log(sunriseTime)
				console.log(sunsetTime)
				$("#sunrise").text("Sunrise: " + sunriseTime.substring(17, 24) + " EST");
				$("#sunset").text("Sunset: " + sunsetTime.substring(17, 24) + " EST");

			}
		});
	}

});
