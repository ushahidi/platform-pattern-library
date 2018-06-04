$('[data-accordion-items]').each(function(){
    var accordion = $(this),
        accordionSelector = '.' + accordion.attr('data-accordion-items'),
        accordionItems = accordion.find(accordionSelector);

    accordionItems.each(function(){
        $(this).children().not('[data-accordion-trigger], [data-accordion-value]').wrapAll('<div class="accordion-content" style="display:none;" />');
    });

    accordionItems.first().addClass('active').children('.accordion-content').show();

    accordion.find('[data-accordion-trigger]').on('click', function(e){
        var accordionItem = $(this).closest(accordionSelector),
            accordionItemTarget = $(this).attr('data-accordion-trigger') ?
                accordionItems.eq($(this).attr('data-accordion-trigger')) : accordionItem;

        if (!accordionItemTarget[0].hasAttribute('disabled')) {
            accordionItems.not(accordionItemTarget).removeClass('active').children('.accordion-content').slideUp();
            accordionItemTarget.addClass('active').children('.accordion-content').slideDown();
        }

        e.preventDefault();
    })
});
