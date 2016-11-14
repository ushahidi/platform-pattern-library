var session,
    localStoreName = 'localStore';

/*
(function() {
    // If user has NO data stored locally.
    if (localStorage.getItem(localStoreName) === null) {
        console.log('JSON from server...');

        $.ajax({
            url: '../../js/model.json',
            dataType: 'json',
            success: function( data ) {
                console.log( "SUCCESS:  " + data );
                localStorage.setItem(localStoreName, JSON.stringify(data));
                session = data;

                for (var i = 0; i < session.responses.length; i++) {
                    var obj = session.responses[i];

                    console.log(obj.properties);
                    obj.push(session.surveys[obj.properties.survey].tasks[i]);
                }
            },
            error: function( data ) {
                console.log( "ERROR:  " + data );
                session = data;
            }
        });
    // Else, if user HAS data stored locally
    } else {
        console.log('JSON from localstorage');
        session = JSON.parse(localStorage[localStoreName]);
    }
})();
*/

(function() {
    $.ajax({
        url: '../../js/model.json',
        dataType: 'json',
        success: function( data ) {
            console.log( "SUCCESS: JSON from server" );
            session = data;

            function find_in_array(arr, name, value) {
                for (var i = 0, len = arr.length; i<len; i++) {
                    if (name in arr[i] && arr[i][name] == value) return i;
                };
                return false;
            }

            // COPY FIELDS DATA INTO SURVEY FIELDS & TASKS' FIELDS
            // Loop over each survey's fields and append the necessary data
            for (var k = 0; k < data.deployment.surveys.length; k++) {
                var surveyItem = data.deployment.surveys[k];

                // Loop over each field
                for (var l = 0; l < surveyItem.fields.length; l++) {
                    var fieldItem = surveyItem.fields[l];

                    $.extend(fieldItem, data.fields[find_in_array(data.fields, 'control', fieldItem.type)]);
                }

                // Loop over each task field
                if (surveyItem.tasks !== undefined) {
                    for (var m = 0; m < surveyItem.tasks.length; m++) {
                        var taskItem = surveyItem.tasks[m];

                        if (taskItem.fields !== undefined) {

                            for (var j = 0; j < taskItem.fields.length; j++) {
                                var taskFieldItem = taskItem.fields[j];

                                $.extend(taskFieldItem, data.fields[find_in_array(data.fields, 'control', taskFieldItem.type)]);
                            }
                        }
                    }
                }
            }

            for (var k = 0; k < data.deployment.responses.length; k++) {
                var responseItem = data.deployment.responses[k];

                // COPY SURVEY FIELD DATA INTO THEIR RESPONSES' ANSWERS
                for (var j = 0; j < responseItem.answers.length; j++) {
                    var answerItem = responseItem.answers[j];

                    $.extend(answerItem, data.deployment.surveys[responseItem.properties.survey].fields[j]);
                }

                // COPY SURVEY TASK DATA INTO RESPONSES' TASKS
                // Loop over each response and its tasks, and append its survey's tasks data to its own tasks' data
                if (responseItem.tasks !== undefined) {
                    for (var j = 0; j < responseItem.tasks.length; j++) {
                        var taskItem = responseItem.tasks[j];

                        $.extend(taskItem, data.deployment.surveys[responseItem.properties.survey].tasks[j]);
                    }
                }

                // COPY RESPONSES' LOCATION FIELD DATA INTO THEIR ROOT (for Leaflet)
                // Loop over each response's location field and append the geojson data to the root
                $.extend(responseItem, responseItem.answers[find_in_array(responseItem.answers, 'type', 'location')]);
                responseItem.type = 'Feature';
            }

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
