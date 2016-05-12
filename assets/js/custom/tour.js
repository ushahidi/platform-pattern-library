var tourPin = function(prevStep, nextStep, target, position) {
    var targetPos = $(target).offset(),
        targetWidth = $(target).outerWidth(),
        targetHeight = $(target).outerHeight();

    $('#'+prevStep).removeClass('active'); // Remove 'active' state from previous step

    // Apply correct state to pin
    // IF: Previous step was a modal
    if ($('#'+prevStep).hasClass('tour-modal')) {
        $('.tour-pin').removeClass(function (index, css) {
            return (css.match (/(^|\s)pin-\S+/g) || []).join(' ');
        }).addClass('pin-enter');

    // ELSE: Previous step was a pin AND the next step is a modal
    } else if (!$('#'+prevStep).hasClass('tour-modal') && $('#'+nextStep).hasClass('tour-modal')) {
        $('.tour-pin').removeClass(function (index, css) {
            return (css.match (/(^|\s)pin-\S+/g) || []).join(' ');
        }).css('top','-100%');

    // ELSE: Previous step was a pin AND the next step is a pin
    } else {
        $('.tour-pin').removeClass('pin-enter').toggleClass('pin-move');
    }

    // IF: Message is attached to a Pin
    if (typeof target !== 'undefined') {
        // Position Pin
        if (typeof position === 'undefined') {
            $('.tour-pin').css({
                'top' : '-100%',
                'left' : '50%'
            });
        } else if (position === 'top-left') {
            $('.tour-pin').css({
                'top' : targetPos.top - 10,
                'left' : targetPos.left - 10
            });
        } else if (position === 'top-right') {
            $('.tour-pin').css({
                'top' : targetPos.top,
                'left' : targetPos.left + targetWidth - 10
            });
        } else if (position === 'bottom-left') {
            $('.tour-pin').css({
                'top' : targetPos.top + targetHeight - 10,
                'left' : targetPos.left
            });
        } else if (position === 'bottom-right') {
            $('.tour-pin').css({
                'top' : targetPos.top + targetHeight - 10,
                'left' : targetPos.left + targetWidth - 10
            });
        } else if (position === 'center') {
            $('.tour-pin').css({
                'top' : targetPos.top + targetHeight/2 - 10,
                'left' : targetPos.left + targetWidth/2 - 10
            });
        } else if (position === 'top-center') {
            $('.tour-pin').css({
                'top' : targetPos.top,
                'left' : targetPos.left + targetWidth/2 - 10
            });
        } else if (position === 'bottom-center') {
            $('.tour-pin').css({
                'top' : targetPos.top + targetHeight - 10,
                'left' : targetPos.left + targetWidth/2 - 10
            });
        }

        // Position message
        $('#'+nextStep).addClass('active').css({ // Add 'active' state to Message and position it horizontally
            'top' : targetPos.top + targetHeight + 40
        });

        // IF: Browser window is wider than 767px, position the message horizontally
        if ($(window).width() > 767) {
            if ((targetPos.left + targetWidth/2) > $(window).width()/2) { // IF: The Pin is positioned on the right half of the screen
                $('#'+nextStep).css({
                    'left' : '65%'
                });
            } else if ((targetPos.left + targetWidth/2) < $(window).width()/2) { // IF: The Pin is positioned on the left half of the screen
                $('#'+nextStep).css({
                    'left' : '35%'
                });
            } else { // IF: The Pin is positioned in the center of the screen
                $('#'+nextStep).css({
                    'left' : '50%'
                });
            }
        }

        // IF: The Pin is positioned more than 33% down the browser window, scroll to it
        if ((targetPos.top + targetHeight) > ($(window).height()/1.5)) {
            $('html, body').animate({
                scrollTop: targetPos.top - 70
            }, 1000);
        }

    // ELSE: Message is a Modal
    } else {
        // Scroll the browser window to the top
        $('html, body').animate({
            scrollTop: 0
        }, 1000);

        // Add 'active' state to Message
        $('#'+nextStep).addClass('active');
    }
}

var tourStep = function(step, init) {
    var start = typeof step !== 'undefined' ? false : true,
        prevStep = $('body').attr('data-step'),
        nextStep = typeof step !== 'undefined' ? step : 'start';

    // Set the body's 'data-step' attribute to the next step
    $('body').attr('data-step', nextStep);

    // IF: Next step is a modal
    if ($('#'+nextStep).hasClass('tour-modal')) {
        $('.tour-mask').fadeIn(1000);
        tourPin(prevStep, nextStep); // Position pin and message

    // ELSE: Next step is a pin
    } else {
        $('.tour-mask').fadeOut(500); // Fade out mask
        tourPin(prevStep, nextStep, '[data-message="'+nextStep+'"]', 'bottom-center'); // Position pin and message
    }

    if (start == false && !init) {
        // IF: Browser supports pushState
        if (history.pushState) {
            history.pushState(null, null, '#'+nextStep);
        } else {
            window.location.hash = nextStep;
        }
    }
}

var tourStepLookup = function(step) {
    // IF: The current URL includes a hash
    if (window.location.hash) {
        return window.location.hash.substr(1);

    // ELSE IF: Step is defined through parameter
    } else if (typeof step !== 'undefined') {
        return step;

    // ELSE: Start from the first step
    }
}

var tourInit = function(step) {
    // Disable all other links and buttons on the deployment
    $('*').not('[data-cue], [data-payment], .tour-link').on('click', function(e){
        e.preventDefault();
    }).off('click');

    // Click event for cue buttons
    $('[data-cue]').on('click', function() {
        tourStep($(this).attr('data-cue'));
    });
    // Animate in the appropriate step
    setTimeout(function(){
        tourStep(tourStepLookup(step), true);
    }, 500);

    // Go to correct step on 'Back' button
    window.onpopstate = function(event) {
        tourStep(tourStepLookup());
    };
}
