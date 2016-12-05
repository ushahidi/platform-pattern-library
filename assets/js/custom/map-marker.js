/*
 * @class DivIcon
 * @aka L.DivIcon
 * @inherits Icon
 *
 * Represents a lightweight icon for markers that uses a simple `<div>`
 * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
 *
 * @example
 * ```js
 * var myIcon = L.divIcon({className: 'my-div-icon'});
 * // you can set .my-div-icon styles in CSS
 *
 * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
 * ```
 *
 * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
 */

var defaultColor = '#959595';
var iconicSprite = '../../img/iconic-sprite.svg';

L.UshMapIcon = L.Icon.extend({
    options: {
        // @section
        // @aka DivIcon options
        iconSize: [32, 32], // also can be set through CSS

        iconAnchor: [16, 32],
        popupAnchor: [0, -32], // @todo should probably be [0, 16]

        // @option html: String = ''
        // Custom HTML code to put inside the div element, empty by default.
        html: '<svg class="iconic" style="fill:#{color};"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{iconicSprite}#map-marker"></use></svg><span class="iconic-bg" style="background-color:#{color};""></span>',

        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,

        className: 'ush-map-marker',

        color: defaultColor
    },

    initialize: function (options) {
        if (!options.iconAnchor && options.size) {
            options.iconAnchor = [options.size[0] / 2, options.size[1]];
        }
        if (!options.popupAnchor && options.size) {
            options.popupAnchor = [0, 0 - options.size[1]]; // @todo this is probalby wrong
        }

        L.setOptions(this, options);
    },

    createIcon: function (oldIcon) {
        var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
            options = this.options;

        var templateVars = {
            color: (options.color && /^[a-zA-Z0-9#]+$/.test(options.color)) ? options.color : defaultColor,
            iconicSprite: iconicSprite
        };

        div.innerHTML = options.html !== false ? L.Util.template(options.html, templateVars) : '';

        if (options.bgPos) {
            var bgPos = L.point(options.bgPos);
            div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
        }
        this._setIconStyles(div, 'icon');

        return div;
    },

    createShadow: function () {
        var div = document.createElement('div');
        // Alternately inject entire icon into shadow too
        //var div = this.createIcon();
        this._setIconStyles(div, 'shadow');
        return div;
    }
});

// @factory L.divIcon(options: DivIcon options)
// Creates a `DivIcon` instance with the given options.
L.ushMapIcon = function (options) {
    return new L.UshMapIcon(options);
};
