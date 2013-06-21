$(document).ready(function() {
	console.log('im alive');
	$.ajax("/api/resumes/51c20830a3672af4b3000001", {
		complete : function(response){
			var first = response.responseJSON.name_first;
			var last = response.responseJSON.name_last;
			var fullName = first + " " + last;
			$('#name').html(fullName);

			var email = response.responseJSON.contact_info.email;
			$('#email').html(email);

			console.log(email);

			var phone = response.responseJSON.contact_info.phone;
			$('#phone').html(phone);

			console.log(phone);


			var street = response.responseJSON.contact_info.street_address.street;
			var city = response.responseJSON.contact_info.street_address.city;
			var state = response.responseJSON.contact_info.street_address.state;
			var zip = response.responseJSON.contact_info.street_address.zip_code;
			var address = street + ", " + city + ", " + state + " " + zip;

			$('#address').html(address);

			console.log(response.responseJSON);

			var categories = new Array;
			var tricks = new Array;
			var exppts = new Array;
			var type = new Array;


			for(i=0; i< response.responseJSON.skill.length; i++)
			{

				categories[i] = response.responseJSON.skill[i].category;
				tricks[i] = response.responseJSON.skill[i].title;
				exppts[i] = response.responseJSON.skill[i].experience;
				type [i] = categories[i] + " (level: " + exppts[i] +") ";


			}
			console.log("categories: " + categories);
			console.log("tricks: " + tricks);
			console.log("experience points: " + exppts);
			
			$('#tricks1').html(tricks[0]);
			$('#tricks2').html(tricks[1]);
			$('#tricks3').html(tricks[2]);
			$('#tricks4').html(tricks[3]);
			$('#tricks5').html(tricks[4]);

			$('#type1').html(type[0]);
			$('#type2').html(type[0]);
			$('#type3').html(type[0]);
			$('#type4').html(type[0]);
			$('#type5').html(type[0]);

			for(i=0; i< response.responseJSON.accomplishments.length; i++)
			{

				accmpdate[i] = response.responseJSON.accomplishments[i].month_year;
				accmpdes[i] = response.responseJSON.accomplishments[i].description;
				accmptitle[i] = response.responseJSON.accomplishments[i].accmptitle;
				accomplishments[i] = accomptitle[i] + ": " + accmpdate[i];


			}
			console.log("accomplishment dates: " + accmpdate);
			console.log("title: " + accmptitle);
			console.log("description: " + accmpdes);
			
			/*$('#tricks1').html(tricks[0]);
			$('#tricks2').html(tricks[1]);
			$('#tricks3').html(tricks[2]);
			$('#tricks4').html(tricks[3]);
			$('#tricks5').html(tricks[4]);

			$('#type1').html(type[0]);
			$('#type2').html(type[0]);
			$('#type3').html(type[0]);
			$('#type4').html(type[0]);
			$('#type5').html(type[0]);*/


		}
	});
});
/*
$(document).ready(function() {
     console.log('im alive');
     $.ajax("/api/resumes/51c20830a3672af4b3000001", {
          complete : function(response){
               console.log(response.responseJSON);


          }
     });
});
*/

/*
 $(document).ready(function() {
     console.log('im alive');
     $.ajax("/api/resumes", {
          complete : function(response){
               console.log(response.responseJSON);


          }
     });
});
*/


