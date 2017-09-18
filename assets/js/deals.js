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
			$("<a>").attr("id", categories[i]).attr("href", "#")
			.addClass("list-group-item list-group-item-action")
			.text(categories[i]).appendTo(".category-filtration");
		};

		database.ref("offers").on("child_added", function(list){
			if (list.val().status === "active"){
				console.log(list.val().company);
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
			$("#info").modal('show');
		});
	});