/*
 *  jQuery one click outside - v0.1.3
 *  get called if someone clicks outside
 *  https://github.com/christianvoigt/jquery-one-click-outside
 *
 *  Made by Christian Voigt
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

		var pluginName = "oneClickOutside",
		defaults = {
			callback: null,
			calledFromClickInsideHandler: false,
			exceptions: null
		};

		function Plugin ( element, options) {
				this.element = element;
				this._name = pluginName;
				this.options = $.extend( {}, defaults, options );
				this.init(options.calledFromClickInsideHandler);
		}

		$.extend(Plugin.prototype, {
				init: function (calledFromClickInsideHandler) {
					var that = this,
					outside = (calledFromClickInsideHandler)? false: true;
					this.$el = $(this.element);
					this.clickInsideHandler = function(){
						outside = false;
					};
					this.clickOutsideHandler = function(){
						if(outside){
							that.options.callback.apply(that.options.thisArg || this);
							that.destroy();
						}
						outside = true;
					};
					this.$el.on("click",this.clickInsideHandler);
					if(this.options.exceptions){
						$(this.options.exceptions).on("click", this.clickInsideHandler);
					}
					$(document).on("click",this.clickOutsideHandler);
				},
				destroy : function(){
					this.removeListeners();
					$.data(this.element, "plugin_" + pluginName, null);
				},
				removeListeners : function(){
					this.$el.off("click",this.clickInsideHandler);
					if(this.options.exceptions){
						$(this.options.exceptions).off("click", this.clickInsideHandler);
					}
					$(document).off("click",this.clickOutsideHandler);
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						var plugin = $.data( this, "plugin_" + pluginName );
						if (options !== null && typeof options === "object" && !plugin ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}else if(options === "off" && plugin){
							plugin.destroy();
						}
				});
				return this;
		};

})( jQuery, window, document );
