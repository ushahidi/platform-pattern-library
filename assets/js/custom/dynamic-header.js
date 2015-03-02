$('.nav-icon-js').click(function(){
	$(this).toggleClass('open');
	$(this).parent().find('.button-create').toggleClass('fade-out');
});

$('.button-toggle').click(function() {
	$(this).toggleClass('open');
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $('.has-dynamic-header .header');

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 35) {
            header.removeClass('header-full').addClass('header-compact');
        } else {
            header.removeClass('header-compact').addClass('header-full');
        }
    });
});
