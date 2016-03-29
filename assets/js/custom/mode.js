// (left menu) - mode context small screen toggle
$('.mode-context .context-toggle').click(function(e){
    $('.mode-context').toggleClass('open');
});

$('.mode-group .toggle').click(function(e){
    $(this).toggleClass('fa-chevron-down fa-chevron-up').parent('.mode-group').toggleClass('open');
});
