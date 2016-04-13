// Initialize each toggle pair
$('.listing').each(function(){
   var context = $(this),
   toolbar = $(context).find('.listing-toolbar'),
   checkboxes = $(context).find('input[type="checkbox"]');

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'change' handler to checkboxes
   $(checkboxes).on('change', function(e){

       if ($(checkboxes).is(':checked')) {
           $(context).addClass('toolbar-active');
       } else {
           $(context).removeClass('toolbar-active');
       }


   });
});
