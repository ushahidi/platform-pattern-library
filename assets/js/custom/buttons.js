$('.toggle-js').click(function() {
	$(this).toggleClass('open');
    $(this).parent().children('.toggle-content').toggleClass('open');
});

$('.toggle-content ul li a').click(function() {
    $(this).closest('.toggle-content').removeClass('visible');
    $(this).parents('ul, li, .toggle-content').siblings('.toggle-js').removeClass('visible');
});
