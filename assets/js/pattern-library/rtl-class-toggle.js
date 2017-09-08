$('.rtl-switcher').click(function() {
    $(this).addClass('active').siblings('.ltr-switcher').removeClass('active');
    $('body').addClass('rtl').removeClass('ltr-namespace').addClass('rtl-namespace');
});

$('.ltr-switcher').click(function() {
    $(this).addClass('active').siblings('.rtl-switcher').removeClass('active');
    $('body').removeClass('rtl').removeClass('rtl-namespace').addClass('ltr-namespace');
});
