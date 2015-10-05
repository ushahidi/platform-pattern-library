$(document).on('click', '.toggle-content-trigger', function(e) {
 	$(this).toggleClass('open'); // Toggle button to open state
    $(this).parent().siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
 	$(this).siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
    e.preventDefault();
});

$('.toggle-content-trigger[data-toggle]').each(function(){
    $(this).parent().siblings('.toggle-content').addClass($(this).attr('data-toggle'));
});