// Initialize each toggle pair
$('.listing').each(function(){
   var context = $(this),
   toolbar = $(context).find('.listing-toolbar'),
   toggle_checkboxes = $(context).find('.listing-item-secondary input[type="checkbox"]'),
   select_checkboxes = $(context).find('.listing-item-select input[type="checkbox"]'),
   select_checkboxes_checked;

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Add 'change' handler to checkboxes
   $(select_checkboxes).on('change', function(e){
       select_checkboxes_checked = $(context).find('.listing-item-select input[type="checkbox"]:checked');

       if ($(select_checkboxes_checked).length) {
           $(context).addClass('toolbar-active');
       } else {
           $(context).removeClass('toolbar-active');
       }

       $(toolbar).find('.listing-toolbar-summary .total').text($(select_checkboxes_checked).length);
   });

   $(toggle_checkboxes).on('change', function(e){
       if ($(this).is(':checked')) {
           $(this).closest('.listing-item').addClass('active');
       } else {
           $(this).closest('.listing-item').removeClass('active');
       }
   });
});
