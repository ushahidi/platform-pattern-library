$(function() {
	$('.pl-sub-pattern-markup').each(function(){
		$(this).after('<div class="pl-sub-pattern-sample"><div class="pl-sub-pattern-sample-toggle-controls"><span class="show">&#43; Show</span><span class="hide">&#45; Hide</span> HTML</div><div class="pl-sub-pattern-sample-toggle-target"><textarea>'+$(this).html()+'</textarea></div></div>');
	});

	$('.pl-sub-pattern').on('click','.pl-sub-pattern-sample-toggle-controls', function(){
		$(this).parent('.pl-sub-pattern-sample').toggleClass('visible');
	});
});