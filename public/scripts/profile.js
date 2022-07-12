$(document).ready(function() {
	$('#first_name_input').hide();
	$('#last_name_input').hide();
	$('#phone-number_input').hide();

	$('#edit-first_name').on('click', function() {
		$('#first_name_input').toggle();
	});

	$('#edit-last_name').on('click', function() {
		$('#last_name_input').toggle();
	});

	$('#edit-phone_number').on('click', function() {
		$('#phone-number_input').toggle();
	});

	$('button.update-first_name').click(function(event) {
		event.preventDefault();

		let inputName = $('form').find("input[name='firstName']").val();

		if (!inputName) {
			$error.text('This field cannot be empty');
		} else if (inputName.length >= 25) {
			$error.text('Maximum number of characters reached.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else if (inputName.indexOf(' ') !== -1) {
			$error.text('Remove spaces.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else {
			$.ajax({
				type: 'PUT',
				url: '/user',
				data: {
					firstName: inputName
				}
			});
			$('#first_name').load(window.location.href + ' #first_name');
			$('#first_name_input').hide();
			$("input[name='firstName']").val('');
		}
	});

	$('button.update-last_name').click(function(event) {
		event.preventDefault();

		let inputLastName = $('form').find("input[name='lastName']").val();

		if (!inputLastName) {
			$error.text('This field cannot be empty');
		} else if (inputLastName.length >= 25) {
			$error.text('Maximum number of characters reached.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else if (inputLastName.indexOf(' ') !== -1) {
			$error.text('Remove spaces.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else {
			$.ajax({
				type: 'PUT',
				url: '/user',
				data: {
					lastName: inputLastName
				}
			});
			$('#last_name').load(window.location.href + ' #last_name');
			$('#last_name_input').hide();
			$("input[name='lastName']").val('');
		}
	});

	$('button.update-phone_number').click(function(event) {
		event.preventDefault();

		let inputPhoneNumber = $('form').find("input[name='phoneNumber']").val();

		if (!inputPhoneNumber) {
			$error.text('This field cannot be empty');
		} else if (inputPhoneNumber.length >= 25) {
			$error.text('Maximum number of characters reached.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else if (inputPhoneNumber.indexOf(' ') !== -1) {
			$error.text('Remove spaces.');
			$('#error-message-name').slideDown().addClass('show_error_msg');
		} else {
			$.ajax({
				type: 'PUT',
				url: '/user',
				data: {
					phoneNumber: inputPhoneNumber
				}
			});
			$('#phone-number').load(window.location.href + ' #phone-number');
			$('#phone-number_input').hide();
			$("input[name='phoneNumber']").val('');
		}
	});
});
