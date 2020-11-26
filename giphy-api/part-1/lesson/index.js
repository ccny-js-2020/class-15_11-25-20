//key in order to gain access to the api
var apiKey = "dc6zaTOxFJmzC";
//api input search term
var giphySearchTerm = "coding";
//making the search term url friendly
var giphySearchTermForUrl = giphySearchTerm.split(" ").join("+");
//number of results went from the api response
var numberOfResults = "10";
//api url with inputs from above
var giphyApiUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphySearchTermForUrl + "&api_key=" + apiKey + "&limit=" + numberOfResults;

console.log(giphyApiUrl)

//setting up our api call
$.ajax({
	type: 'GET',
	//using the giphy url from above
	url: giphyApiUrl,
	error: function(err){
		//if the api key is empty, it will throw a forbidden error
		//meaning you dont have access to the api
		if(err.status == 403){
			alert("Please make sure you have entered a valid api key")
		}
	},
	success: function(response){
		//logging the responses from the api call
		console.log(response);
		console.log(response.data);
		console.log(response.data[0].images.fixed_height.url);

		//appending the images from the api call based on the search term and number of results to the dom
		var imagesDiv = $("<div>");
		for(var i = 0; i < response.data.length; i++){
			img = $('<img>');
			img.attr('src', response.data[i].images.fixed_height.url);
			imagesDiv.append(img);
		}
		$('#giphy-content').append(imagesDiv);
	}
});
