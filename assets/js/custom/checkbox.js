checkboxState = function(checkbox){
    var label = $(checkbox).parent('label');

    if ($(checkbox).is(':checked')) {
        $(label).addClass('checked');
    } else {
        $(label).removeClass('checked');
    }
}

$('[type="checkbox"]').each(function(){
    checkboxState($(this));
});

$('[type="checkbox"]').on('change', function(){
    checkboxState($(this));
});