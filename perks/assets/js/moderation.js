var keys = [];
var database = firebase.database();
var corp;
var key;

	// $(".perks-data").html("");
	database.ref("perks").on("child_added", function(moderate){
		if (moderate.val().approved === false){
			$(".perks")
			.append("<tr class='" + moderate.val().corporation + "'><td class='identity'>" + "<img src='" + moderate.val().logo + "'>" +
					"</td><td class='corporation'>" + moderate.val().corporation +
					"</td><td class='phone'>" + moderate.val().contact.phone +
					"</td><td class='description'>" + moderate.val().description + 
					"</td><td class='coupon'>" + moderate.val().coupon +
					"</td><td class='website'>" + "<a href='" + moderate.val().website + "'><button class='btn btn-primary'>Visit Website</button></a>" +
					"</td><td class='decision'>" + "<i class='fa fa-check-circle' company='" + moderate.val().corporation + "' id='approve'></i><br><i class='fa fa-times-circle' id='decline'></i>" +
					"</td></tr>");

			$(".decision").css("text-align", "center");
		};

		$("#approve").on("click", function(){
			database.ref("perks").child($(this).attr("company")).update({
				approved: true
			});
			location.reload();
		});

		$("#decline").on("click", function(){
			database.ref("perks").child($(this).attr("company")).update({
				hidden: true
			});
			location.reload();
		});

	});