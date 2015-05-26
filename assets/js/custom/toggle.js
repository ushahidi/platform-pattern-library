$('.toggle-content-trigger').click(function() {
 	$(this).toggleClass('open'); // Toggle button to open state
    $(this).parent().siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
 	$(this).siblings('.toggle-content').toggleClass('visible'); // Toggle content visible
});
