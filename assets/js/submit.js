/* These variables are declared and
will later be used to store the
direct contact information of the
discount/deal submitter. */

var contactFirstName;
var contactLastName;
var contactPhone;
var contactEmail;

/* These variables are declared and
will later be used to store the
direct company information of the
entity offering the discount/deal. */

var entityName;
var entityLogo;
var entityIndustry;
var entityWebsite;
var entityDescription;
var entityOfferDetails;
var entityOfferCode;

/* These variables are declared to
conjure up and store a randomly generated
string used to uniquely identify the logo
image file uploaded by the submitter. This
helps to assure that any logo file uploaded
will not be overwritten by another submitter. */

var filename = "";
var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/* These variables are declared to shorten
code, primarily for convenience purposes
throughout the development stage. */

var database = firebase.database();	// Used to open a connection with the Firebase database system.
var storage = firebase.storage(); // Used to open a connection with the Firebase storage system.

	$("#contribute").on("click", function(){

		event.preventDefault();
		contactFirstName = $("#contact-first").val();
		contactLastName = $("#contact-last").val();
		contactPhone = $("#contact-phone").val();
		contactEmail = $("#contact-email").val();

		entityName = $("#entity-name").val();
		entityLogo = $("#entity-logo").prop("files")[0];
		entityIndustry = $("#entity-category").val();
		entityWebsite = $("#entity-website").val();
		entityDescription = $("#entity-description").val();
		entityOfferDetails = $("#entity-offer-description").val();
		entityOfferCode = $("#entity-offer-code").val();

		if (entityName.includes(".") || entityName.includes("#") || entityName.includes("$") ||
			entityName.includes("[") || entityName.includes("]")){
			$.notify("Your company name cannot contain the characters . # $ [ or ]. Sorry about that.");
			// Input check required because Firebase does not allow these characters to be in the name of a database child.
			// This will disallow the ability to use the characters . # $ [ or ] in the entity name field.
		} else {
			database.ref("offers").once("value", function(alreadyExists){
				if (alreadyExists.hasChild(entityName)){
					$.notify("Hmm, looks like that company already exists in the database."); 
					// Checks to see if a child named the value of entityName already exists.
					// Input check required to mitigate the possiblity of overwriting already existing data.
					// If the child for a given entity already exists, new data will not be written.
				} else {

					for (var i = 0; i < 51; i++){ // Responsible for generating the random file name for the logo image.
						filename += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
					};

					database.ref("offers").child(entityName).update({
					// All the values entered by the user will now be
					// pushed out to the Firebase database system.
						personal_contact: {
							first_name: contactFirstName,
							last_name: contactLastName,
							phone: contactPhone,
							email: contactEmail
						},
						company: entityName,
						description: entityDescription,
						industry: entityIndustry,
						website: "https://" + entityWebsite, 
						offer: {
							details: entityOfferDetails,
							code: entityOfferCode
						},
						status: "pending"
					});

					if (entityOfferCode == ""){
					// If the entityOfferCode is undefined, the string "N/A" will
					// become the value of the offer.code key in the Firebase database.
						database.ref("offers").child(entityName).update({
							offer: {
								details: entityOfferDetails,
								code: "N/A"
							}
						});
					};

					storage.ref("logos/" + filename).put(entityLogo).then(function(logo){
						var logoURL = logo.downloadURL;
						database.ref("offers").child(entityName).update({
							logo: logoURL
						});
					});

					$(".form-group").html(
						"<h2>" + "Thank you so much, " + contactFirstName + "!" + "</h2>" + "<br><br>" +
							"<p class='thank-you'>" +
							"Thanks for submitting your company's discount deal. One of our Canvs representatives will be in touch with you soon to confirm the details you've submitted." +
						"</p>");
				};
			});
		};
	});