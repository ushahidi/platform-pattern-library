dropdownXpos = function(trigger, target) {
   var triggerPos = $(trigger).offset();

   // IF: Right-to-left language OR trigger is within 200px of the right of the screen
   if (($(trigger).css('direction') == 'rtl') || (triggerPos.left >= ($(window).width() - 200))) {
      $(target).css('right', ($(window).width() - (triggerPos.left + $(trigger).outerWidth())));
   } else {
      $(target).css('left', triggerPos.left);
   }
}

// overflowCheck = function(target) {
//     $(target).parent().find('.overflow').each(function(){
//         if ($('.overflow').height() < $('.overflow')[0].scrollHeight) {
//             $(this).after('<span class="toggle"><i class="fa  fa-caret-square-o-down"></i></span>');
//             console.log('I should have a toggle trigger');
//         } else {
//             console.log('No toggle trigger');
//             console.log($('.overflow').height());
//             console.log($('.overflow').prop('scrollHeight'));
//
//         }
//     });
// }


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

      // Deactivate (close) other active dropdown triggers and targets
      // $('.dropdown-trigger').not($(trigger)).removeClass('active');
      // $('.dropdown-menu').not($(target)).removeClass('active').removeAttr('style');

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

    //   overflowCheck(target);

      e.preventDefault();
   });
});

$('.toggle-content.dropdown-menu').click(function(e){
    $(this).toggleClass('active');
});
