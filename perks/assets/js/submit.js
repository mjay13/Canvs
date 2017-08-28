var entityName;
var entityLogo;
var entityDescription;
var entityCoupon;

var database = firebase.database();

if (localStorage.getItem("Company Name") != null){
	$(".form").addClass("hide");
	$(".success").removeClass("hide");
};

$("#contribute").on("click", function(){
	event.preventDefault();

	entityName = $("#entity-name").val();
	entityPhone = $("#entity-phone").val();
	entityEmail = $("#entity-email").val();
	entityLogo = $("#entity-logo").val();
	entityDescription = $("#entity-description").val();
	entityCoupon = $("#entity-coupon").val();
	entityWebsite = $("#entity-website").val();

	localStorage.setItem("Company Name", entityName);

	database.ref("perks").push({
		corporation: entityName,
		contact: {
			phone: entityPhone,
			email: entityEmail
		},
		logoURL: entityLogo,
		description: entityDescription,
		coupon: entityCoupon,
		approved: false,
		website: entityWebsite
	});

	$(".form").addClass("hide");
	$(".success").removeClass("hide");

});