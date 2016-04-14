$('.rtl').click(function() {
    $(this).addClass('active').siblings('.ltr').removeClass('active');
    $('body').addClass('rtl');
});

$('.ltr').click(function() {
    $(this).addClass('active').siblings('.rtl').removeClass('active');
    $('body').removeClass('rtl');
});
