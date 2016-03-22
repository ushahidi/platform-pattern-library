/*
// Toggle arrow icon and open filter container
$('.filter-button-js').click(function() {
	$(this).toggleClass('open');

    if ( $('.tabs-menu-list').hasClass('visible') ) {
        $('.tabs-menu-button-js').toggleClass('open');
        $('.tabs-menu-list').toggleClass('visible');
    }

    $(this).parent().siblings('.filters-container').toggleClass('visible');
});

$('.filters-container a').click(function(e) {
    e.preventDefault();
});
*/

$('#filters fieldset').each(function(){
	var fieldset = $(this),
		fieldCount = fieldset.find('.form-field').length;

		if (fieldCount > 3) {
			fieldset.find('.form-field:eq(2)').nextAll().addClass('overflow');

			fieldset.append('<span class="toggle"><i class="fa  fa-caret-square-o-down"></i></span>').on('click', function(){
				fieldset.toggleClass('show-overflow');
			});
		}
});

$('.toggle').click(function(e){
    $(this).children('i').toggleClass('fa-caret-square-o-down fa-caret-square-o-up')
    $(this).siblings('.form-field-wrapper').toggleClass('expand');
});
