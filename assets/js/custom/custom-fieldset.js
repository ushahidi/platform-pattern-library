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

/*
var element = $('.form-field-wrapper');

if ( element[0].scrollHeight > 39 ) {
    element.after('<span class="toggle"><i class="fa  fa-caret-square-o-down"></i></span>');
    console.log('I should have a toggle trigger');
    console.log(element.height());
    console.log(element[0].scrollHeight);
}

$('.toggle').click(function(e){
    $(this).children('i').toggleClass('fa-caret-square-o-down fa-caret-square-o-up')
    $(this).siblings('.form-field-wrapper').toggleClass('expand');
});
*/
