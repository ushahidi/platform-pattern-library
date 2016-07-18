Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// debug helper
// usage: {{debug}} or {{debug someValue}}
// from: @commondream (http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/)
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

/**
 * Each Helper (w/limit).
 *
 * {{#each-limit items 3}}
 * {{/each-limit}}
 */
Handlebars.registerHelper('each-limit', function(context, limit) {
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        var max = Math.min(context.length, limit);
        for (var i = 0; i < max; i++) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

    return ret;
});

Handlebars.registerHelper('postBand', function(survey) {
    return new Handlebars.SafeString(
        '<div class="post-band" style="background-color: #' + session.deployment.surveys[survey].color + '"></div>'
    );
});

hbUserStatus = function() {
    if (session.user.logged_in) {
        session.user.logged_in = false;
    } else {
        session.user.logged_in = true;
    }
    hbLoadLayout();
}

hbLoadLayout = function(layout, mode) {
    // If the 'mode' is defined

    if (typeof mode !== 'undefined') {
        session.mode = mode;
/*
        if (typeof Storage !== 'undefined') {
            saveJSON(session);
        }
*/
    }

    // If the 'layout' is defined...
    if (typeof layout !== 'undefined') {
        session.layout = layout;

/*
        if (typeof Storage !== 'undefined') {
            saveJSON(session);
        }
*/

        $('body').html(Ushahidi.templates.layouts[layout](session));
    // Else, derive the layout from JSON
    } else {
        $('body').html(Ushahidi.templates.layouts[session.layout](session));
    }

    $.getScript('../../js/app.js', function(data, textStatus ) {
        console.log( '"' + session.layout +'" layout: ' + textStatus);
    });
}
