updateFieldsetLegend = function(fieldset) {
    var fieldsetValue = fieldset.find('.custom-fieldset-value'),
        checkedRadio = fieldset.find('input[type="radio"]:checked');

    // Include the selected radio input's value in the legend
    fieldsetValue.text(fieldset.find('label[for="'+checkedRadio.attr('id')+'"]').text());
    $('[data-fieldgroup-target]').removeClass('active');

    // If the selected radio button is attached to another fieldgroup...
    if (checkedRadio[0].hasAttribute('data-fieldgroup-toggle')) {
        var target = $('[data-fieldgroup-target="'+checkedRadio.attr('data-fieldgroup-toggle')+'"]'),
            targetCheckboxes = [],
            targetInputs = [];

        // Display the attached fieldgroup and push the checked values to the legend
        target.addClass('active').find('input[type="checkbox"]:checked').each(function(){
            targetCheckboxes.push(fieldset.find('label[for="'+$(this).attr('id')+'"]').text());
            fieldsetValue.text(targetCheckboxes.join(', '));
        });

        // Display the attached fieldgroup and push the input values to the legend
        target.addClass('active').find('input[type="text"]').each(function(){
            targetInputs.push($(this).val());
            fieldsetValue.text(targetInputs.join(' - '));
        });
    }

    updateFieldsetWidth(fieldset);
}

updateFieldsetWidth = function(fieldset) {
    var legendWidth = fieldset.find('legend').outerWidth(true);
    fieldset.find('.dropdown-menu').width(legendWidth);
}

// Initialize each custom fieldset
$('.custom-fieldset').each(function(){
    var fieldset = $(this),
    fieldsetFields = fieldset.children(':not(legend)'),
    fieldsetTrigger = fieldset.children('legend');

    fieldset.addClass('init');

    // Build structure around fields
    fieldsetFields.wrapAll('<div class="dropdown-menu" />');
    fieldsetTrigger.wrapInner('<span class="legend-label"></span>').addClass('dropdown-trigger').attr('data-toggle','dropdown-menu').append('<svg class="iconic chevron"><use xlink:href="/assets/img/iconic-sprite.svg#chevron-bottom"></use></svg>');

    // If the fieldset has a custom-fieldset-value element
    if (fieldset.find('.custom-fieldset-value').length) {
        updateFieldsetLegend(fieldset);

        fieldset.find('input[type="radio"], input[type="checkbox"], input[type="text"]').on('change', function(){
            updateFieldsetLegend(fieldset);
        });

        // When the values for the custom date range inputs change
        fieldset.find('.form-field.date input').on('change', function(){
            updateFieldsetLegend(fieldset);
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
