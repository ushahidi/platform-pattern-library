var session,
    localStoreName = 'localStore';

(function() {
    $.ajax({
        url: '../../js/model.json',
        dataType: 'json',
        success: function( data ) {
            console.log( "SUCCESS: JSON from server" );
            session = data;

            // !! ** --- ** !! //
            // LOAD THE LAYOUT, already
            // !! ** --- ** !! //
            hbLoadLayout(function(){
                $.getScript('../../js/app.js', function(data, textStatus ) {
                    // console.log( '"' + currentTemplate +'" layout: ' + textStatus);
                    setTimeout(function() {
                        if (window.location.hash.substr(1) == 'new_response') {
                            messageToggle($('#new_response-success'));
                        }
                    }, 1000);
                });
            });
        },
        error: function( data ) {
            console.log( "ERROR:  " + data );
            session = data;
        }
    });
})();
