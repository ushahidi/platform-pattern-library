$('.custom-fieldset').each(function(){
    var context = $(this),
        fields = $(context).children(':not(legend)'),
        trigger = $(context).children('legend');

    $(context).addClass('init');
    $(fields).wrapAll('<div class="dropdown-menu" />');
    $(trigger).addClass('dropdown-trigger').attr('data-toggle','dropdown-menu');
});
