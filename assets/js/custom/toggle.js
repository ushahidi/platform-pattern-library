dropdownXpos = function(trigger, target) {
   var triggerPos = $(trigger).position();

   // IF: Right-to-left language
   if ($(trigger).css('direction') == 'rtl') {
      $(target).css('right', ($(window).width() - (triggerPos.left + $(trigger).outerWidth())));
   // ELSE:
   } else {
      $(target).css('left', triggerPos.left);
   }
}

// Initialize each toggle pair
$('[data-toggle]').each(function(){
   var trigger = $(this),
   targetVal = $(trigger).attr('data-toggle'),
   target = $('#'+targetVal).length ? $('#'+targetVal) : $(trigger).next('.'+targetVal);

   // Add 'init' class to pair of elements
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

      // IF: Target is currently hidden
      if ($(target).is(':hidden')) {
         $(trigger).addClass('active');
         $(target).addClass('active');
         if ($(target).hasClass('dropdown-menu')) {
            dropdownXpos(trigger, target);
         }

         // ELSE: Target is currently visible
      } else {
         $(trigger).removeClass('active');
         $(target).removeClass('active').removeAttr('style');
      }

      e.preventDefault();
   });
});
