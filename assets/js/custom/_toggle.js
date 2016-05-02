toggleInit = function(triggerSelector) {
    var trigger = $(triggerSelector),
    targetVal = $(trigger).attr('data-toggle'),
    target = $('[data-toggle-target="'+targetVal+'"]').length ? $('[data-toggle-target="'+targetVal+'"]') : $(trigger).next('.'+targetVal);

    // Add 'init' class to target and trigger
    $(trigger).addClass('init');
    $(target).addClass('init');

    // IF: The target is already visible, apply 'active' class to elements
    if ($(target).is(':visible')) {
       $(trigger).addClass('active');
       $(target).addClass('active');

       if ($(target).hasClass('dropdown-menu')) {
          dropdownXpos(trigger, target);
       }
    }

    // Add 'click' handler to toggle trigger
    $(trigger).on('click', function(e){

       // Deactivate (close) other active dropdown triggers and targets
       $('[data-toggle]').not($(trigger)).removeClass('active');
       $('[data-toggle-target]').not($(target)).removeClass('active').removeAttr('style');

       // IF: Target is currently hidden
       if ($(target).is(':hidden')) {
          $(trigger).addClass('active');

          // IF: Target has the 'data-toggle-animate' attribute, animate it
          if ($(target)[0].hasAttribute('data-toggle-animate')) {
            // IF: The target's 'data-toggle-animate' attribute has a value, use it to determine which 'display' value to animate to. If it has no value, default to 'block'
              var animateAttr = $(target).attr('data-toggle-animate'),
                animateTo = animateAttr == '' ? 'block' : animateAttr;

              $(target).css('display', animateTo).animate({
                  opacity: 1
              }, 150);
          }
          $(target).addClass('active');

          $('body').addClass('noscroll');
          if ($(target).hasClass('dropdown-menu')) {
             dropdownXpos(trigger, target);
          }

          // ELSE: Target is currently visible
       } else {
          $(trigger).removeClass('active');

          // IF: Target has the 'data-toggle-animate' attribute, animate it
          if ($(target)[0].hasAttribute('data-toggle-animate')) {
              $(target).animate({
                  opacity: 0
              }, 150, function() {
                  $(this).css('display', 'none');
              });
          } else {
              $(target).removeAttr('style');
          }
          $(target).removeClass('active');

          $('body').removeClass('noscroll');
       }

     //   overflowCheck(target);

       e.preventDefault();
    });
}

dropdownXpos = function(trigger, target) {
   var triggerPos = $(trigger).offset();

   // IF: Right-to-left language OR trigger is within 200px of the right of the screen
   if (($(trigger).css('direction') == 'rtl') || (triggerPos.left >= ($(window).width() - 200))) {
      $(target).css('right', ($(window).width() - (triggerPos.left + $(trigger).outerWidth())));
   } else {
      $(target).css('left', triggerPos.left);
   }

   // Give the target the same top positioning as its trigger
   $(target).css('top', triggerPos.top + $(trigger).outerHeight());
}

// Initialize each toggle pair
$('[data-toggle]').each(function(){
    toggleInit(this);
});
