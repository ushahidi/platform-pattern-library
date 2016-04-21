messageToggle = function(element) {
   var target = typeof element !== 'undefined' ? element : '.message';

   target.toggleClass('active');
}

$('[data-message], .message-trigger').click(function(e) {
    if ($(this)[0].hasAttribute('data-message')) {
        messageToggle('#'+$(this).attr('data-message'));
    } else {
        messageToggle($(this).closest('.message'));
    }
});
