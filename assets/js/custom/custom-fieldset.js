customFieldset = function(){
    $('.custom-fieldset').each(function(){
        var context = $(this),
            fields = $(context).children(':not(legend)'),
            trigger = $(context).children('legend');

        $(context).addClass('init dropdown-group');
        $(fields).wrapAll('<div class="toggle-content dropdown-menu" />');
        $(trigger).addClass('dropdown toggle-content-trigger');
    });
}

customFieldset();