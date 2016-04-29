// Initialize each toggle pair
$('.listing').each(function(){
   var context = $(this),
   toolbar = $(context).find('.listing-toolbar'),
   toggle_button = $(context).find('.listing-item-toggle'),
   toggle_checkboxes = $(context).find('.listing-item-secondary input[type="checkbox"]'),
   select_checkboxes = $(context).find('.listing-item-select input[type="checkbox"]'),
   select_checkboxes_checked;

   // Add 'init' class to the Mode Bar
   $(context).addClass('init');

   // Toggle the visibility of the listing's body when the user interacts with a toggle trigger
   $(toggle_button).on('click', function(e){
       $(this).closest('.listing-item').toggleClass('active');
   });

   // Toggle the visibility of the listing's body when the user interacts with the toggle switch
   $(toggle_checkboxes).on('change', function(e){
       if ($(this).is(':checked')) {
           $(this).closest('.listing-item').addClass('active');
       } else {
           $(this).closest('.listing-item').removeClass('active');
       }
   });

   // Toggle the visibility of the listing's toolbar if one or more items are checked
   if ($(toolbar).length) {
       $(select_checkboxes).on('change', function(e){
           select_checkboxes_checked = $(context).find('.listing-item-select input[type="checkbox"]:checked');

           if ($(select_checkboxes_checked).length) {
               $(context).addClass('toolbar-active');
           } else {
               $(context).removeClass('toolbar-active');
           }

           $(toolbar).find('.listing-toolbar-summary .total').text($(select_checkboxes_checked).length);
       });
   }

   // Initialize listing toolbar based on number of buttons
   if ($(toolbar).find('.listing-toolbar-actions').find('button, .button, fieldset').length > 2) {
       $(toolbar).addClass('truncated');

       $(toolbar).find('.listing-toolbar-toggle').on('click', function(){
           $(toolbar).toggleClass('expanded');
       });
   }
});
