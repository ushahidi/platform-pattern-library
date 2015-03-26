$('.main-nav').find('li a').click(function(e) {
    $('.main-nav').find('li a').removeClass('active');
    $(this).addClass('active');
});

var url = window.location.href;

$('.main-nav li a').filter(function() {
    return this.href == url;
}).addClass('active');

var pageName = (location.pathname).split('/').pop();

$('.main-nav li .hidden-content').find('li a').each(function(index, value)
{
    // Append a '$' to the pagename to make the match()-function search
    // from the end of the href value:
    pageName += '$';

    if( value.href.match(pageName))
    {
        // If the pagename matches the href-attribute, then add classes
        $(this).parent().parent().siblings('.trigger-container').children('.hidden-content-trigger').addClass('open active');

        $(this).parent().parent().addClass('visible');
    }
});
