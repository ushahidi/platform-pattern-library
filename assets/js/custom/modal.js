modalToggle = function() {
    if ($('body').hasClass('modal-visible')) { // If modal is already visible...
       	$('body').removeClass('modal-visible');
        setTimeout(function() {
            $('.modal').fadeOut('fast');
        }, 400);
    } else { // If modal isn't yet visible...
        modalYpos();
    	$('.modal').fadeIn('fast', function(){
    	    $('body').addClass('modal-visible');
    	});
    }
}

modalYpos = function() {
    var windowYpos = $(window).scrollTop();
    if (windowYpos > 0) {
        $('.modal-window').css('top', windowYpos + 40);
    }
}

modalInit = function(dialog, open) {
    // Click anything with class name 'modal-trigger'
    $('.modal-trigger').click(function(e) {
        modalToggle();
        e.preventDefault();
    });

    if (open == true) {
        modalToggle();
    }

    if (dialog == false) {
        return false;
    } else {
        // When modal is visible, click outside the window to close
        $('.modal-overlay').click(function() {
            modalToggle();
        });
    }
}