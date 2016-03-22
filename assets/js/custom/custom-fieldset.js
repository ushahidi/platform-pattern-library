$('.custom-fieldset').each(function(){
   var context = $(this),
   fields = $(context).children(':not(.dropdown-trigger)'),
   trigger = $(context).children('.dropdown-trigger');

   $(context).addClass('init');
   $(fields).wrapAll('<div class="dropdown-menu" />');
   $(trigger).addClass('dropdown-trigger').attr('data-toggle','dropdown-menu');

   if ($(context)[0].hasAttribute('data-legend')) {
      $(context).attr('data-legend', $(trigger).text());

      $(context).find('input[type="radio"]').on('change', function(){
         var input = $(this),
            label = $(context).find('label[for="'+$(input).attr('id')+'"]');

         $(trigger).text(label.text());
      });
   }
});
