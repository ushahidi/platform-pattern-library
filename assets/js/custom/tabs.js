// add/remove .active class on tabs
$('.tabs-menu ul li').click(function() {
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
});

// Tabs Mobile
// Toggle arrow icon and open views container
$('.tabs-menu-button-js').click(function() {
    
    if ( $('.filters-container').hasClass('open') ) {
        $('.filter-button-js').toggleClass('open');
        $('.filters-container').toggleClass('open');
    }

    $(this).siblings('.tabs-menu-list').toggleClass('open');
});

// Display selected <li>
$('ul.tabs-menu-list li').click(function() {
    $(this).parent().prev('#tabs-menu-selection').html($(this).text());
    $(this).parent().toggleClass('open');
    $(this).parent().siblings('.tabs-menu-button-js').toggleClass('open');
});
