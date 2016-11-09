// Initialize each toggle pair
$('.listing').each(function(){
    var context = $(this),
    toolbar = $(context).find('.listing-toolbar'),
    toggle_button = $(context).find('.listing-item-toggle'),
    toggle_checkboxes = $(context).find('.listing-item-secondary input[type="checkbox"]'),
    select_checkboxes = $(context).find('.listing-item-select input[type="checkbox"]'),
    select_checkboxes_checked;

    // Add 'init' class to the listing
    $(context).addClass('init');

    // When the user interacts with a toggle trigger, toggle the visibility of the listing's body
    $(toggle_button).on('click', function(e){
        $(this).closest('.listing-item').toggleClass('active');
    });

    // When the user interacts with the toggle "switch" checkbox pattern, toggle the visibility of the listing's body
    $(toggle_checkboxes).on('change', function(e){
        if ($(this).is(':checked')) {
            $(this).closest('.listing-item').addClass('active');
        } else {
            $(this).closest('.listing-item').removeClass('active');
        }
    });

    // If one or more items are checked, toggle the visibility of the listing's toolbar
    if ($(toolbar).length) {
        $(select_checkboxes).on('change', function(e){
            select_checkboxes_checked = $(context).find('.listing-item-select input[type="checkbox"]:checked');

            if ($(select_checkboxes_checked).length) {
                $(context).addClass('toolbar-active');
                $('.button-fab').prop('disabled', true).addClass('disabled');
            } else {
                $(context).removeClass('toolbar-active');
                $('.button-fab').prop('disabled', false).removeClass('disabled');
            }

            $(toolbar).find('.listing-toolbar-summary .total').text($(select_checkboxes_checked).length);

            if ($(select_checkboxes_checked).length > 1) {
                $('#edit-selected-posts').attr('href','post-edit-bulk.html');
            } else {
                $('#edit-selected-posts').attr('href','post-edit.html');
            }
        });
    }

    /*
    // If the listing toolbar has two or more buttons, initialize truncated interaction
    if ($(toolbar).find('.listing-toolbar-actions').find('button, .button, fieldset').length > 2) {
        $(toolbar).addClass('truncated');

        $(toolbar).find('.listing-toolbar-toggle').on('click', function(){
            $(toolbar).toggleClass('expanded');
        });
    }
    */
});
