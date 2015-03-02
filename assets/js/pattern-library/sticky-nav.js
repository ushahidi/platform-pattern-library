$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 130) {
        $('.pl-jump-nav').addClass('pl-fixed');
        $('.pl').addClass('sticky-nav');
    } else {
        $('.pl-jump-nav').removeClass('pl-fixed');
        $('.pl').removeClass('sticky-nav');
    }
});

