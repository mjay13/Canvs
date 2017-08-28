var categories = ["Housing", "Finances", "Communication",
				  "Marketing", "Web", "Legal", "Internet",
				  "Other"];
				  
var database = firebase.database();

$(document).ready(function(){
	database.ref("perks").on("child_added", function(snapshot){
		if (snapshot.val().approved === true){
			$(".discounts")
			.append("<div class='card' style='width: 20rem; margin-bottom: 10px;'>" +
						"<img class='card-img-top' src='" + snapshot.val().logo + "'>" +
						"<div class='card-body'>" +
							"<h4 class='card-title'>" + snapshot.val().corporation + "</h4>" +
							"<p class='card-text'>" + snapshot.val().description + 
							"<br><br><a href='" + snapshot.val().website + "'><button class='btn btn-danger'>Visit Website</button></a>" +
							"</p>" +
						"</div>" +
					"</div>");
		};
	});
});