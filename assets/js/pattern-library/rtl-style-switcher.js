$(document).ready(function() {

    $('span.ltr').click(function() {
    $('#stylesheet').attr({href : '../../css/style.css'});
    });

    $('span.rtl').click(function() {
    $('#stylesheet').attr({href : '../../css/rtl-style.css'});
    });

});
