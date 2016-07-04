var popupHTML = function () {
    var html = null;
    $.ajax({
        'async': false,
        'dataType': 'html',
        'url': '../partials/_postcard.html',
        'success': function (data) {
            html = data;
        }
    });
    return html;
}();

if ($('#map').length) {

    //## Map configuration
    var map = L.map('map', {
        scrollWheelZoom: false
    });

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    	maxZoom: 19,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //## Popup configuration
    var popup = L.popup({
        'minWidth': '300',
        'maxWidth': '300',
        'className': 'pl-popup',
        'offset':  L.Point(0, 0)
    }).setContent(popupHTML);

    //## Marker configuration
    var deploymentGeoJSON = [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-97.763559, 30.253552]
            },
            properties: {
                color: 'A51A1A'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-97.674815, 30.316855]
            },
            properties: {
                color: 'A51A1A'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-97.693820, 30.301458]
            },
            properties: {
                color: '2274B4'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-97.740388, 30.266052]
            },
            properties: {
                color: 'E69327'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-97.7471837, 30.3016706]
            },
            properties: {
                color: '5BAA00'
            }
        }
    ];

    //## Icon configuration
    function pointIcon(feature, size, className){
        return L.divIcon({
            className: 'custom-map-marker '+className,
            html: '<svg class="iconic" style="fill:#'+feature.properties.color+';"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../img/iconic-sprite.svg#map-marker"></use></svg><span class="iconic-bg" style="background-color:#'+feature.properties.color+';""></span>',
            iconSize: size,
            iconAnchor: [size[0]/2, size[1]],
            popupAnchor: [0, 0 - size[1]]
        });
    }

    var markers = new L.geoJson(deploymentGeoJSON, {
        pointToLayer: function (feature, latlng) {

            return L.marker(latlng, {
                icon: pointIcon(feature, [32, 32])
            });
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    function onEachFeature(feature, layer) {
        layer.bindPopup(popup)
            .on('click', function(e){
                layer.setIcon(pointIcon(feature, [40, 40], 'selected'));

                map.on('popupclose', function(e) {
                    layer.setIcon(pointIcon(feature, [32, 32]));
                });
            });
    }

    map.zoomControl.setPosition('bottomright');

    map.fitBounds(markers.getBounds(), [24,24]);

    map.on('popupopen', function (e) {
        toggleInit($(e.popup._contentNode.firstChild).find('[data-toggle]'));
    });
}
