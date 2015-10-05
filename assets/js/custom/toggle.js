$(document).on('click', '.toggle-content-trigger', function() {
 	$(this).toggleClass('open'); // Toggle button to open state
    $(this).parent().siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
 	$(this).siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
});
