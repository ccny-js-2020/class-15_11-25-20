var apiKey = "";
var giphySearchTermForUrl = "slayer";
var numberOfResults = "10";
var giphyApiUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphySearchTermForUrl + "&api_key=" + apiKey + "&limit=" + numberOfResults;

$.ajax({
	type: 'GET',
	url: giphyApiUrl,
	error: function(err){
		if(err.status == 403){
			showToast("Please make sure you have entered a valid api key")
		}
	},
	success: function(response){
		console.log(response)

		if(response.data.length > 0){

			var responseData = response.data;

			for(var i = 0; i < responseData.length; i++){
				var stillImageUrl = responseData[i].images.fixed_height_still.url
				var movingImageUrl = responseData[i].images.fixed_height.url

				var movingImage = $('<img>');
				movingImage.addClass("images");
				movingImage.attr('src', movingImageUrl);
				movingImage.data("moving-image", movingImageUrl);
				movingImage.data("still-image", stillImageUrl);
				movingImage.data("current", "moving");
				$(".giphy-content").append(movingImage);
			}

		} else {
			alert("No Response from Search")
		}

	}
});

$(document).on('click', '.images', function(){
	var currentImage = $(this).data("current");

	if(currentImage == "moving"){
		$(this).data("current", "still");
		$(this).attr("src", $(this).data("still-image"));
	} else {
		$(this).data("current", "moving");
		$(this).attr("src", $(this).data("moving-image"));
	}
});
