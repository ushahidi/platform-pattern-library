var formField = $('.form-field-adapt')

$('.form-field-adapt input[type="text"]').click(function() {
    formField.addClass('is-focused');
});

$('.form-field-adapt input[type="text"]').blur(function() {

    if ($('input[type="text"]').filter(function() { return $(this).val(); }).length > 0) {
        formField.addClass('is-focused');
    }  else {
        formField.removeClass('is-focused');
    }

});
