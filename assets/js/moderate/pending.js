var database = firebase.database();
	database.ref("offers").on("child_added", function(moderate){
		if (moderate.val().status === "pending"){
			// If the "status" key is valued at "pending" in the Firebase database system,
			// the submission will be appended to the "pending" class on the document.
			// All information submitted is shown to the content managers during the approval process.
			$("<div>").addClass("row company" + " " + moderate.val().company).appendTo(".pending")
			.append("<div class='col-md-4 entity-information'>" +
						"<img src='" + moderate.val().logo + "'><br><br>" +
						"<h2>" + moderate.val().company + "</h2>" +
						"<p>" + moderate.val().industry + "</p>" +
						"<a href='" + moderate.val().website + "'>Visit Website</a><br><br>" +
						"<h5>" + moderate.val().personal_contact.first_name + " " + moderate.val().personal_contact.last_name + "</h5>" +
						"<p>P: " + moderate.val().personal_contact.phone + "<br>E: " + moderate.val().personal_contact.email + "</p>" +
						"<button class='btn btn-primary' id='approve' company='" + moderate.val().company + "'>Approve</button> <button class='btn btn-danger' id='decline' company='" + moderate.val().company + "'>Decline</button>" +
					"</div>")
			.append("<div class='col-md-8 offer-information'>" +
						"<h5>" + "Company Description" + "</h5>" +
						"<p>" + moderate.val().description + "</p><br>" +
						"<h5>" + "Company Offer" + "</h5>" +
						"<p>" + moderate.val().offer.details + "</p><br>" +
						"<p>" + "DISCOUNT CODE: " + "<span class='code'>" + moderate.val().offer.code + "</span>" +
					"</div>")
			.attr("company", moderate.val().company);
		};
	});

	$(document).on("click", "#approve", function(){
		database.ref("offers").child($(this).attr("company")).update({
			status: "active"
		});
		location.reload();
	});

	$(document).on("click", "#decline", function(){
		database.ref("offers").child($(this).attr("company")).remove();
		location.reload();
	});