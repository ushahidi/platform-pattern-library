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

Handlebars.registerHelper ('truncate', function (str, len) {
    if (str && str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return new Handlebars.SafeString ( new_str +'...' );
    }
    return str;
});

Handlebars.registerHelper('global', function(options) {
    return options.fn(session);
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

Handlebars.registerHelper('surveyFromHash', function(options) {
    if (window.location.hash && isNaN(window.location.hash)) {
        return options.fn(session.deployment.surveys[window.location.hash.substr(1)]);
    } else {
        return options.fn(session.deployment.surveys[0]);
    }
});

Handlebars.registerHelper('postFromHash', function(options) {
    if (window.location.hash && isNaN(window.location.hash)) {
        return options.fn(session.deployment.responses[window.location.hash.substr(1)]);
    } else {
        return options.fn(session.deployment.responses[0]);
    }
});

Handlebars.registerHelper('categoryFromHash', function(options) {
    if (window.location.hash && isNaN(window.location.hash)) {
        return options.fn(session.deployment.categories[window.location.hash.substr(1)]);
    } else {
        return options.fn(session.deployment.categories[0]);
    }
});

Handlebars.registerHelper('indexFromHash', function(options) {
    return window.location.hash ? window.location.hash.substr(1) : 0;
});

Handlebars.registerHelper('ifPostIsDataSource', function(options) {
    if (session.deployment.surveys[this.properties.survey].datasource) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper('postBand', function() {
    return new Handlebars.SafeString(
        '<div class="post-band" style="background-color: #' + session.deployment.surveys[this.properties.survey].color + '"></div>'
    );
});

Handlebars.registerHelper('postcardField', function(summary) {
    var fieldControl = this.type,
        fieldValue = this.value,
        fieldLabel = this.label,
        fieldIcon = this.icon;

    if (summary == true && !this.postcard) {

    } else if (fieldControl == 'file') {
        return new Handlebars.SafeString(
            '<div class="postcard-field"> \
                <h2 class="form-label">' + fieldLabel + '</h2> \
                <img src="'+fieldValue+'" class="postcard-image" /> \
            </div>'
        );
    } else if (fieldControl == 'location') {
        return new Handlebars.SafeString(
            '<div class="postcard-field"> \
                <h2 class="form-label">' + fieldLabel + '</h2>'
                + Handlebars.helpers.mapEmbed(0, false) +
            '</div>'
        );
    } else if (fieldControl == 'checkboxes' || fieldControl == 'radio') {
        var selectedItems = '';

        for (var i=0; i < fieldValue.length; i++) {
            selectedItems +=    '<div> \
                                    <svg class="iconic ' + fieldControl + '" style="margin-right:4px;"> \
                                        <use xlink:href="' + fieldIcon + '"></use> \
                                    </svg>'
                                    + this.options[fieldValue].label +
                                '</div>';
        }

        return new Handlebars.SafeString(
            '<div class="postcard-field ' + fieldControl + '"> \
                <h2 class="form-label">' + fieldLabel + '</h2>'
                + selectedItems +
            '</div>'
        );
    } else if (fieldControl == 'categories') {
        var categoryItems = '';

        for (var i=0; i < fieldValue.length; i++) {
            categoryItems += '<li>' + session.deployment.categories[fieldValue[i]].name + '</li>';
        }

        return new Handlebars.SafeString(
            '<div class="postcard-field ' + fieldControl + '"> \
                <h2 class="form-label">' + fieldLabel + '</h2> \
                <ul>' + categoryItems + '</ul> \
            </div>'
        );
    } else if (fieldControl == 'select') {
        return new Handlebars.SafeString(
            '<div class="postcard-field select"> \
                <h2 class="form-label">' + fieldLabel + '</h2> \
                <svg class="iconic" style="margin-right:4px;"> \
                    <use xlink:href="../../img/iconic-sprite.svg#check"></use> \
                </svg>'
                + this.options[fieldValue].label +
            '</div>'
        );
    } else {

        if (summary == true) {
            return new Handlebars.SafeString(
                '<div class="postcard-field"> \
                    <h2 class="form-label">' + fieldLabel + '</h2>'
                    + Handlebars.helpers.truncate(Handlebars.helpers.striptags(fieldValue), 160) +
                '</div>'
            );
        } else {
            return new Handlebars.SafeString(
                '<div class="postcard-field"> \
                    <h2 class="form-label">' + fieldLabel + '</h2>'
                    + fieldValue +
                '</div>'
            );
        }
    }

});

Handlebars.registerHelper('postcardMoreFields', function(surveyIndex, postIndex) {
    var fieldsArray = session.deployment.surveys[surveyIndex].fields,
        count = 0;

    for (var i=0; i < fieldsArray.length; i++) {
        if(fieldsArray[i].postcard)
        count++;
    }

    if (count > 0) {
        return new Handlebars.SafeString(
            '<div class="postcard-field"> \
                <p><a href="post-detail.html#' + postIndex + '">' + count + ' more fields...</a></p> \
            </div>'
        );
    }
});

Handlebars.registerHelper('taskIncompleteCount', function(options) {
    var tasksArray = this.tasks,
        count = 0;

    if (tasksArray !== undefined) {
        for (var i=0; i < tasksArray.length; i++) {
            if (!tasksArray[i].complete && !tasksArray[i].disabled)
            count++;
        }
    }

    if (count == 1) {
        return new Handlebars.SafeString(
            '<strong>' + count + '</strong> incomplete task'
        );
    } else {
        return new Handlebars.SafeString(
            '<strong>' + count + '</strong> incomplete tasks'
        );
    }
});

Handlebars.registerHelper('formField', function(options) {
    var fieldType = this.type,
        fieldLabel = this.label,
        fieldIcon = this.icon,
        fieldValue = this.value !== undefined ? this.value : '',
        fieldOptions = this.options,
        fieldRequired = this.required ? 'class="required"' : '';

    if (fieldType == 'text') {
        return new Handlebars.SafeString(
            '<div class="form-field"><label ' + fieldRequired + '>'+fieldLabel+'</label><input type="text" value="'+fieldValue+'" /></div>'
        );
    } else if (fieldType == 'textarea') {
        return new Handlebars.SafeString(
            '<div class="form-field"><label ' + fieldRequired + '>'+fieldLabel+'</label><textarea>'+Handlebars.helpers.striptags(fieldValue)+'</textarea></div>'
        );
    } else if (fieldType == 'select') {
        var optionElems = '';

        for (var i=0; i < fieldOptions.length; i++) {
            var attribute = fieldValue == i ? 'selected' : '';
            optionElems += '<option ' + attribute + '>' + fieldOptions[i].label + '</option>';
        }

        return new Handlebars.SafeString(
            '<div class="form-field"><label ' + fieldRequired + '>'+fieldLabel+'</label> \
                <div class="custom-select"> \
                    <select>' + optionElems + '</select> \
                </div> \
            </div>'
        );
    } else if (fieldType == 'checkboxes' || fieldType == 'radio') {
        var optionElems = '',
            fieldsetID = Math.floor(Math.random() * 20);

        for (var i=0; i < fieldOptions.length; i++) {
            var attribute = fieldValue == i ? 'checked' : '',
                nameAttr = fieldType == 'radio' ? 'name="form-field-radio-' + fieldsetID + '"' : '';

                optionElems += '<div class="form-field ' + fieldType + '"> \
                                <label for="form-field-' + fieldType + '-' + i + '" ' + fieldRequired + '>' + fieldOptions[i].label + '\
                                    <input type="' + fieldType + '" id="form-field-' + fieldType + '-' + fieldsetID + '-' + i + '" ' + nameAttr + ' ' + attribute + ' /> \
                                </label> \
                            </div>';
        }

        return new Handlebars.SafeString(
            '<fieldset> \
                <legend>' + fieldLabel + '</legend>'
                + optionElems +
            '</fieldset>'
        );
    } else if (fieldType == 'categories') {
        var optionElems = '',
            fieldsetID = Math.floor(Math.random() * 20);

        for (var i=0; i < fieldOptions.length; i++) {
            var arrayContains = function(needle) {
                // Per spec, the way to identify NaN is that it is not equal to itself
                var findNaN = needle !== needle;
                var indexOf;

                if(!findNaN && typeof Array.prototype.indexOf === 'function') {
                    indexOf = Array.prototype.indexOf;
                } else {
                    indexOf = function(needle) {
                        var i = -1, index = -1;

                        for(i = 0; i < this.length; i++) {
                            var item = this[i];

                            if((findNaN && item !== item) || item === needle) {
                                index = i;
                                break;
                            }
                        }

                        return index;
                    };
                }

                return indexOf.call(this, needle) > -1;
            };

            var attribute = arrayContains.call(fieldValue, i) ? 'checked' : '';

                optionElems += '<div class="form-field checkbox"> \
                                    <label for="form-field-category-' + i + '">' + session.deployment.categories[fieldOptions[i]].name + '\
                                        <input type="checkbox" id="form-field-category-' + i + '" ' + attribute + ' /> \
                                    </label> \
                                </div>';
        }

        return new Handlebars.SafeString(
            '<fieldset> \
                <legend>' + fieldLabel + '</legend>'
                + optionElems +
            '</fieldset>'
        );
    } else if (fieldType == 'time' || fieldType == 'date') {
        return new Handlebars.SafeString(
            '<div class="form-field ' + fieldType + '"> \
                <label ' + fieldRequired + '>'+fieldLabel+'</label> \
                <div class="input-with-icon"> \
                    <svg class="iconic" style="margin-right:4px;"> \
                        <use xlink:href="' + fieldIcon + '"></use> \
                    </svg> \
                    <input type="' + fieldType + '" value="'+fieldValue+'" /> \
                </div> \
            </div>'
        );
    } else if (fieldType == 'file') {
        return new Handlebars.SafeString(
            '<div class="form-field file"> \
                <label ' + fieldRequired + '>' + fieldLabel + '</label> \
                <figure> \
                    <img src="' + fieldValue + '" /> \
                    <div class="form-field file"> \
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
                <label ' + fieldRequired + '>' + fieldLabel + '</label> \
                <div class="location-wrapper"> \
                    <div id="map" data-post-index="' + 0 + '" class="map"></div> \
                    <form role="search" class="searchbar" data-message="search"> \
                        <div class="searchbar-input"> \
                            <div class="form-field"> \
                                <input type="search" maxlength="250" placeholder="Find a location" value="' + fieldValue + '" /> \
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
                </div> \
            </div>'
        );
    }
});

Handlebars.registerHelper('surveyFieldPreview', function() {
    var fieldName = this.name,
        fieldControl = this.control,
        fieldLabel = this.label,
        fieldOptions = this.options;

    if (fieldControl == 'text') {
        return new Handlebars.SafeString(
            '<input type="text" placeholder="' + fieldName + '" />'
        );
    } else if (fieldControl == 'textarea') {
        return new Handlebars.SafeString(
            '<textarea rows="3" disabled>' + fieldName + '</textarea>'
        );
    } else if (fieldControl == 'time' || fieldControl == 'date') {
        return new Handlebars.SafeString(
            '<div class="input-with-icon"> \
                <svg class="iconic"> \
                    <use xlink:href="' + this.icon + '"></use> \
                </svg> \
                <input type="' + fieldControl + '" placeholder="' + fieldName + '" disabled /> \
            </div>'
        );
    } else if (fieldControl == 'select') {
        var optionElems = '';

        for (var i=0; i < fieldOptions.length; i++) {
            optionElems += '<li>' + fieldOptions[i].label + '</li>';
        }

        return new Handlebars.SafeString(
            '<ol>'
                + optionElems +
            '</ol>'
        );
    } else if (fieldControl == 'checkbox' || fieldControl == 'radio') {
        var optionElems = '';

        for (var i=0; i < fieldOptions.length; i++) {
            optionElems += '<div class="form-field ' + fieldControl + '"> \
                                <label>' + fieldOptions[i].label + '\
                                    <input type="' + fieldControl + '" disabled /> \
                                </label> \
                            </div>';
        }

        return new Handlebars.SafeString(
            optionElems
        );
    } else if (fieldControl == 'categories') {
        var optionElems = '';

        for (var i=0; i < fieldOptions.length; i++) {
            optionElems += '<div class="form-field checkbox"> \
                                <label>' + session.deployment.categories[fieldOptions[i]].name + '\
                                    <input type="checkbox" disabled /> \
                                </label> \
                            </div>';
        }

        return new Handlebars.SafeString(
            optionElems
        );
    } else if (fieldControl == 'file') {
        return new Handlebars.SafeString(
            '<input type="file" id="photo" disabled /> \
            <label for="photo" class="button button-plain button-gamma"> \
                <svg class="iconic block"> \
                    <use xlink:href="' + this.icon + '"></use> \
                </svg> \
                <span class="button-label">' + fieldName + '</span> \
            </label>'
        );
    } else if (fieldControl == 'location') {
        return new Handlebars.SafeString(
            '<div class="location-wrapper"> \
                <div id="map" data-post-index="0" class="map"></div> \
                <div class="searchbar"> \
                    <div class="searchbar-input"> \
                        <div class="form-field"> \
                            <input type="search" maxlength="250" placeholder="' + fieldName + '" disabled /> \
                        </div> \
                    </div> \
                </div> \
            </div>'
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

hbLoadLayout = function(callback) {
    var currentURL = window.location.href.split('/').pop(),
        currentHash = window.location.hash.substr(1),
        currentTemplate = currentURL.split('#')[0].slice(0, -5),
        currentMode = currentTemplate.split(/-(.+)?/)[0];

    console.log('template: '+ currentTemplate + '; mode: '+ currentMode);

    // If the page is a "layout"...
    if (!currentTemplate == '') {
        session.mode = currentMode;

        $('body').html(Ushahidi.templates.layouts[currentTemplate](session));
    }

    callback();
}
