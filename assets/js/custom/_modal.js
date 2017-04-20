var modalToggle = function(element) {
    var target = typeof element !== 'undefined' ? element : '.modal';

    if ($(target).is(':visible')) { // If modal is already visible...
        $('body').removeClass('modal-visible');
        setTimeout(function() {
            $('.modal').fadeOut('fast');
            $('.modal-body').attr('style','');
        }, 400);
    } else { // If modal isn't yet visible...
        $('.modal').not($(target)).fadeOut('fast'); // Fade out other modals (when navigating between modals) [FOR DEMO]

        $('.mainsheet').fadeOut('fast'); // Fade out other mainsheets (when navigating between modals) [FOR DEMO]

        modalYpos(target);
        $(target).fadeIn('fast', function(){
            $('body').addClass('modal-visible');
        });
    }
}

var modalYpos = function(modalContext) {
    var windowYpos = $(window).scrollTop(),
        maxHeight = $(window).height() * 0.66,
        modalWindow = $(modalContext).find('.modal-window'),
        modalBody = $(modalContext).find('.modal-body');

/*
    if (windowYpos > 0) {
        modalWindow.css('top', windowYpos + 40);
    }
*/
    setTimeout(function() {
        modalBody.css({
            'max-height' : maxHeight,
            'height' : modalBody.innerHeight()
        });
    }, 400);

    setTimeout(function() {
        $(modalContext).find('.dropdown-menu').css({
            'max-height' : modalWindow.innerHeight()
        });
    }, 400);
}

var modalBody = function(element) {
    var context = element.closest('.modal-body');

    context.animate({
        scrollTop: element.height() + 16
    }, 1000);
}

$('[data-modal], .modal-trigger').on('click', function(e) {
    if ($(this)[0].hasAttribute('data-modal')) {
        modalToggle('#'+$(this).attr('data-modal'));
    } else {
        modalToggle($(this).closest('.modal'));
    }

    e.preventDefault();
});
