// Initialize each toggle pair
$('.mode-bar').each(function(){
   var context = $(this),
   trigger = $(context).find('.more-menu-trigger');

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'click' handler to toggle trigger
   $(trigger).on('click', function(e){

      // IF: Mode Bar isn't already active
      if (!$(context).hasClass('active')) {
          $(trigger).addClass('active');
          $(context).addClass('active');
      }

      e.preventDefault();
   });
});
