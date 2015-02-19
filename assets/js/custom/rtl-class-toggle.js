$(function() {
    $( '.remove-rtl' ).click(function() {
        $( 'body' ).removeClass('rtl');
        return false;
    });
});

$(function() {
    $( '.add-rtl' ).click(function() {
        $( 'body' ).addClass('rtl');
        return false;
    });
});
