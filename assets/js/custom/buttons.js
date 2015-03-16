$('.toggle-js').click(function() {
	$(this).toggleClass('open');
    $(this).parent().siblings('.toggle-content').toggleClass('visible');
	$(this).parent().find('.toggle-content').toggleClass('visible');
});

$('.toggle-content-secondary ul li a').click(function() {
    $(this).closest('.toggle-content').removeClass('visible');
    $(this).parents('ul, li, .toggle-content').siblings('.toggle-js').removeClass('open');
});
