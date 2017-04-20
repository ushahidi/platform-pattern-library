lanesWidth = function(lanesContainer) {
    var lanesHeight = lanesContainer.height(),
        lanesSum = lanesContainer.find('.lane').length;

    if (lanesSum > 2) {
        lanesContainer.css({
            'overflow-x' : 'auto'
//            'right' : -Math.abs(lanesSum * 100)
        });
    }
}

lanesHeight = function(lanesContainer) {
    var lanesHeight = lanesContainer.height();

    lanesContainer.find('.lane-body').each(function(){
        if ($(window).width() > 767) {
            $(this).innerHeight(lanesHeight);
        } else {
            $(this).innerHeight('auto');
        }
    });
}

lanesWidth($('.lanes'));
lanesHeight($('.lanes'));

$(window).resize(function() {
    lanesHeight($('.lanes'));
});
