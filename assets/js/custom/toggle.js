// Initialize each toggle pair
$('[data-toggle]').each(function(){
    var trigger = $(this),
        targetVal = $(trigger).attr('data-toggle'),
        target = $('#'+targetVal).length ? $('#'+targetVal) : $(trigger).siblings('.'+targetVal);

    // Add 'init' class to pair of elements
    $(trigger).addClass('init');
    $(target).addClass('init');

    // IF: The target is already visible, apply 'active' class to elements
    if ($(target).is(':visible')) {
        $(trigger).addClass('active');
        $(target).addClass('active');
    }

    // Add 'click' handler to toggle trigger
    $(trigger).on('click', function(e){

        // IF: Target is currently hidden
        if ($(target).is(':hidden')) {
            $(trigger).addClass('active');
            $(target).addClass('active');

        // ELSE: Target is currently visible
        } else {
            $(trigger).removeClass('active');
            $(target).removeClass('active');
        }

        e.preventDefault();
    });
});