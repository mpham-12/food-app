$(document).ready(function () {
  $('#first_name_input').hide()
  $('#edit-name').on('click', function() {
    $('#first_name_input').toggle()
    });

  $("button.update-name").click(function (event) {
    event.preventDefault();

    let inputName = $('form').find("input[name='firstName']").val();

    if (!inputName) {
      $error.text("This field cannot be empty");
      $("#error-message-name").slideDown().addClass('show_error_msg');
    } else if (inputName.length >= 25) {
      $error.text("Maximum number of characters reached.");
      $("#error-message-name").slideDown().addClass('show_error_msg');
    } else if (inputName.indexOf(" ") !== -1) {
      $error.text("Remove spaces.");
      $("#error-message-name").slideDown().addClass('show_error_msg');
    } else {

      $.ajax({
        type: "PUT",
        url: "/user",
        data: {
          firstName: inputName
        },
        success: (data) => { console.log("Retrieved new name!", data) }


      })
    }
  })
})