// animates postcard when selected in Data view
$('.timeline .postcard a').click(function(e) {
    e.preventDefault();
});

$('.timeline .postcard').click(function() {
    if ($(this).hasClass('selected')){
        $('.timeline .postcard').removeClass('selected');
    } else {
        $('.timeline .postcard').removeClass('selected');
        $(this).addClass('selected');
    }
});
