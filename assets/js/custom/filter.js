$('.searchbar .dropdown-menu fieldset').each(function(){
	var fieldset = $(this),
		fieldCount = fieldset.find('.form-field').length;

		if (fieldCount > 3) {
			fieldset.find('.form-field:eq(2)').nextAll('.form-field').addClass('overflow');
            fieldset.addClass('has-overflow');

            $('.form-field-toggle').on('click', function(){
                fieldset.toggleClass('show-overflow');
            });
		}
});
