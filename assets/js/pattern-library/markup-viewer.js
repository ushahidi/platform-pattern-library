$(function() {
	$('.pl-sub-pattern-markup').each(function(){
		$(this).before('<div class="pl-sub-pattern-sample"><div class="pl-sub-pattern-sample-toggle-controls"><span class="show">&#43; Show HTML</span><span class="hide">&#45; Hide HTML</span></div><div class="pl-sub-pattern-sample-toggle-target"><pre class="language-markup"><code><script type="prism-html-markup">'+$(this).html()+'</script></code></pre></div></div>');
	});

	$('.pl-sub-pattern').on('click','.pl-sub-pattern-sample-toggle-controls', function(){
		$(this).parent('.pl-sub-pattern-sample').toggleClass('visible');
	});
});
