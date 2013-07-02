$(document).ready(function() {
	$.ajax("/api/resumes", {
		complete : function(response){

			var resume=response.responseJSON[0];//gets the first resume
			console.log(resume.id);
			$('#name').attr('data-id', resume.id).html(resume.name_first + ' ' + resume.name_last);

			var first = resume.name_first;
			var last = resume.name_last;
			var fullName = first + " " + last;
			$('#name').html(fullName);

			console.log(resume);

			//contact info block
			var email = resume.contact_info.email;
			$('#email').html(email);

			var phone = resume.contact_info.phone;
			$('#phone').html(phone);

			var street = resume.contact_info.street_address.street;
			var city = resume.contact_info.street_address.city;
			var state = resume.contact_info.street_address.state;
			var zip = resume.contact_info.street_address.zip_code;
			var address = street + ", " + city + ", " + state + " " + zip;

			$('#address').html(address);

			//skills
			var categories = [];
			var tricks = [];
			var exppts = [];
			var type = [];

			for(i=0; i< resume.skill.length; i++)
			{
				categories[i] = resume.skill[i].category;
				tricks[i] = resume.skill[i].title;
				exppts[i] = resume.skill[i].experience;
				type [i] = "(level: " + exppts[i] + ") " + tricks[i];

				$('.skills').append('<dt>' +  categories[i] + '</dt>');
				$('.skills').append('<dd>' + type[i] + '</dd>');
			}

			//accomplishments
			var acDate = [];
			var acTitle = [];
			var acDes = [];
			var acHead = [];

			for(i=0; i< resume.accomplishments.length; i++)
			{
				acDate[i] = resume.accomplishments[i].month_year;
				acTitle[i] = resume.accomplishments[i].title;
				acDes[i] = resume.accomplishments[i].description;
				acHead[i] = acDate[i] + '   ' + acTitle[i];

				$('.accomplish').append('<dt>' + acHead[i] + '</dt>');
				$('.accomplish').append('<dd>' + acDes[i] + '</dd>');
			}
				console.log(resume.experience)

			//work history 'experience'
			var xp_start_month_year = [];
			var xp_end_month_year = [];
			var xp_role = [];
			var xp_project = [];
			var xp_org = [];
			var xp_location = [];
			var xp_duration = [];
			var xp_responsibilities = [];
			var xp_dt = [];
			var xp_dd = [];

			for(i=0; i< resume.experience.length; i++)
			{
				xp_start_month_year[i] = resume.experience[i].start_month_year;
				xp_end_month_year[i] = resume.experience[i].end_month_year;
				xp_role[i] = resume.experience[i].role;
				xp_project[i] = resume.experience[i].project;
				xp_org[i] = resume.experience[i].organization;
				xp_location[i] = resume.experience[i].location;
				xp_duration[i] = xp_start_month_year[i].slice(0,4) + '-' + xp_end_month_year[i].slice(0,4);
				
				$('.xp').append('<p class = xp_duration>' + xp_duration[i] + '</p>');
				$('.xp').append('<p class = xp_role>' + xp_role[i] + '</p>');
				$('.xp').append('<p class = xp_project>' + xp_project[i] + '</p>');
				$('.xp').append('<p class = xp_org>' + xp_org[i] + '</p>');
				$('.xp').append('<p class = xp_location>' + xp_location[i] + '</p>');
				
				$.each(resume.experience[i].responsibilities, function(index, item) {
					xp_responsibilities[i] = item;
					$('.xp').append('<p class = span1>' + xp_responsibilities[i] + '</p>');
				});
			}

			//edu history
			var edu_start_month_year = [];
			var edu_end_month_year = [];
			var edu_degree = [];
			var edu_major = [];
			var edu_minor = [];
			var edu_org = [];
			var edu_CityState = [];
			var edu_gpa = [];
			var edu_duration= [];
			var edu_city = [];
			var edu_st = [];

			for(i=0; i< resume.schools.length; i++)
			{
				edu_start_month_year = resume.schools[i].start_month_year;
				edu_end_month_year = resume.schools[i].end_month_year;
				edu_degree = resume.schools[i].degree;
				edu_major = resume.schools[i].major;
				edu_minor = resume.schools[i].minor;
				edu_org = resume.schools[i].name;
				edu_CityState = '(' + edu_city[i] + ', ' + edu_st[i] +')';
				edu_gpa = resume.schools[i].gpa;
				edu_duration[i] = edu_start_month_year[i].slice(0,4) + '-' + edu_end_month_year[i].slice(0,4);

				$('.work').append('<li>' + edu_duration[i] + '</li>');
				$('li:last').addClass('edu_duration');
				$('.work').append('<li>' + edu_degree + '</li>');
				$('li:last').addClass('edu_degree');
				$('.work').append('<li>' + edu_major + '</li>');
				$('li:last').addClass('edu_major');
				$('.work').append('<li>' + edu_minor + '</li>');
				$('li:last').addClass('edu_minor');
				$('.work').append('<li>' + edu_org + '</li>');
				$('li:last').addClass('edu_org');
				$('.work').append('<li>' + edu_CityState + '</li>');
				$('li:last').addClass('edu_CityState');
				$('.work').append('<li>' + edu_gpa + '</li>');
				$('li:last').addClass('edu_gpa');
			}
		}//end of complete
	}); //end of ajax to fetch resume info

	//when delete button clicked, the function below will activate
	$('.delete').click(function() {
		var id = $('#name').data('id');
		console.log(id);// log the id
		//send ajax to delete the resume
		$.ajax({
			url: '/api/resumes/' + id,
			type: 'DELETE',
			complete: function(res){console.log('It gone')}
		});
	//window.location = window.location;//this will refresh the browser
});
});//end of document

