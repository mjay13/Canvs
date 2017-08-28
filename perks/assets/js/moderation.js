var database = firebase.database();
var key;
var decision;

	$(".perks-data").html("");
	database.ref("perks").on("child_added", function(moderate){
		console.log(moderate.val());
		if (moderate.val().approved === false){
			$("<div>").addClass("row listing").appendTo(".perks-data")
			$("<div>").addClass("col-md-4 identity").css("text-align", "center").appendTo(".listing")
			.html("<img style='width: 120px; height: auto;' src='" + moderate.val().logoURL + "'>" + "<br>" + "<h4>" + moderate.val().corporation + "</h4>")
			.append("<a href='" + moderate.val().website + "'><button class='btn btn-primary'>" + "Visit Website" + "</button></a>")
			.append("<br><br><button class='btn btn-primary' id='approve'>" + "YES" + "</button>")
			.append("   <button class='btn btn-danger' id='decline'>" + "NO" + "</button>");

			$("<div>").addClass("col-md-8 description").appendTo(".listing")

			$(".description")
			.append("<p>" + moderate.val().description + "</p>")
			.append("<h4>" + "Contact Details" + "</h4>")
			.append("<p>" + "P: " + moderate.val().contact.phone + "<br>" + "E: " + moderate.val().contact.email);
		};

		$("#approve").on("click", function(){

		});
	});