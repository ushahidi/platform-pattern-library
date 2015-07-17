$(function() {
    $( '#button-ltr' ).click(function() {
        $(this).parent().addClass('hidden');
        $(this).parent().siblings('li').removeClass('hidden');
        $( 'body' ).removeClass('rtl');
        return false;
    });
});

$(function() {
    $( '#button-rtl' ).click(function() {
        $(this).parent().addClass('hidden');
        $(this).parent().siblings('li').removeClass('hidden');
        $( 'body' ).addClass('rtl');
        return false;
    });
});
