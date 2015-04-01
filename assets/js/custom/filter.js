// if #map exists, open filters by default
if( !$('#map').length ) {
    $('.filters').find('.filters-wrapper').children('.filter-button-js').removeClass('open'
).addClass('closed');
    $('.filters').find('.filters-container').removeClass('open'
).addClass('closed');
}

// Toggle arrow icon and open filter container
$('.filter-button-js').click(function() {

    if ( $('.tabs-menu-list').hasClass('open') ) {
        $('.tabs-menu-button-js').toggleClass('open');
        $('.tabs-menu-list').toggleClass('open');
    }

    $(this).parent().siblings('.filters-container').toggleClass('open');
});

$('.filters-container a').click(function(e) {
    e.preventDefault();
});

$('.filters-container .tabs .tabs-menu ul li').click(function() {
        var attr = $(this).find('a').attr('href');

        $(this).closest('.tabs').find('div.tab-content.active').removeClass('active');
        $(attr).addClass('active');
});
