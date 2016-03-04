$('.nav-icon-js').click(function(e){
    $('.mode-nav').toggleClass('open');
});

$('.toggle-menu').click(function(e){
    $('.toggle-menu, .mode-nav').toggleClass('collapsed');
});

$('.mode-context .toggle-menu').click(function(e){
    $('.mode-context').toggleClass('collapsed');
});
