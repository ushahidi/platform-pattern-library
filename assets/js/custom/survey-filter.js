// Initialize each toggle pair
$('.survey-filter-checkbox').each(function(){
    var context = $(this),
        checkbox = $(context).find('.survey-filter-label input[type="checkbox"]');

    // Add 'init' class to the Mode Bar
    context.addClass('init');

    // If survey checkbox is already checked, add 'checked' class
    if (checkbox.is(':checked')) {
        context.addClass('checked');
    }

    // Add 'change' handler to checkbox
    checkbox.on('change', function(e){

        if (checkbox.is(':checked')) {
            context.addClass('checked');
        } else {
            context.removeClass('checked');
        }
    });
});

surveyFilterCheckboxes = function(context) {
    var nested = context.children('.form-fieldgroup');

    // If there are nested checkboxes,
    if (nested.length && context.hasClass('checked')) {
        nested.addClass('active');
    // Else, checkbox is parent and
    } else {
        nested.removeClass('active');
    }
}

$('.survey-filter-children .form-field').each(function(){
    surveyFilterCheckboxes($(this));
});

$('.survey-filter-children input[type="checkbox"]').on('change', function(){
    surveyFilterCheckboxes($(this).closest('.form-field'));
});
