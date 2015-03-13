$('.hidden-content-trigger').click(function() {
    $(this).toggleClass('open');
    $(this).siblings('.hidden-content').toggleClass('visible');
});
