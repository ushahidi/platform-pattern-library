$(document).ready(function() {

    $('.ltr').click(function() {
    $('#stylesheet').attr({href : '../../css/style.css'});
    });

    $('.rtl').click(function() {
    $('#stylesheet').attr({href : '../../css/rtl-style.css'});
    });

});
