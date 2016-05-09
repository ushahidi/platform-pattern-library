// Initialize each custom fieldset
$('.custom-fieldset').each(function(){
   var context = $(this),
   fields = $(context).children(':not(legend)'),
   trigger = $(context).children('legend');

   $(context).addClass('init');
   $(fields).wrapAll('<div class="dropdown-menu" />');
   $(trigger).wrapInner('<span class="legend-label"></span>').addClass('dropdown-trigger').attr('data-toggle','dropdown-menu').append('<svg class="iconic chevron"><use xlink:href="/assets/img/iconic-sprite.svg#chevron-bottom"></use></svg>');

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

// Configure custom fieldset for selecting a date range
$('[data-fieldset-type="date-range"]').each(function(){
    var daterangeFieldset = $(this),
        daterangeFieldsetLegend = daterangeFieldset.find('.legend-label'),
        daterangeInputFields = daterangeFieldset.find('.form-field.date'),
        daterangeInputs = daterangeInputFields.find('input');

    // Function to toggle the visibility of custom date range inputs & update the legend's label with the label for the selected radio button
    updateDateRangeControl = function(checkedButton) {
        daterangeFieldsetLegend.text($('label[for="'+checkedButton.val()+'"]').text());

        // If 'custom' is not selected
        if (checkedButton.val() !== 'custom') {
            daterangeInputFields.fadeOut(300);
        } else {
            daterangeInputFields.fadeIn(300);
        }
    }

    // Initialize on page load
    updateDateRangeControl(daterangeFieldset.find('input[type="radio"]:checked'));

    // When the selected radio button changes
    daterangeFieldset.find('input[type="radio"]').on('change', function(){
        updateDateRangeControl(daterangeFieldset.find('input[type="radio"]:checked'));
    });

    // When the values for the custom date range inputs change
    daterangeInputs.on('change', function(){
        daterangeFieldsetLegend.text($('input[name="startdate"]').val() + ' - ' + $('input[name="enddate"]').val());
    });
});
