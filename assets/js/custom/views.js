$('.views ul li').click(function() {
	$(this).siblings().removeClass('active'); // Close other items
	$(this).addClass('active'); // Open parent item
});
