$(document).ready(function() {
	$.ajax("/api/resumes/51c20830a3672af4b3000001", {

		complete : function(response){
			var first = response.responseJSON.name_first;
			var last = response.responseJSON.name_last;
			var fullName = first + " " + last;
			$('#name').html(fullName);

			//contact info block
			var email = response.responseJSON.contact_info.email;
			$('#email').html(email);

			var phone = response.responseJSON.contact_info.phone;
			$('#phone').html(phone);

			console.log(response.responseJSON);

			var street = response.responseJSON.contact_info.street_address.street;
			var city = response.responseJSON.contact_info.street_address.city;
			var state = response.responseJSON.contact_info.street_address.state;
			var zip = response.responseJSON.contact_info.street_address.zip_code;
			var address = street + ", " + city + ", " + state + " " + zip;

			$('#address').html(address);

			//skills
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

				$('dl').append('<dt>' + categories[i] + '</dt>');
				$('dl').append('<dd>' + tricks[i] + '</dd>');
				$('dl').append('<p>' + exppts[i] + '</p>');
			}

			//accomplishments
			var acDate = new Array;
			var acTitle = new Array;
			var acDes = new Array;


			for(i=0; i< response.responseJSON.accomplishments.length; i++)
			{
				acDate[i] = response.responseJSON.accomplishments[i].month_year;
				acTitle[i] = response.responseJSON.accomplishments[i].title;
				acDes[i] = response.responseJSON.accomplishments[i].description;

				$('#accomplish').append('<dl>' + acDate[i] + '</dl>');
				$('#accomplish').append('<dl>' + acTitle[i] + '</dl>');
				$('#accomplish').append('<p>' + acDes[i] + '</p>');
			}


			//work history 'experience'
			var xp_start_month_year = new Array;
			var xp_end_month_year = new Array;
			var xp_role = new Array;
			var xp_project = new Array;
			var xp_org = new Array;
			var xp_location = new Array;
			var xp_duration = new Array;
			var xp_responsibilities = [];

			for(i=0; i< response.responseJSON.experience.length; i++)
			{
				xp_start_month_year[i] = response.responseJSON.experience[i].start_month_year;
				xp_end_month_year[i] = response.responseJSON.experience[i].end_month_year;
				xp_role[i] = response.responseJSON.experience[i].role;
				xp_project[i] = response.responseJSON.experience[i].project;
				xp_org[i] = response.responseJSON.experience[i].organization;
				xp_location[i] = response.responseJSON.experience[i].location;
				xp_duration[i] = xp_start_month_year[i] + '-' + xp_end_month_year[i];
				
				$.each(response.responseJSON.experience[i].responsibilities, function(index, item) {
					$('.id').append('<p>' + index + '</p>');
				});

				$('.xp').append('<li>' + xp_duration[i] + '</li>');
				$('.xp').append('<li>' + xp_role[i] + '</li>');
				$('.xp').append('<li>' + xp_org[i] + '</li>');
				$('.xp').append('<li>' + xp_location[i] + '</li>');
				$('.xp').append('<li>' + xp_responsibilities[i] + '</li>');
				$('.xp').append('<li>' + xp_org[i] + '</li>');

			}
			console.log(response.responseJSON.experience);
		}//end of complete
	}); //end of ajax
});//end of document





			/*

			var skills=[];

			$('.list').each(function(index, item) {
				var element = $(item);

				var category = element.find('dt').html();//find funciton can find ids/classes too
				var level = element.find('p').html();
				var descr = element.find('dd').html();

				skills.push(category);
				skills.push(level);
				skills.push(descr);

			});
*/

			//creating html for each occurance example
			/*var favoriteDrinks = [];

			$('.skill').each(function(index, item) {
				var element = $(item);
				var text = element.find('p').html();//find funciton can find ids/classes too
				favoriteDrinks.push(text);

			});

			//accomplishments
			var accmpdates = new Array;
			var accmpdess = new Array;
			var accmptitles = new Array;
			var accmplishments = new Array;

			for(i=0; i< response.responseJSON.accomplishments.length; i++)
			{
				accmpdates[i] = response.responseJSON.accomplishments[i].month_year;
				accmpdess[i] = response.responseJSON.accomplishments[i].description;
				accmptitles[i] = response.responseJSON.accomplishments[i].title;
				accmplishments[i] = accmpdates[i] + " " + accmptitles[i] + ": " + accmpdess[i];
			}

			//console.log("accomplishment dates: " + accmpdates);
			//console.log("title: " + accmptitles);
			//console.log("description: " + accmpdess);
			//console.log("accomplistments: " + accmplishments)
	
			//$('#tricks1').html(tricks[0]);
			//$('#tricks2').html(tricks[1]);
			//$('#tricks3').html(tricks[2]);
			//$('#tricks4').html(tricks[3]);
			//$('#tricks5').html(tricks[4]);

			//$('#type1').html(type[0]);
			//$('#type2').html(type[0]);
			//$('#type3').html(type[0]);
			//$('#type4').html(type[0]);
			//$('#type5').html(type[0]);

			//education

			var begin = new Array;
			var end = new Array;
			var degrees = new Array;
			var major = new Array;
			var minor = new Array;
			var gpa = new Array;
			var name = new Array;
			var duration = new Array;

			for(i=0; i< response.responseJSON.schools.length; i++)
			{
				begin[i] = response.responseJSON.schools[i].end_month_year;
				end[i] = response.responseJSON.schools[i].start_month_year;
				gpa[i] = response.responseJSON.schools[i].gpa;
				major[i] = response.responseJSON.schools[i].degree;major;
				minor[i] = response.responseJSON.schools[i].minor;
				name[i] = response.responseJSON.schools[i].name;
				
				duration[i] = begin[i] + " - " + end[i];
			}

			console.log(response.responseJSON);
			
/*

		}
	});
});




 $(document).ready(function() {
     console.log('im alive');
     $.ajax("/api/resumes", {
          complete : function(response){
               console.log(response.responseJSON);


          }
     });
});
*/

/*
$(document).ready(function() {


//Capturing info notes from forms. 
/*$(document).ready(function() {
     console.log('im alive');
     $.ajax("/api/resumes/51c20830a3672af4b3000001", {
          complete : function(response){
               console.log(response.responseJSON);


          }
     });
});

$('#userDataForm').submit{function() {
	var userData = {};
	var userData.fullName = $('#name').val();
	var name_array = fullName.split(' ');

	userData.name_first = name_array[0];
	userData.name_last = name_array[name_array.length - 1];
	userData.schools = [];

	var education_blocks = $('.education_block');
	education_blocks.each(function(index, item) {
		var startDate = $(item).find('.startDate').val();
		var formattedDate = startDate.slice(5, 7) + startDate.slice(2, 4);
		console.log(startDate);
		userData.schools.push({
			name : $(item).find('.name').val().
			degree : $(item).find('.degree').val()
			start_month_year: formattedDate
		});
	});
	console.log(userData);
	return false; 
}
	
}*/

