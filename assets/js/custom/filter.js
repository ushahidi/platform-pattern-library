// Toggle arrow icon and open filter container
$('.filter-button-js').click(function() {
	$(this).toggleClass('open');

    if ( $('.tabs-menu-list').hasClass('visible') ) {
        $('.tabs-menu-button-js').toggleClass('open');
        $('.tabs-menu-list').toggleClass('visible');
    }

    $(this).parent().siblings('.filters-container').toggleClass('visible');
});

$('.filters-container a').click(function(e) {
    e.preventDefault();
});
