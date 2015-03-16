$('.hidden-content-trigger').click(function() {
	$(this).toggleClass('open');
    $(this).parents().siblings('.hidden-content').toggleClass('visible');
});
