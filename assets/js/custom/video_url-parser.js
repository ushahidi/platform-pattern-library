function parseVideo (url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1) {
        var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
        var type = 'vimeo';
    }

    return {
        type: type,
        id: RegExp.$6
    };
}

function createVideo (url, width, height) {
    // Returns an iframe of the video with the specified URL.
    var videoObj = parseVideo(url);
    var $iframe = $('<iframe>', { width: width, height: height });

    $iframe.attr('frameborder', 0);

    if (videoObj.type == 'youtube') {
        $iframe.attr('src', '//www.youtube.com/embed/' + videoObj.id);
    } else if (videoObj.type == 'vimeo') {
        $iframe.attr('src', '//player.vimeo.com/video/' + videoObj.id);
    }

    return $iframe;
}

function getVideoThumbnail (url, cb) {
    // Obtains the video's thumbnail and passed it back to a callback function.
    var videoObj = parseVideo(url);
    if (videoObj.type == 'youtube') {
        cb('//img.youtube.com/vi/' + videoObj.id + '/maxresdefault.jpg');
    } else if (videoObj.type == 'vimeo') {
        // Requires jQuery
        $.get('http://vimeo.com/api/v2/video/' + videoObj.id + '.json', function(data) {
            cb(data[0].thumbnail_large);
        });
    }
}
