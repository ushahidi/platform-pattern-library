$(document).ready(function(exports) {
  var themeChanger = {
    settings: {
      body: $('.layout-a'),
      buttons: $('.color-switchers .form-field > button')
    },

    init: function () {
      var _self = this;
      this.settings.buttons.on('click', function () {
          console.log('test');
        var $node = $(this),
            theme = $node.data('theme');
        _self.settings.body.removeClass().addClass('layout-a ' + theme);
        _self.settings.buttons.removeAttr('disabled');
        $node.attr('disabled', true);
      });
    }
  };

  themeChanger.init();
}(window));
