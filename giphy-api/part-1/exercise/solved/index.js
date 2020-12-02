//appending initial content
var header = $('<h1>');
header.text('Enter text in the input and have it display Gifs based on your search')
header.addClass('jumbotron');

$(".page-content").append(header);

var input = $('<input>', {
	type: 'text',
	id: 'giphy-input',
	placeholder: 'Search Gifs'
})
$(".page-content").append(input)
$(".page-content").append('<br>')
var button = $('<button>',{
	id: 'giphy-button',
	class: 'btn btn-danger',
	text: 'Find Giphy Match'
});
$(".page-content").append(button);

//setting up an api call to the giphy api
$(document).on('click', '#giphy-button', function(){
	//getting the input value when the button is clicked
	//and inserting that value into the giphy api url
	var giphySearchTerm = $('#giphy-input').val()

	if(giphySearchTerm !== ""){
		//key in order to gain access to the api
		var apiKey = "";
		//making the search term url friendly
		var giphySearchTermForUrl = giphySearchTerm.split(" ").join("+");
		//number of results went from the api response
		var numberOfResults = "10";
		//api url with inputs from above
		var giphyApiUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphySearchTermForUrl + "&api_key=" + apiKey + "&limit=" + numberOfResults;

		$('#giphy-input').val("");
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
				$("#search-term-text-modal").text(giphySearchTerm);

				$(".images-div").remove();

				var imagesDiv = $('<div>');
				imagesDiv.addClass('images-div');

				var giphyImage;
				for(var i = 0; i < response.data.length; i++){
					giphyImage = $('<img>');
					giphyImage.attr('src', response.data[i].images.fixed_height.url);
					imagesDiv.append(giphyImage);
				}
				$("#giphy-content").append(imagesDiv);
				$("#giphy-modal").modal();

			}
		});
	} else {
		//if no value in the input when the button is clicked
		//show an error
		showToast("Please enter Search Term")
	};
});

function showToast(message){
	$("#error-message").text(message);
	$("#error-toast").toast("show");
}
