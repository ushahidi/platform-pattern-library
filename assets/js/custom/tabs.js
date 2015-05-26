// add/remove .active class on tabs
$('.tabs-menu ul li').click(function() {
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
});

// Tabs Mobile
// Toggle arrow icon and open views container
$('.tabs-menu-button-js').click(function() {
    $(this).toggleClass('open');

    if ( $('.filters-container').hasClass('visible') ) {
        $('.filter-button-js').toggleClass('open');
        $('.filters-container').toggleClass('visible');
    }

    $(this).siblings('.tabs-menu-list').toggleClass('visible');
});

// Display selected <li>
$('ul.tabs-menu-list li').click(function() {
    $(this).parent().prev('#tabs-menu-selection').html($(this).text());
    $(this).parent().toggleClass('visible');
    $(this).parent().siblings('.tabs-menu-button-js').toggleClass('open');
});
