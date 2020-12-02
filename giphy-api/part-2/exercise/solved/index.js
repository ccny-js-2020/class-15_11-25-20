var searchTerm = "puppies";
var numberOfResults = "10";
var apiKey = "";

var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=" + numberOfResults;

$.ajax({
	type: "GET",
	url: giphyUrl,
	success: function(res){
		for(var i = 0; i < res.data.length; i++){
			var giphyImage = $("<img>");
			giphyImage.attr("src", res.data[i].images.fixed_height.url);
			$("#giphy-images").append(giphyImage)
		}
	}
});

$(document).on('click', 'img', function(){
	$(this).remove();
});
