// (left menu) - mode context small screen toggle
$('.mode-context .context-toggle').click(function(e){
    $('.mode-context').toggleClass('collapsed');
});

// (right menu) - mode nav mobile toggle
$('.nav-icon-js').click(function(e){
    $('.mode-nav, .mode-context').toggleClass('open');
});

// (right menu) - mode nav large screen toggle
$('.nav-toggle').click(function(e){
    $('.mode-nav, .nav-toggle').toggleClass('collapsed');
});
