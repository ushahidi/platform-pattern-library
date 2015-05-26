$('.accordion-menu-trigger').click(function() {
	var parent = $(this).parents('.accordion-menu-list__item'); // Find the parent item
	parent.siblings().removeClass('open'); // Close other items
	parent.toggleClass('open'); // Open parent item
});
