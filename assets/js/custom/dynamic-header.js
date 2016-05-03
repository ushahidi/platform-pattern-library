var headerScrollReact = function(headerHeight, lastScrollTop, parallaxReady) {
    // When scrolling, fade content relative to scroll position and speed
    $(window).scroll(function(event){
       var scrollAmt = $(this).scrollTop();

       if ((scrollAmt >= headerHeight) && (scrollAmt < headerHeight + 75)) {
            // TRANSITION
            $('.header').removeClass('header-full header-compact');
            if (scrollAmt > lastScrollTop){
                // Scrolling down
                $('.header').delay(1500).addClass('header-transition');
            } else {
                // Scrolling up
                $('.header').addClass('header-transition');
            }
       } else if (scrollAmt >= (headerHeight + 75)) {
            // COMPACT
            $('.header').removeClass('header-transition header-full').addClass('header-compact');
       } else {
            // FULL
            $('.header').removeClass('header-transition header-compact').addClass('header-full');

            if (parallaxReady == true) {
                var deltaS = scrollAmt - lastScrollTop;
                $('.parallax').css({
                    bottom: "-=" + deltaS/4.5,
                    opacity: "-=" + deltaS/200
                });
                lastScrollTop = scrollAmt;
            }
       }
    });
}

var headerMakeDynamic = function(){
    $('.header').removeClass('header-compact').addClass('header-full');
    $('.parallax').hide().fadeIn(400);

    var headerHeight = $('.header').outerHeight(),
        lastScrollTop = $(window).scrollTop();


    // If page loads with scroll position greater than 0
    if (lastScrollTop != 0) {
        $('.header').removeClass('header-transition header-full').addClass('header-compact');
        headerScrollReact(headerHeight, lastScrollTop, false);
    } else {
        $('.header').height(headerHeight);
        headerScrollReact(headerHeight, lastScrollTop, true);
    }
}

$(document).ready(function(){
    var body = $('body'),
        navClose = '<div class="close-nav"></div>';

    $('.nav-icon-js').click(function(){
        body.toggleClass('navigation-open');

        if (navClose != '') {
            $('.wrapper').append(navClose);
            navClose = '';
        } else {
            $('.wrapper').find('.close-nav').toggle();
        }
    });

    $(document).on('click', '.close-nav', function(){
        body.removeClass('navigation-open');
        $('.wrapper').find('.close-nav').toggle();
    });
});
