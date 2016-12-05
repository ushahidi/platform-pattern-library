$('.map').each(function() {
    var deploymentGeoJSON = $(this)[0].hasAttribute('data-post-index') ? session.deployment.posts[$(this).attr('data-post-index')] : session.deployment.posts;

    //## Map configuration
    var map = L.map(this, {
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
    });

    //## Icon configuration
    function pointIcon(feature){
        return L.ushMapIcon({
            color: session.deployment.surveys[feature.properties.survey].color,
        });
    }

    var markers = new L.geoJson(deploymentGeoJSON, {
        pointToLayer: function (feature, latlng) {

            return L.marker(latlng, {
                icon: pointIcon(feature)
            });
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    function onEachFeature(feature, layer) {
        // IF: Map has more than one marker
        if (Array.isArray(deploymentGeoJSON)) {
            layer.bindPopup(popup)
                .on('click', function(e){
                    var postcard = e.target.getPopup();

                    postcard.setContent(Handlebars.partials["Postcard"](feature)).update();
                    toggleInit($(postcard._container).find('[data-toggle]')); // Initialize toggle for postcard's actions
    /*
                    layer.setIcon(pointIcon(feature, [40, 40], 'selected'));

                    map.on('popupclose', function(e) {
                        layer.setIcon(pointIcon(feature, [32, 32]));
                    });
    */
                });
        }
    }

    map.zoomControl.setPosition('bottomleft');

    map.fitBounds(markers.getBounds(), [24,24]);

    map.on('popupopen', function (e) {
        toggleInit($(e.popup._contentNode.firstChild).find('[data-toggle]'));
    });
});
