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

Handlebars.registerHelper('mapEmbed', function(postIndex, fullsize) {
    var dataAttr = postIndex == 'all' ? '' : 'data-post-index="'+postIndex+'"',
        className = fullsize == true ? 'full-size' : '';

    return new Handlebars.SafeString(
        '<div id="map" ' + dataAttr + ' class="map ' + className + '"></div>'
    );
});

Handlebars.registerHelper('deployment', function(options) {
    return options.fn(session.deployment);
});

Handlebars.registerHelper('postSurvey', function(options) {
    return options.fn(session.deployment.surveys[this.properties.survey]);
});

Handlebars.registerHelper('postBand', function() {
    return new Handlebars.SafeString(
        '<div class="post-band" style="background-color: #' + session.deployment.surveys[this.properties.survey].color + '"></div>'
    );
});

Handlebars.registerHelper('postcardField', function(surveyIndex, postIndex, fieldIndex, value) {
    var fieldType = session.deployment.surveys[surveyIndex].fields[fieldIndex].type;

    if (fieldType == 'photo') {
        return new Handlebars.SafeString(
            '<img src="'+value+'" class="postcard-image" />'
        );
    } else if (fieldType == 'location') {
        return Handlebars.helpers.mapEmbed(postIndex, false);
    } else {
        return new Handlebars.SafeString(
            value
        );
    }
});

Handlebars.registerHelper('formField', function(surveyIndex, postIndex, fieldIndex, value) {
    var fieldType = session.deployment.surveys[surveyIndex].fields[fieldIndex].type,
        fieldLabel = session.deployment.surveys[surveyIndex].fields[fieldIndex].label;

    if (fieldType == 'text') {
        return new Handlebars.SafeString(
            '<div class="form-field"><label>'+fieldLabel+'</label><input type="text" value="'+value+'" /></div>'
        );
    } else if (fieldType == 'textarea') {
        return new Handlebars.SafeString(
            '<div class="form-field"><label>'+fieldLabel+'</label><textarea>'+Handlebars.helpers.striptags(value)+'</textarea></div>'
        );
    } else if (fieldType == 'photo') {
        return new Handlebars.SafeString(
            '<div class="form-field file"> \
                <label>' + fieldLabel + '</label> \
                <figure> \
                    <img src="' + value + '" /> \
                    <div class="form-field"> \
                        <button class="button-destructive"> \
                            <svg class="iconic"> \
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../img/iconic-sprite.svg#trash"></use> \
                            </svg> \
                            <span class="hidden">Delete photo</span> \
                        </button> \
                        <input type="file" id="photo" /> \
                        <label for="photo" class="button button-gamma"> \
                            <svg class="iconic"> \
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../img/iconic-sprite.svg#image"></use> \
                            </svg> \
                            <span class="button-label">Replace image</span> \
                        </label> \
                    </div> \
                </figure> \
            </div>'
        );
    } else if (fieldType == 'location') {
        return new Handlebars.SafeString(
            '<div class="form-field location"> \
                <label>' + fieldLabel + '</label> \
                <div id="map" data-post-index="' + postIndex + '" class="map"></div> \
                <form role="search" class="searchbar" data-message="search"> \
                    <div class="searchbar-input"> \
                        <div class="form-field"> \
                            <input type="search" maxlength="250" placeholder="Find a location" value="' + value + '" /> \
                        </div> \
                        <div class="searchbar-results dropdown-menu"> \
                            <div class="form-field"> \
                                <button class="button-plain"> \
                                    <svg class="iconic"> \
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../img/iconic-sprite.svg#magnifying-glass"></use> \
                                    </svg> \
                                    <span class="button-label">Search for "<em>123 Main St</em>"</span> \
                                </button> \
                                <button class="button-beta button-plain"> \
                                    <svg class="iconic"> \
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../img/iconic-sprite.svg#location"></use> \
                                    </svg> \
                                    <span class="button-label">Use your current location</span> \
                                </button> \
                            </div> \
                            <div class="tool"> \
                                <h6 class="tool-heading">Search results</h6> \
                                <dl class="dropdown-menu-body"> \
                                    <dt class="list-item"><a href="#"><em>123 Main St</em>reet Austin, TX USA</a></dt> \
                                    <dt class="list-item"><a href="#"><em>123</em> Paint Supply, 416 Lamar Blvd. Austin, TX USA</a></dt> \
                                </dl> \
                            </div> \
                        </div> \
                    </div> \
                </form> \
                <p><em>You can search or click the area of map where you want to place the marker.</em></p> \
            </div>'
        );
    }
});

Handlebars.registerHelper('taskInfo', function(key, postIndex, taskIndex) {
    var surveyIndex = session.deployment.responses[postIndex].properties.survey,
        keyValue = session.deployment.surveys[surveyIndex].tasks[taskIndex][key];

    if (keyValue !== undefined) {
        return new Handlebars.SafeString(
            session.deployment.surveys[surveyIndex].tasks[taskIndex][key]
        );        
    }
});

Handlebars.registerHelper('postCheckbox', function() {
    if (session.user.logged_in) {
        return new Handlebars.SafeString(
            '<div class="listing-item-select"><input type="checkbox"></div>'
        );
    }
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
        // console.log( '"' + currentTemplate +'" layout: ' + textStatus);
    });
}
