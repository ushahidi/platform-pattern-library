// Initialize mode context
$('.mode-context').each(function(){
   var context = $(this),
   trigger = $('.mode-context-trigger');

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'click' handler to toggle trigger
   $(trigger).on('click', function(e){

      // IF: Mode Bar isn't already active
      if ($(context).hasClass('active')) {
          $(trigger).removeClass('active');
          $(context).removeClass('active');
      } else {
          $(trigger).addClass('active');
          $(context).addClass('active');
      }

      e.preventDefault();
   });
});
