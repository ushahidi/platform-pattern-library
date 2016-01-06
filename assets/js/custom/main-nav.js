// this removes any active classes then adds the active class to clicked element
$('.main-nav').find('li a').not('.hidden-content-trigger').click(function(e) {
    $('.main-nav').find('li a').removeClass('active');
    $(this).addClass('active');
});

// after page refresh add classes if href matches url
var url = window.location.href;

$('.main-nav li a').filter(function() {
    if (this.href == url) {
        $(this).addClass('active');
    }
});

$('.main-nav li .hidden-content').find('li a').filter(function() {
    if (this.href == url) {
        $(this).addClass('active');
        $(this).parent().parent().addClass('visible').siblings('.trigger-container').children('.hidden-content-trigger').addClass('open active');
    }
});

$('.toggle-menu').click(function(e){
    $(this).addClass('collapsed');
    $('.main-nav a, .sub-nav').toggle();
    $('.main.dropdown-menu').addClass('collapsed');
});
