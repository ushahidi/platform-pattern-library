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
