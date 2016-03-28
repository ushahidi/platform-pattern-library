$('.views ul li').click(function() {
	$(this).siblings().removeClass('active'); // Close other items
	$(this).toggleClass('active'); // Open parent item
});
