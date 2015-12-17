;(function(factory, window) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            factory($, window);
        });
    } else {
    // Refer global jQuery object if require function is not available
      factory(jQuery, window);
    }

// Factory function signature
}(function($) {

	alert("test");
}, window));