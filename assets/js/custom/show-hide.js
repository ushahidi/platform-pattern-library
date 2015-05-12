$('.hidden-content-trigger').click(function() {
	$(this).toggleClass('open');
    $(this).parents().siblings('.hidden-content').toggleClass('visible');
	$(this).parents().siblings('form').children('.hidden-content').toggleClass('visible');

	var findSiblings = $(this).parent().parent().siblings('li');

	findSiblings.find('.hidden-content-trigger').removeClass('open');
	findSiblings.find('.hidden-content').removeClass('visible');
});
