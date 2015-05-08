modalToggle = function() {
    if ($('body').hasClass('modal-visible')) { // If modal is already visible...
       	$('body').removeClass('modal-visible');
        setTimeout(function() {
            $('.modal').fadeOut('fast');
        }, 400);
    } else { // If modal isn't yet visible...
    	$('.modal').fadeIn('fast', function(){
    	    $('body').addClass('modal-visible');
    	});
    }
}

// Click anything with class name 'modal-trigger'
$('.modal-trigger').click(function(e) {
    modalToggle();
    e.preventDefault();
});

// When modal is visible, click outside the window to close
$('.modal-overlay').click(function() {
    modalToggle();
});