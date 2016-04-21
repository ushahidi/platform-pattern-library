$('.tabs-menu').each(function(){
    var menu = $(this),
        targetIdentifier = menu.attr('data-tabs');

    if (window.location.hash && menu.find('a[href="'+window.location.hash+'"]').length) {
        menu.find('li').removeClass('active');
        menu.find('a[href="'+window.location.hash+'"]').parent('li').addClass('active');
        $('#'+window.location.hash.substring(1)).addClass('active');
    } else if (menu.find('li.active').length) {
        $('#'+menu.find('li.active a').attr('href').substring(1)).addClass('active');
    } else {
        menu.find('li:first').addClass('active');
        $('#'+menu.find('li:first a').attr('href').substring(1)).addClass('active');
    }

    menu.addClass('init');
    $('.'+targetIdentifier).addClass('tabs-target');

    menu.find('a').on('click',function(e){
        var targetVal = $(this).attr('href').substring(1),
            target = $('#'+targetVal);

        // Update 'active' class on menu items
        menu.find('li').removeClass('active');
        $(this).parent('li').addClass('active');

        $('.'+targetIdentifier).not(target).removeClass('active');
        target.addClass('active');

        if (menu[0].hasAttribute('data-tabs-hash')) {
            if (history.pushState) {
                history.pushState(null, null, $(this).attr('href'));
            }
            else {
                location.hash = $(this).attr('href');
            }
        }

        e.preventDefault();
    });

});
