// this removes any active classes then adds the active class to clicked element
$('.pl-front-end-guidelines .side-nav').find('li a').click(function(e) {
    $('.pl-front-end-guidelines .side-nav').find('li a').removeClass('active');
    $(this).addClass('active');
});

// after page refresh add classes if href matches url
var url = window.location.href;

$('.pl-front-end-guidelines .side-nav').find('li a').filter(function() {
    if (this.href === url) {
        $(this).addClass('active');
    }
});
