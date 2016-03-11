$('.button-popover').click(function(e){
    $(this).children('.popover').toggleClass('open');
});

$('.popover h6:before').click(function(e){
    $('.popover').toggleClass('open');
});
