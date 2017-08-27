var database = firebase.database();

$(document).ready(function(){
	database.ref("perks").on("child_added", function(snapshot){
		if (snapshot.val().approved === true){
			$("<div>").addClass("business-listing")
				.css("text-align", "center")
				.css("width", "32%")
				.css("margin", "0px 8px")
				.css("border", "2px solid #ababab")
				.css("border-radius", "5px")
				.css("padding", "16px")
			.append("<img style='width: 90px; height: auto;' src='" + snapshot.val().logoURL + "' alt='" + snapshot.val().corporation + "'>")
			.append("<h5>" + snapshot.val().corporation + "</h5>")
			.append("<p>" + snapshot.val().description + "</p>").appendTo(".discounts")
			.append("<a href='" + snapshot.val().website + "'><button class='btn btn-primary'>" + "Visit Website" + "</button></a>");
		};
	});
});