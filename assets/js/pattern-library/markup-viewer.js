$(function() {

	$('.pl-sub-pattern-markup').each(function(index){		
			if (!$('#pattern-sample-' + index)[0]) {
					$(this).before('<div id="pattern-sample-' + index + '" class="pl-sub-pattern-sample"><div class="pl-sub-pattern-sample-toggle-controls"><span class="show">&#43; Show HTML</span><span class="hide">&#45; Hide HTML</span></div><div class="pl-sub-pattern-sample-toggle-target"><pre class="language-handlebars"><code><script type="prism-html-markup">'+$(this).html()+'</script></code></pre></div></div>');
			}
	});

	$('.pl-sub-pattern').on('click','.show', function(){
			$(this).parent().parent().addClass('visible');
	});

	$('.pl-sub-pattern').on('click','.hide', function(){
			$(this).parent().parent().removeClass('visible');
	});

});
