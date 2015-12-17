
var validation = (function($){

 var keys,
        methods,
        validate,
        addMethod;

    keys = {
        NUMERIC: /^[0-9+]*$/,
        ALPHABETS : /^[a-zA-Z]*$/,
        ALPHA_NUMERIC: /^[a-zA-Z0-9]*$/,
        ALPHA_NUMERIC_PERIOD: /^[a-zA-Z0-9\.]*$/,
        NON_NUMBER_FIRST : /^[A-Za-z][a-zA-Z0-9\.]*$/,
        US_ZIP_CODE: /^\d{5}(?:[-]\d{4})?$/,
        US_PHONE: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/,
        EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        US_CURRENCY: /^[$]?[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
        DATE: /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/
    };

    methods = {
       
        required: function(value) {

            if (value) {
                if (typeof value === "string") {
                    return value.trim().length > 0;
                } else {
                    for (var prop in value) {
                        if (value.hasOwnProperty(prop)) {
                            return true;
                        }
                    }
                    return false;
                }
            }

            return false;
        },

    
        numeric: function(value) {

            if (!value) {
                return;
            }

            return !isNaN(value);
        },

      
        alphaNumeric: function(value) {
            return methods.regexMatch(value, keys.ALPHA_NUMERIC);
        },

     
        zipCode: function(value) {
            return methods.regexMatch(value, keys.US_ZIP_CODE);
        },

     
        email: function(value) {
            return methods.regexMatch(value, keys.EMAIL);
        },

      
        usCurrency: function(value) {
            return methods.regexMatch(value, keys.US_CURRENCY);
        },

        checkbox: function(value){
            console.log(value)
            return !!value;
        },

        radio : function(value){
             if (value) {                
                return value.trim().length > 0;
            }
        },
     
        minCharacters: function(value, length) {
            if (typeof length === 'string') {
                length = Number(length);
            }

            if (isNaN(length) || !value) {
                return;
            }

            return (value.length >= length);
        },

     
        maxCharacters: function(value, length) {
            if (typeof length === 'string') {
                length = Number(length);
            }

            if (isNaN(length) || !value) {
                return;
            }

            return (value.length <= length);
        },

     
        usPhone: function(value) {
            return methods.regexMatch(value, keys.US_PHONE);
        },

    
        date: function(value) {
            return methods.regexMatch(value, keys.DATE);
        },
        
        alphabets : function( value ){            
            return methods.regexMatch(value, keys.ALPHABETS);
        },
        alphaNumericPerid : function( value ){
            return methods.regexMatch(value, keys.ALPHA_NUMERIC_PERIOD);  
        },

        nonNumberFirst : function( value ){
            return methods.regexMatch(value, keys.NON_NUMBER_FIRST);          
        },

       
        regexMatch: function(value, regex) {
            if (typeof regex === 'string') {
                regex = new RegExp(regex);
            }

            if (!(regex instanceof RegExp) || !value) {
                return;
            }

            return regex.test(value);
        }
    };

   
    validate = function(key, value, options) {

        if (!key || !value) {
            return;
        }

        return methods[key].call(this, value, options);
    };

   
    addMethod = function(methodName, methodFunction) {
        if (!methodName || typeof methodName !== 'string' || !methodFunction || typeof methodFunction !== 'function' || methods[methodName] !== undefined) {
            return;
        }

        methods[methodName] = methodFunction;
    };

    return {
        validate: validate,
        addMethod: addMethod,
        isNotEmpty: methods.required,
        isValidNumber: methods.numeric,
        isValidAlphaNumeric: methods.alphaNumeric,
        isValidZipCode: methods.zipCode,
        isValidEmail: methods.email,
        isValidUsCurrency: methods.usCurrency,
        hasMinChars: methods.minCharacters,
        hasMaxChars: methods.maxCharacters,
        isValidUsPhone: methods.usPhone,
        isValidDate: methods.date,
        regexMatch: methods.regexMatch,
       
    };






}(jQuery));


