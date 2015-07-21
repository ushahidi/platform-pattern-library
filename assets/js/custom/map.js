popupActions = function() {
    $('.post-popup .toggle-js').click(function() {
        $(this).toggleClass('open');
        $(this).parent().siblings('.toggle-content').toggleClass('visible');
        $(this).parent().find('.toggle-content').toggleClass('visible');
    });

    $('.toggle-content-secondary ul li a').click(function() {
        $(this).closest('.toggle-content').removeClass('visible');
        $(this).parents('ul, li, .toggle-content').siblings('.toggle-js').removeClass('open');
    });
};

if ($('#map').length) {

    if ( $('.post-popup').hasClass('has-image') ) {
        $('.post-popup').parents('.leaflet-popup-content-wrapper').siblings('.leaflet-popup-tip-container').children('.leaflet-popup-tip').addClass('black-arrow');
    }

    var map = L.map('map', {
        center: [30.267153, -97.743061],
        zoom: 5,
        scrollWheelZoom: false
    });

    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

    var popup = '<div class="post-popup">
    <span class="meta-data"><span class="date">January 10, 2015</span>10AM, via SMS</span>
    <h3 class="gamma"><a href="">Unstable building due to explosion next to road</a></h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...
    </p>
    <div class="actions-inline">
        <button type="button" class="button-secondary plus toggle-js hide-when-small">
            <span>Options</span>
        </button>
    </div>
    <div class="toggle-content">
        <ul class="dropdown-menu list-unstyled" role="menu">
            <li>
                <button type="button" class="button-secondary edit">
                    <a href="#!">Edit</a>
                </button>
            </li>
            <li>
                <div class="custom-select">
    <select>
        <option>Add to Collection</option>
        <option>Collection #1</option>
        <option>Collection #2</option>
    </select>
</div>

            </li>
        </ul>
    </div>
</div>';

    var popupHasImage = '<div class="post-popup has-image">
    <span class="meta-data"><span class="date">January 10, 2015</span>10AM, via SMS</span>
    <h3 class="gamma"><a href="">Unstable building due to explosion next to road</a></h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...
    </p>
    <div class="actions-inline">
        <button type="button" class="button-secondary plus toggle-js hide-when-small">
            <span>Options</span>
        </button>
    </div>
    <div class="toggle-content">
        <ul class="dropdown-menu" role="menu">
            <li>
                <button type="button" class="button-secondary edit">
                    <a href="#!">Edit</a>
                </button>
            </li>
            <li>
                <div class="custom-select">
    <select>
        <option>Add to Collection</option>
        <option>Collection #1</option>
        <option>Collection #2</option>
    </select>
</div>

            </li>
        </ul>
    </div>
    <img src="https://photos.travelblog.org/Photos/11053/262872/f/2165432-Deserted-main-road-of-Quneitra-Syria-1.jpg">
</div>';

    var popupOptions =
        {
            'minWidth': '400',
            'maxWidth': '400',
            'className': 'pl-popup',
            'offset':  new L.Point(14, 15),
        };

    var customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><ellipse class="map-marker-shadow" cx="59.7" cy="178.7" rx="46.3" ry="14.6"/><path class="map-marker-icon" d="M101.9,18.4C90.3,6.8,76.3,1,60,1C43.6,1,29.7,6.8,18.1,18.4C6.4,30,0.6,44,0.6,60.4
        c0,10.7,2.5,20.4,7.6,29.1l48.4,87.8c0.7,1.2,1.8,1.9,3.3,1.9c1.5,0,2.6-0.6,3.3-1.9l48.4-87.8c5.1-9.1,7.6-18.8,7.6-29.1
        C119.4,44,113.6,30,101.9,18.4z M59.7,90.3c-16.2,0-29.3-13.1-29.3-29.3c0-16.2,13.1-29.3,29.3-29.3C75.9,31.7,89,44.8,89,61
        C89,77.2,75.9,90.3,59.7,90.3z"/></svg>',
        iconSize: null,
        iconAnchor: null
    });

    var marker = L.marker([30.267153, -97.743061], {
        icon: customIcon
    })
    .addTo(map)
    .bindPopup(popupHasImage, popupOptions)
    .on('popupopen', popupActions);

    var marker = L.marker([36.072635, -79.791975], {
            icon: customIcon
    })
    .addTo(map)
    .bindPopup(popup, popupOptions)
    .on('popupopen', popupActions);
}
