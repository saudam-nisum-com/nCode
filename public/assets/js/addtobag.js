//#MODULE - ADDTOBAG
//> Author      : Gangadhar Vuyyuru & Ramesh Polishetti
//> Create Date : Dec 11, 2015
//>
//> Description : API which enables add to bag feature.
//> 
//>



// Initialize factory function or to define require module if require function is available 
// by requiring jquery as dependency.
// 

;(function(factory, window) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
    // Refer global jQuery object if require function is not available
        factory(jQuery);
    }
    // Factory function signature
}(function($) {

    // Default ajax configuration object
    var defaults = {
        async: true,
        type: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json"
    };

    //###Method - isPlainObject(Obj) Checks whether given input is valid plain object.
    //> parameters
    //>
    //+ *Obj* - User input that may be string, array, object, number.        
    //>
    //> returns Jquery collection object of relevant input fields.
    //>    
    function isPlainObject(Obj) {
        return ((Obj === null) || Array.isArray(Obj) || typeof Obj == 'function') ? false : (typeof Obj == 'object');
    }

    //

    //###Method - AtbController : Constructor which wraps all add-to-bag utility functions along with send method.
    //> parameters
    //>
    //+ *options* - Configuration object provided by user.        
    //>
    //> returns AtbController instance.

    function AtbController(options) {

        // Merges user provided configuration object with default configuration object.
        if (isPlainObject(options)) {
            this.options = $.extend({}, defaults, options);
        } else {
            console.info("Please provide valid configuration object");
            return;
        }

    //###Method - send (options) instance method which initialize ajax call
    //> parameters
    //>
    //+ *options* - Configuration object provided by user.        
    //>
    //> returns ajax promise object.

        this.send = function(options) {
            if (isPlainObject(options)) {
                this.options = $.extend({}, this.options, options);
            }
            return $.ajax(this.options);
        }

    //###Method - setOptions (options) instance method which sets additional options to send with ajax method.
    //> parameters
    //>
    //+ *options* - Configuration object provided by user.        
    //>
    //> 

        this.setOptions = function(options) {
            if (isPlainObject(options)) {
                for (var key in options) {
                    this.options[key] = options[key];
                }
            }
        }

    //###Method - setHeaders (options) instance method which sets headers to send with request.
    //> parameters
    //>
    //+ *options* - Headers object provided by user.        
    //>
    //> 
        this.setHeaders = function(options) {
            if (isPlainObject(options)) {
                this.options.headers = this.options.headers || {};
                for (var key in options) {
                    this.options.headers[key] = options[key];
                }
            }
        }

    //###Method - setHeaders ([key]) instance method which returns ajax options property value for the given key.
    //> If key is not provided full options object is returned
    //> parameters
    //>
    //+ *key* - Key is property name provided by user for which property value is required.        
    //>
    //> returns property value for the given property name or full options object if key is not provided.

        this.getOptions = function(key) {
            if (typeof key === "string") {
                return this.options[options];
            } else {
                return this.options;
            }
        }
    }

    if (typeof define === 'function' && define.amd) {
        return AtbController;
    } else {
        window.AtbController = AtbController;
    }
}, window));