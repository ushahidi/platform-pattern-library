// Initialize each toggle pair
$('.mode-bar').each(function(){
   var context = $(this),
   trigger = $(context).find('.mode-bar-trigger'),
   target = $(context).find('nav');

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'click' handler to toggle trigger
   $(trigger).on('click', function(e){

      // IF: Target is active
      if ($(target).hasClass('active')) {
          $(trigger).removeClass('active');
          $(target).removeClass('active');
          $(context).find('li').removeClass('active');

         // ELSE: Target is currently visible
      } else {
          $(trigger).addClass('active');
          $(target).addClass('active');
      }

      e.preventDefault();
   });
});
