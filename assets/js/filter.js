var database = firebase.database();
var category;

$(document).on("click", "#category", function(){
	event.preventDefault();
	category = $(this).attr("category");
	console.log(category);
});