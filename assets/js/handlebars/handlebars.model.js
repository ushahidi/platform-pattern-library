var session,
    localStoreName = 'localStore';

(function() {
    // If user has NO data stored locally.
    if (localStorage.getItem(localStoreName) === null) {
        console.log('grabbing json from server...');

        $.ajax({
            url: '../../js/model.json',
            dataType: 'json',
            success: function( data ) {
                console.log( "SUCCESS:  " + data );
                localStorage.setItem(localStoreName, JSON.stringify(data));
                session = data;
            },
            error: function( data ) {
                console.log( "ERROR:  " + data );
                session = data;
            }
        });
    // Else, if user HAS data stored locally
    } else {
        console.log('loading json from localstorage');
        session = JSON.parse(localStorage[localStoreName]);
    }
})();
