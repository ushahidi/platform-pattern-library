var formField = $('.form-field-adapt')

$('.form-field-adapt .adapt-field').focus(function() {
    $(this).parents(formField).addClass('is-focused');
});

$('.form-field-adapt .adapt-field').blur(function() {

    if ($('.adapt-field').filter(function() { return $(this).val(); }).length > 0) {
        $(this).parents(formField).addClass('is-focused');
    }  else {
        $(this).parents(formField).removeClass('is-focused');
    }
});
