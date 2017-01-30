// DEMO the "progress" pattern as an interaction
progressPrepend = function(progressType, progressTarget, progressTrigger) {
    var target = progressTarget == undefined ? $('[role="main"]') : $('.'+progressTarget).first();

    if (progressType == 'determinate') {
        target.prepend('<progress max="100" value="60">\
                <div class="progress-bar">\
                    <span style="width: 60%;">Progress: 60%</span>\
                </div>\
            </progress>');
    } else if (progressType == 'indeterminate') {
        target.prepend('<progress>\
                <div class="progress-bar">\
                    <span style="width: 100%;"></span>\
                </div>\
            </progress>');
    } else {
        target.prepend('<div class="progress-bar"><span>Loading...</span></div>');
    }

    console.log('target: ' + target);
}

// Initialize each toggle pair
$('[data-progress]').on('click', function(e){
    progressPrepend($(this).attr('data-progress'), $(this).attr('data-progress-target'), $(this));
});
