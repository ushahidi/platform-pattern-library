var message = $('.confirmation-message-wrapper');

// Add class visible when you click on something with .success-trigger class
$('.confirmation-trigger').click(function() {
    message.toggleClass('visible');
    setTimeout(function() {
       message.removeClass('visible');
    }, 8000); //remove class after X time if user hasn't clicked close trigger
});

$('.hide-confirmation-message').click(function() {
    message.removeClass('visible');
});

if (message.hasClass('visible')) {
    setTimeout(function() {
       message.removeClass('visible');
    }, 8000);
}

