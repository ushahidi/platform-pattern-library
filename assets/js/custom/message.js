messageToggle = function(element) {
   var target = typeof element !== 'undefined' ? element : '.message';

   $(target).toggleClass('active');
}

$('[data-message], .message-trigger').click(function(e) {
    if ($(this)[0].hasAttribute('data-message')) {
        messageToggle('#'+$(this).attr('data-message'));
    } else {
        messageToggle($(this).closest('.message'));
    }

    // If its 'href' value includes a hash, scroll to the appropriate location on the page
    if (/#/.test(this.href)) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 124
        }, 1000);
    }
});
