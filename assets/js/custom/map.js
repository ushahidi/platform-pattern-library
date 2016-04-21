popupActions = function() {
    /*
    $('.post-popup .toggle-js').click(function() {
        $(this).toggleClass('open');
        $(this).parent().siblings('.toggle-content').toggleClass('visible');
        $(this).parent().find('.toggle-content').toggleClass('visible');
    });

    $('.toggle-content-secondary ul li a').click(function() {
        $(this).closest('.toggle-content').removeClass('visible');
        $(this).parents('ul, li, .toggle-content').siblings('.toggle-js').removeClass('open');
    });
    */
    console.log('yp');
};

if ($('#map').length) {

    var map = L.map('map', {
        center: [30.267153, -97.743061],
        zoom: 5,
        scrollWheelZoom: false
    });

    map.zoomControl.setPosition('bottomleft');

    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

    var popup = L.popup()
    .setContent('<article class="postcard">
        <div class="post-band" style="background-color: #8D1919;"></div>
        <div class="postcard-body">
            <h1 class="postcard-title"><a href="">Overcrowding between 5th St. &amp; Salem Ave.</a></h1>
            <span class="postcard-metadata"><a href="" class="postcard-author"><img src="https://api.adorable.io/avatars/40/abott@adorable.io.png" class="avatar" />Jess Shorland</a>, 45 mins, via SMS</span>

            <div class="postcard-field">
                <img src="http://lorempixel.com/400/300/" class="postcard-image" />
            </div>
        </div>

        <span class="postcard-actions-trigger" data-toggle="dropdown-menu">
            <svg class="iconic">
              <use xlink:href="/assets/img/iconic-sprite.svg#chevron-bottom"></use>
            </svg>
        </span>
        <ul class="dropdown-menu">
            <li>
                <a href="">
                <svg class="iconic">
                    <use xlink:href="/assets/img/iconic-sprite.svg#grid-three-up"></use>
                </svg>
                <span class="label">Add to Collection</span>
                </a>
            </li>
            <li>
                <a href="">
                <svg class="iconic">
                    <use xlink:href="/assets/img/iconic-sprite.svg#share"></use>
                </svg>
                <span class="label">Share</span>
                </a>
            </li>
            <li>
                <a href="">
                <svg class="iconic">
                    <use xlink:href="/assets/img/iconic-sprite.svg#task"></use>
                </svg>
                <span class="label">Assign to ...</span>
                </a>
            </li>
            <li>
                <a href="">
                <svg class="iconic">
                    <use xlink:href="/assets/img/iconic-sprite.svg#trash"></use>
                </svg>
                <span class="label">Delete</span>
                </a>
            </li>
        </ul>
    </article>');

    var popupOptions =
        {
            'minWidth': '400',
            'maxWidth': '400',
            'className': 'pl-popup',
            'offset':  new L.Point(20, 15),
        };

    var customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<svg class="iconic map-marker-icon">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/iconic-sprite.svg#map-marker"></use>
    </svg>',
        iconSize: null,
        iconAnchor: null
    });

    var customIconAlt = L.divIcon({
        className: 'custom-map-marker',
        html: '<svg class="iconic map-marker-icon-alt">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/iconic-sprite.svg#map-marker"></use>
    </svg>',
        iconSize: null,
        iconAnchor: null
    });

    var marker = L.marker([30.267153, -97.743061], {
        icon: customIcon
    })
    .addTo(map)
    .bindPopup(popup);

    var marker = L.marker([36.072635, -79.791975], {
            icon: customIconAlt
    })
    .addTo(map)
    .bindPopup(popup)
    .on('click', markerClick);

    function markerClick(e) {
        popup
            .setLatLng(e.latlng)
            .openOn(map);
            console.log('pop');
    }
}
