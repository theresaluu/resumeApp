$(document).ready(function() {

	//adds additional skills block
	$('.skills_block_add').click(function() {
		var html = $('.skills_block').first().clone();
		html.css('display' , 'none');
		html.find('input').val('');
		$(this).before(html);
		html.slideDown(600);
		return false;
	});

	//adds additional accomplishment block
	$('.accomplishments_block_add').click(function() {
		var html = $('.accompl_block').first().clone();
		html.css('display' , 'none');
		html.find('input').val('');
		$(this).before(html);
		html.slideDown(600);
		return false;
	});

	//adds additional work block
	$('work_block_add').click(function() {
		var html = $('.work_block').first().clone();
		html.css('display' , 'none');
		html.find('input').val('');
		$(this).before(html);
		html.slideDown(600);
		return false;
	})

	//adds additional eduction block
	$('.education_block_add').click(function() {
		var html = $('.education_block').first().clone();
		html.css('display' , 'none');
		html.find('input').val('');
		$(this).before(html);
		html.slideDown(600);
		return false;
	});

	$('#userDataForm').submit(function() {
		var userData = {}; //new obj

		//matching keys to data in html
		var fullName = $('#fullname').val();
		console.log(fullName);
		var name_array = fullName.split(', ');
		console.log(name_array);
		userData.name_first = name_array[name_array.length - 1];
		userData.name_last = name_array[0];

		userData.phone = $('.mobile').val();
		userData.formattedPhone = '(' + userData.phone.slice(0, 3) + ') ' + userData.phone.slice(3, 6) + '-' + userData.phone.slice(6, 10);
		userData.addy = $('#addy').val();
		userData.city = $('#city').val();
		userData.st = $('#state').val();
		userData.email = $('#e_address').val();

		//skills
		userData.skills = [];
		
		var skills_blocks = $('.skills_block');
		skills_blocks.each(function(index, item) {
			userData.skills.push({
				skill : $(item).find('.type').val(),
				expertise : $(item).find('.level').val(),
				skillDes : $(item).find('.description').val()
			});
		});

		//accomplishments
		userData.accomplishments = [];

		var accompl_blocks = $('.accompl_block');
		accompl_blocks.each(function(index, item) {

			userData.accomplishments.push({
				date : $(item).find('.ac_date').val(),
				accomplishment : $(item).find('.ac_type').val(),
				accomplDes : $(item).find('.accomplDes').val()
			});
		});

		//work history
		userData.experience = [];

		var work_blocks = $('.work_block');
		work_blocks.each(function(index, item) {

			userData.experience.push({
				startWork : $(item).find('.startWork').val(),
				endWork : $(item).find('.endWork').val(),
				employer : $(item).find('.employer').val(),
				workCity : $(item).find('.workCity').val(),
				workState : $(item).find('.workState').val(),
				workDes : $(item).find('.workDes').val()
			});
		});




		//education
		userData.schools = [];

		var education_blocks = $('.education_block');
		education_blocks.each(function(index, item) {
			var startDate = $(item).find('.startDate').val();
			console.log($(item).find('.startDate'));
			var formattedDate = startDate.slice(5, 7) + startDate.slice(2, 4);
			console.log(startDate);
			userData.schools.push({
				name : $(item).find('.name').val(),
				degree : $(item).find('.degree').val(),
				start_month_year : formattedDate
			});
		});

		console.log(userData);
		return false; 
	});

function db_pathGet(id) {

}
JSON_data = JSON.stringify({'resume':userData});//var postData equals this.
console.log(JSON_data);

id="";

msg = "Saved Data: ";
type = "POST";
if( id ){
	msg = "Data Updated: ";
	type = "PUT";
}

path = db_pathGet(id );
$.ajax({
	type: type,//'POST'
	url: path,//'api/resumes'
	data: JSON_data//postData
}).done(function() {//done is a jquery call back
	alert(msg + first + " " + last);
});
});
