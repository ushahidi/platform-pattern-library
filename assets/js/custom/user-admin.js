$('.user-admin .toggle-wrapper').click(function(e) {
    if(!$(e.target).hasClass('button-toggle')) {
        $(this).children('.button-toggle').toggleClass('open');
    }

    $(this).siblings('.dropdown-menu').toggleClass('open');
});
