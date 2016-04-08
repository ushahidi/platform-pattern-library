// Initialize each toggle pair
$('.mode-bar').each(function(){
   var context = $(this),
   trigger = $(context).find('.more-menu-trigger');

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'persist' class to items that appear in bar at all times (first four deployment menu items)
   $(context).find('.deployment-menu li').addClass('tuck').slice(0,3).addClass('persist').removeClass('tuck');
   $(trigger).addClass('persist').removeClass('tuck');

   // Add 'click' handler to toggle trigger
   $(trigger).on('click', function(e){

      // IF: Mode Bar isn't already active
      if (!$(context).hasClass('active')) {
          $(trigger).addClass('active');
          $(context).addClass('active');
      }

      e.preventDefault();
   });

   console.log('Mode Bar ready');
});
