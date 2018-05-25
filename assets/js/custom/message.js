messageToggle = function(element, sustain) {
    var target = typeof element !== 'undefined' ? element : '.message';

    if ($(target).hasClass('active')) {
        $(target).removeClass('active')
    } else {
        $(target).addClass('active')
    }

    // IF 'sustain' is false or undefined, inactivate the message after five seconds.
    if (!sustain) {
        setTimeout(function() {
            $(target).removeClass('active');
        }, 5000);
    }
}

$('[data-message], .message-trigger').click(function(e) {
    if ($(this)[0].hasAttribute('data-message')) {
        messageToggle('#'+$(this).attr('data-message'), $(this)[0].hasAttribute('data-message-sustain') ? true : false);
    } else {
        messageToggle($(this).closest('.message'));
    }

    // If its 'href' value includes a hash, scroll to the appropriate location on the page
    if (/#/.test(this.href)) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 124
        }, 1000);

        // !!For demonstration purposes only!! Adding an "error" class to a field to demonstrate validation error
        $($(this).attr('href')).addClass('error');
    }

    e.preventDefault();
});
