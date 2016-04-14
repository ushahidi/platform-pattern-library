// Initialize each toggle pair
$('.listing').each(function(){
   var context = $(this),
   toolbar = $(context).find('.listing-toolbar'),
   checkboxes = $(context).find('.listing-item-select input[type="checkbox"]'),
   checkboxes_checked;

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'change' handler to checkboxes
   $(checkboxes).on('change', function(e){
       checkboxes_checked = $(context).find('.listing-item-select input[type="checkbox"]:checked');

       if ($(checkboxes_checked).length) {
           $(context).addClass('toolbar-active');
       } else {
           $(context).removeClass('toolbar-active');
       }

       $(toolbar).find('.listing-toolbar-summary .total').text($(checkboxes_checked).length);
   });
});
