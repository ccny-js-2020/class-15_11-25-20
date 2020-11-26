//key in order to gain access to the api
var apiKey = "";
//making the search term url friendly
var giphySearchTermForUrl = "metallica";
//number of results went from the api response
var numberOfResults = "1";
//api url with inputs from above
var giphyApiUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphySearchTermForUrl + "&api_key=" + apiKey + "&limit=" + numberOfResults;

$.ajax({
	type: 'GET',
	url: giphyApiUrl,
	error: function(err){
		//if no api key input in the url
		//show an error
		if(err.status == 403){
			showToast("Please make sure you have entered a valid api key")
		}
	},
	success: function(response){
		console.log(response)

		//if there is a valid result from the api call
		if(response.data.length > 0){
			//we can get both the gif and the still image from the giphy response
			var stillImageUrl = response.data[0].images.fixed_height_still.url
			var movingImageUrl = response.data[0].images.fixed_height.url

			var imageTitle = response.data[0].title

			//Dont need to loop here because we're only appending images from one object in the array
			//appending the images to separate divs
			//check out the elements in your google inspect after this
			var movingImageDiv = $('<div>');
			movingImageDiv.addClass('image-div');
			movingImageDiv.data("title", imageTitle + " moving");
			var movingImage = $('<img>');
			movingImage.attr('src', movingImageUrl);
			movingImageDiv.append(movingImage);
			$(".giphy-content").append(movingImageDiv);

			var stillImageDiv = $('<div>');
			stillImageDiv.addClass('image-div');
			stillImageDiv.data("title", imageTitle + " still");
			var stillImage = $('<img>');
			stillImage.attr('src', stillImageUrl);
			stillImageDiv.append(stillImage);
			$(".giphy-content").append(stillImageDiv);
		} else {
			alert("No Response from Search")
		}

	}
});

//when one of the images created through jquery is hovered over
$(document).on("mouseover", '.image-div', function(){
	//remove the prevous p image appended to the div
	$(".image-title-p").remove();

	//getting the image title via the "title" data attribute
	//this was stored in the image when created, look above
	var imageTitle = $(this).data("title");

	//adding a class to the image child of the '.image-div'
	$(this).children("img").addClass("lower-opacity");

	//creating a p tag for either the moving or still image
	//dependent on the position of the p tag in accordance with its image
	var imageTitleP = $("<p>");
	if(imageTitle.indexOf("still") > -1){
		imageTitleP.addClass("image-title-p image-title-p-still");
		imageTitleP.text(imageTitle);
	} else {
		imageTitleP.addClass("image-title-p image-title-p-moving");
		imageTitleP.text(imageTitle);
	}

	//appending the p tag to the hovered over images
	$(this).append(imageTitleP);
});

//when the mouse leaves the image
$(document).on("mouseleave", '.image-div', function(){
	//higher the opacity of the image
	$(this).children("img").removeClass("lower-opacity");
	//remove the divs p tag
	$(this).children("p").remove();
});
