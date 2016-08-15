hideInit = function(triggerSelector) {
    var trigger = $(triggerSelector),
    targetVal = $(trigger).attr('data-hide'),
    target = $('[data-hide-target="'+targetVal+'"]').length ? $('[data-hide-target="'+targetVal+'"]') : $(trigger).next('.'+targetVal);

    // Add 'init' class to target and trigger
    $(trigger).addClass('init');
    $(target).addClass('init');

    // IF: The target is already hidden, apply 'active' class to elements
    /*
    if ($(target).is(':hidden')) {
       $(trigger).addClass('active');
       $(target).addClass('hidden');
    }
    */

    // Add 'click' handler to toggle trigger
    $(trigger).on('click', function(e){
        $(trigger).addClass('active');
        $(target).addClass('hidden');

        e.preventDefault();
    });
}

// Initialize each toggle pair
$('[data-hide]').each(function(){
    hideInit(this);
});
