var entityName;
var entityPhone;
var entityEmail;
var entityLogo;
var entityDescription;
var entityCoupon;
var entityWebsite;

var filename = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

for (var i = 0; i < 5; i++){
	filename += possible.charAt(Math.floor(Math.random() * possible.length));
};

var database = firebase.database();
var storage = firebase.storage().ref("logos/" + filename);

if (localStorage.getItem("Company Name") != null){
	$(".form").addClass("hide");
	$(".success").removeClass("hide");
};

$("#contribute").on("click", function(){
	event.preventDefault();

	entityName = $("#entity-name").val();
	entityPhone = $("#entity-phone").val();
	entityCategory = $("#entity-category").val();
	entityLogo = $("#entity-logo").prop("files")[0];
	entityDescription = $("#entity-description").val();
	entityCoupon = $("#entity-coupon").val();
	entityWebsite = $("#entity-website").val();

	localStorage.setItem("Company Name", entityName);

	database.ref("perks").child(entityName.trim()).set({
		corporation: entityName,
		contact: {
				phone: entityPhone,
			},
		category: entityCategory,
		description: entityDescription,
		coupon: entityCoupon,
		approved: false,
		hidden: false,
		website: entityWebsite
	});

	storage.put(entityLogo).then(function(logo){
		console.log(logo);
		var logoURL = logo.downloadURL;
		database.ref("perks").child(entityName.trim()).update({
			logo: logoURL
		});
	});

	$(".form").addClass("hide");
	$(".success").removeClass("hide");

});