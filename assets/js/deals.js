	var blogURL = "https://canvs.org/wp-json/wp/v2/posts";
	var categories = ["Aerospace", "Agriculture", "Chemical",
					  "Computer + Programming/Design", "Construction",
					  "Defense", "Education", "Entertainment",
					  "Energy + Electrical", "Finance + Insurance",
					  "Food + Dining", "Healthcare", "Information + Data",
					  "Legal", "Manufacturing", "Media + Publication",
					  "Telecommunication", "Transportation", "Other"];
	var database = firebase.database();
	var companyCount = 0;

	$(document).ready(function(){
		$.ajax({ // Responsible for rendering the latest article from Canvs.org
			url: blogURL,
			method: "GET"
		}).done(function(r){
			for (var i = 0; i < 1; i++){
				$("<div>").addClass("article").appendTo(".news")
				$("<a>").html("<h5>" + r[i].title.rendered + "</h5>").appendTo(".article")
				.attr("href", r[i].link).attr("target", "_blank");
				$("<span>").addClass("article-meta").html(r[i].excerpt.rendered)
				.appendTo(".article");
				$("#loading").css("display", "none");
			};
		});

		for (var i = 0; i < categories.length; i++){ // Responsible for generating the category filtration list.
			$("<a>").attr("category", categories[i]).attr("id", "category").attr("href", "#")
			.addClass("list-group-item list-group-item-action")
			.text(categories[i]).appendTo(".category-filtration");
		};

		database.ref("offers").on("child_added", function(list){
			if (list.val().status === "active"){
				companyCount++;
				$("<div>").addClass("company card").attr("company", list.val().company).attr("id", companyCount)
				.attr("industry", list.val().industry).appendTo(".card-columns");
				$("<div>").addClass("card-body").appendTo("#" + companyCount)
				.html("<img src='" + list.val().logo + "'>" +
					  "<h4 class='card-title'>" + list.val().company + "</h4>" +
					  "<p>" + list.val().description + "</p>");
				$("<button>").attr("id", "interest").attr("company", list.val().company).attr("type", "button")
				.addClass("btn btn-danger interest").text("I'm Interested").css("margin", "0 auto").appendTo("#" + companyCount);
			};
		});
	});

	$(document).on("click", "#interest", function(){
		database.ref("offers").child($(this).attr("company")).on("value", function(information){
			$(".modal-title").text(information.val().company);
			$(".contact").html("<img src='" + information.val().logo + "'><br>" +
							   "<h4>" + information.val().company + "</h4>" +
							   "<p>" + information.val().industry + "</p><br>" +
							   "<h5>" + information.val().personal_contact.first_name + " " + information.val().personal_contact.last_name + "</h5>" +
							   "<a href='mailto:" + information.val().personal_contact.email + "'>Get in Touch</a>");
			$(".offer").html("<h4>Company Description</h4>" +
				 			 "<p>" + information.val().description + "</p>" +
				 			 "<h4>Company Offer</h4>" +
				 			 "<p>" + information.val().offer.details + "<br><br></p>" +
				 			 "<p>DISCOUNT CODE:   " + "<span class='code'>" + information.val().offer.code + "</span></p>");
			$(".modal-footer").html("<a href='" + information.val().website + "' target='_blank'><button class='btn btn-primary'>Visit Website</button></a>" +
									"<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>")
			$("#companyModal").modal("show");
		});
		
	});
	
	$(document).on("click", ".submit-btn", function(){
		$("#submitModal").modal("show");	
	});