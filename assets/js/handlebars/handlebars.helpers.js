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

Handlebars.registerHelper("striptags", function( input ){
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    return input.replace(commentsAndPhpTags, "")
        .replace(tags, "");
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

Handlebars.registerHelper('mapEmbed', function(postIndex, fullsize) {
    var dataAttr = postIndex == 'all' ? '' : 'data-post-index="'+postIndex+'"',
        className = fullsize == true ? 'full-size' : '';

    return new Handlebars.SafeString(
        '<div id="map" ' + dataAttr + ' class="map ' + className + '"></div>'
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

hbLoadLayout = function() {
    var currentURL = window.location.href.split('/').pop(),
        currentTemplate = currentURL.slice(0, -5),
        currentMode = currentTemplate.split(/-(.+)?/)[0];

    console.log('template: '+ currentTemplate + '; mode: '+ currentMode);

    // If the page is a "layout"...
    if (!currentTemplate == '') {
        session.mode = currentMode;

        $('body').html(Ushahidi.templates.layouts[currentTemplate](session));
    }

    $.getScript('../../js/app.js', function(data, textStatus ) {
        console.log( '"' + currentTemplate +'" layout: ' + textStatus);
    });
}
