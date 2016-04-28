// Initialize each custom fieldset
$('.custom-fieldset').each(function(){
   var context = $(this),
   fields = $(context).children(':not(legend)'),
   trigger = $(context).children('legend');

   $(context).addClass('init');
   $(fields).wrapAll('<div class="dropdown-menu" />');
   $(trigger).addClass('dropdown-trigger').attr('data-toggle','dropdown-menu').append('<svg class="iconic chevron"><use xlink:href="/assets/img/iconic-sprite.svg#chevron-bottom"></use></svg>');

   if ($(context)[0].hasAttribute('data-legend')) {
      $(context).attr('data-legend', $(trigger).text());

      $(context).find('input[type="radio"]').on('change', function(){
         var input = $(this),
            label = $(context).find('label[for="'+$(input).attr('id')+'"]');

         $(trigger).text(label.text());
      });
   }
});

// Configure custom fieldset for selecting color
$('[data-fieldset-type="color"]').each(function(){
    var colorInput = $('[data-input-type="color"]'),
        colorVal = colorInput.val(),
        fieldsetLegend = $(this).find('legend');

    fieldsetLegend.prepend('<span class="swatch" style="background-color: #'+colorVal+';"></span>');

    $('[data-button-type="color"]').each(function(){
        $(this).attr('style', 'border-top-color: #'+$(this).val()+';')
    });

    $('[data-button-type="color"]').on('click', function(){
        colorVal = $(this).val();

        colorInput.val(colorVal);
        fieldsetLegend.children('.swatch').attr('style', 'background-color: #'+colorVal+';');
    });

    colorInput.on('keyup', function(){
        colorVal = $(this).val();

        fieldsetLegend.children('.swatch').attr('style', 'background-color: #'+colorVal+';');
    });
});
