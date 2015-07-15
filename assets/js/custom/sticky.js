$(function() {

    var $content, $sideBar, $window, sideBarTopOffset, stickySideBar;

    $window = $(window);

    $sideBar = $('.fixed-sidebar-content');

    $content = $('.main-col');

    sideBarTopOffset = $sideBar.offset().top;

    stickySideBar = function() {
      if ($window.width() > 767) { // IF: Screen width is greater than 767px
          var windowTop,
              windowFoot;
          windowTop = $window.scrollTop();
          windowFoot = windowTop + ($sideBar.innerHeight() + 68);

          if ((sideBarTopOffset < (windowTop - 35)) && ($sideBar.innerHeight() < ($window.height() - 68))) { // IF: Sidebar is vertically positioned behind the toolbar
            $sideBar.css({
              position: 'fixed',
              left: $sideBar.offset().left,
              width: $sideBar.css('width')
            });

            if (windowFoot >= $('[role="contentinfo"]').offset().top) { // IF: Footer is vertically positioned behind the sidebar
                return $sideBar.css({
                  top: 'auto',
                  bottom: 175,
                });
            } else { // ELSE: Footer is vertically positioned below the sidebar
                return $sideBar.css({
                  top: 68,
                  bottom: 'auto',
                });
            }
          } else { // ELSE: Sidebar is vertically positioned below the toolbar
            return $sideBar.removeAttr('style');
          }
        }
    };

    $window.scroll(function() {
      return stickySideBar();
    });

    $window.on('resize', function() {
      return stickySideBar();
    });

});
