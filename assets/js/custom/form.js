// "Adapt" fields
$('.form-field-adapt').each(function(){
    var field = $(this),
        control = $(this).find('input, textarea');

    // Initialize and check status for the field on page load
    field.addClass('init');
    statusUpdate();

    // Update the field's status when it's put into or out of focus
    control.on('focus blur', function(){
        statusUpdate();
    });

    function statusUpdate() {
        if (control.is(':focus')) {
            field.addClass('focus');
        } else if (control.val()) {
            field.addClass('value').removeClass('focus');
        } else {
            field.removeClass('focus value');
        }
    }

    // Automatically adjust the height of the textarea based on user's input
    autosize($(this).find('textarea'));
});

// Toggle visibility of fields in long fieldsets and forms
$('.form-field-toggle').each(function(){
	var fieldgroup = $(this).closest('fieldset, .form-fieldgroup'),
		fieldCount = fieldgroup.find('.form-field').length;

		if (fieldCount > 2) {
			fieldgroup.find('.form-field:eq(1)').nextAll('.form-field').addClass('overflow');
            fieldgroup.addClass('has-overflow');

            $(this).on('click', function(){
                fieldgroup.toggleClass('show-overflow');
            });
		}
});

$('input[type="date"]').pickadate({
    format: 'mmmm d, yyyy',
    today: 'Choose today'
});
