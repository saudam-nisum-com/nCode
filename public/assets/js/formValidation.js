//#MODULE - FORM VALIDATION
//> Author      : Ramesh Polishetti & Shiva Audam
//> Create Date : Dec 11, 2015
//>
//> Description : Form validation module to validate any user form or user input or any set of inputs inside a container.
//> 
//>



// Initialize factory function or to define require module if require function is available 
// by requiring jquery as dependency.
// 

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

    // Query strings for input text type, input radio type, input checkbox type, select, textarea 
    var inputStr = "[data-val][type=text],[data-val][type=email],[data-val][type=url],[data-val][type=date], select[data-val], textarea[data-val]",
        radioStr = "[data-val][type=radio]",
        chkboxStr = "[data-val][type=checkbox]",
        exposePvt;
    // 
    //>#Actions:
    //> User actions which maps external plug-in method ids to inner private methods.
    //>
    //> ###*Usage*:
    //> var validationHandler = $("#signinForm").formvalidation(options) ;
    //> validationHandler.formvalidation("validate");
    //>
    //>
        
    var actions = {
        validate: function(formStack, formElement) {
            formStack.reset();
            glbObj.initiate(formStack);
            formStack.isValid = !(formStack.invalidFieldsArray.length);
            formElement.trigger("validated", formStack);
            return formElement;
        },
        clear:function(formStack){
          glbObj.clearErrors(formStack);
        }
    };
    var defaults = {
        showGenericError : false,
        validatorMap : {},
        errorMap : {},        
        submitCallback : function(){
        }
    };

    // Regular expressions for various type of validations
    var regex = {
        NUMERIC: /^[0-9+]*$/,
        ALPHABETS: /^[a-zA-Z]*$/,
        ALPHA_NUMERIC: /^[a-zA-Z0-9]*$/,
        ALPHA_NUMERIC_PERIOD: /^[a-zA-Z0-9\.]*$/,
        NON_NUMBER_FIRST: /^[A-Za-z][a-zA-Z0-9\.]*$/,
        US_ZIP_CODE: /^\d{5}(?:[-]\d{4})?$/,
        US_PHONE: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/,
        EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        US_CURRENCY: /^[$]?[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
        DATE: /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/
    };

    // Method to validate user inputs
    var vMethods = {

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
            return vMethods.regexMatch(value, regex.ALPHA_NUMERIC);
        },


        zipCode: function(value) {
            return vMethods.regexMatch(value, regex.US_ZIP_CODE);
        },


        email: function(value) {
            return vMethods.regexMatch(value, regex.EMAIL);
        },


        usCurrency: function(value) {
            return vMethods.regexMatch(value, regex.US_CURRENCY);
        },

        checkbox: function(value) {            
            return !!value;
        },

        radio: function(value) {
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
            return vMethods.regexMatch(value, regex.US_PHONE);
        },


        date: function(value) {
            return vMethods.regexMatch(value, regex.DATE);
        },

        alphabets: function(value) {
            return vMethods.regexMatch(value, regex.ALPHABETS);
        },

        alphaNumericPerid: function(value) {
            return vMethods.regexMatch(value, regex.ALPHA_NUMERIC_PERIOD);
        },

        nonNumberFirst: function(value) {
            return vMethods.regexMatch(value, regex.NON_NUMBER_FIRST);
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

    //###Method - init(config) method to initiate form validation
    // and if element is form, binds validation method to submit event. 
    // If it is other than form, initiates and exposes validate method on plugin.
    // 
    //
    //> parameters
    //>
    //+ *config* - this will be a plain object having configuration settings.    
    //>
    //    {
    //      "validatorMap": "validatorMap"
    //      "errorMap": "erroMap"    
    //    }
    //*validatorMap* is an object having required validators for each field mapping with 'data-val' attribute
    //*
    //*errorMap is an object which maps the validator name of each field to relevant messages.    
    //
    //> returns a root jquery object on which plugin is called
    //>
    //
    function init(config) {

        if (!this.length) {
            console.error("No element is found with given selector");
            return;
        }

        if (glbObj.isPlainObject(config)) {
            var config = glbObj.getAppConf(config, defaults);
            var formStack = new validateForm(this, config);
            var wrapperTag = formStack.formEl[0].tagName;

            if (wrapperTag === "FORM") {
                formStack.formEl.attr("novalidate", "novalidate");
                formStack.isForm = true;
                formStack.formEl.off("submit").on("submit", function(e) {
                    return glbObj.submitHandler(e, formStack)
                });
            }

            this.formStack = formStack;
        } else {
            if (typeof config === "string") {
                if (!this.formStack) {
                    console.info("Cannot call method '" + config + "' before instantiatiation.")
                    return;
                }
                var methodName = config;
                if (glbObj.isValidMethod(config, actions)) {
                    actions[methodName](this.formStack, this);
                } else {
                    console.info("Invalid method name on plugin");
                }
            } else {
                console.info("Invalid method type found")
            }
        }
        return this;
    }

    //###Method - validateForm(formObj, config) is a constructor to create formStack with instance specific settings
    //> parameters
    //>
    //+ *formObj* - Form element object or element on which plugin is initiated (jquery wrapped).    
    //>
    //>
    //+ *config* - Plugin configuration object.        
    //
    //> returns validateForm instance
    function validateForm(formObj, config) {

        this.isValid = true;
        this.config = config;
        this.formEl = formObj;
        var formTag = formObj[0].tagName;
        var that = this;

        if (formTag !== "INPUT" && formTag !== "SELECTION" && formTag !== "TEXTAREA") {
            //Track input, select, textarea fields
            this.formFields = glbObj.getFormFields(formObj, inputStr);
            //Track and include checkbox fields      
            var checkboxFields = glbObj.getFormFields(formObj, chkboxStr);
            //Track and include radio fields                  
            var radioFields = glbObj.getFormFields(formObj, radioStr);

            $.each(checkboxFields, function(i, checkboxField) {
                that.formFields.push(checkboxField);
            });
            
            $.each(radioFields, function(i, radioField) {
                that.formFields.push(radioField);
            });

        } else {
            this.formFields = formObj;
        }

        this.errorMap = config.errorMap;
        this.validatorMap = config.validatorMap;
        this.errorArray = [];
        this.invalidFieldsArray = [];
        //Resets validateForm instance
        this.reset = function() {
            this.invalidFieldsArray = [];
            this.isValid = true;
        }
    }

    var glbObj = {

        //###Method - isPlainObject(Obj) Checks whether given input is valid plain object.
        //> parameters
        //>
        //+ *Obj* - User input that may be string, array, object, number.        
        //>
        //> returns Jquery collection object of relevant input fields.

        isPlainObject: function(Obj) {
            return ((Obj === null) || Array.isArray(Obj) || typeof Obj == 'function') ? false : (typeof Obj == 'object');
        },


        //###Method - isValidMethod(key, obj) Checks whether given property is available in the given object.
        //> parameters
        //>
        //+ *key* - Property name to be checked.
        //+ *obj* - Object in which the property availablity to be checked.        
        //>
        //> returns Boolean, true if property is available , false if property is not available in given object.

        isValidMethod: function(key, obj) {
            return (key in obj);
        },


        //###Method - getAppConf(userConfig, defaults) returns merged configuration object
        //> parameters
        //>
        //+ *userConfig* - User provided object.
        //+ *defaults* - Default configuration object.        
        //>
        //> returns merged configuration object.

        getAppConf: function(userConfig, defaults) {
            return userConfig ? $.extend({}, defaults, userConfig) : defaults;
        },

        //###Method - getFormFields(formObj, queryString) returns input fields from a form or container with given query string.
        //> parameters
        //>
        //+ *formObj* - Form object or container object (Jquery wrapped).
        //+ *queryString* - string to identify type of form controls to retreive.        
        //>
        //> returns Jquery collection object of relevant input fields.
        getFormFields: function(formObj, queryString) {
            var formFields = formObj.find(queryString);
            if (formFields.length) {
                return formFields;
            } else {
                console.info("No input field is found.");
                return [];
            }
        },

        //###Method - validate(key, value, options) takes input value and validator and calls the relevant validation method.
        //> parameters
        //>
        //+ *key* - validator name.
        //+ *value* - input value.
        //+ *options* - optional value to be passed.    
        //>
        //> returns Boolean whether input field is valid or invalid after validation method is run.

        validate: function(key, value, options) {

            if (!key || !value) {
                return;
            }

            return vMethods[key].call(null, value, options);
        },

        //###Method - initiate(formStack) calls runValidation method to start validation.
        //> parameters
        //>
        //+ *formStack* - Instance of validateForm.    
        //>
        //> 
        initiate: function(formStack) {

            glbObj.clearErrors(formStack);
            formStack.invalidFieldsArray = glbObj.runValidation(formStack);

            if (formStack.invalidFieldsArray.length) {
                glbObj.showErrors(formStack);
            }
        },

        //###Method - submitHandler(e, formStack) is form submit event handler when we configure plugin to a form.
        //> parameters
        //>
        //+ *formStack* - Instance of validateForm.    
        //>
        //> returns Boolean whether form is valid or invalid after validation is completed

        submitHandler: function(e, formStack) {
            formStack.reset();
            glbObj.initiate(formStack);
            formStack.isValid = !(formStack.invalidFieldsArray.length);

            if (formStack.isValid && formStack.config.submitCallback) {
                formStack.config.submitCallback();
                return false;
            }

            return formStack.isValid;
        },

        //###Method - runValidation(formStack) do validation and creates invalid fields array and returns
        //> parameters
        //>
        //+ *formStack* - Instance of validateForm.    
        //>
        //> returns invalid fields array.

        runValidation: function(formStack) {

            var formFields = formStack.formFields,
              invalidFieldsArray = [];
            $.each(formFields, function(i, fieldObj) {
                var fieldLevelValidator = 0,
                  validator = $(fieldObj).data("val"),
                  rulesObj = formStack.validatorMap[validator],
                  failedValidations = [],
                  tagType = fieldObj.type,
                  userVal = $(fieldObj).val();

                if (tagType === "checkbox") {
                    userVal = $(fieldObj).prop("checked");
                }

                if (tagType === "radio") {
                    userVal = $('input[name=' + fieldObj.name + ']:checked').val();
                }

                for (var key in rulesObj) {
                    if (rulesObj.hasOwnProperty(key) && rulesObj[key]) {
                        var optionValue = rulesObj[key],
                          isValid = glbObj.validate(key, userVal, optionValue);
                        if (!isValid) {
                            failedValidations.push(key);
                            fieldLevelValidator++;
                        }
                    }
                }

                if (fieldLevelValidator) {
                    invalidFieldsArray.push({
                        fieldObj: $(fieldObj),
                        validator: validator,
                        failedValidations: failedValidations
                    });
                }
            });

            return invalidFieldsArray;
        },

        //###Method - showErrors(formStack) shows error messages and adds relevant error classes to top container and other input elements
        //> parameters
        //>
        //+ *formStack* - Instance of validateForm.    
        //>
        //>
        showErrors: function(formStack) {
            var invalidFieldsArray = formStack.invalidFieldsArray,
              fieldHandler,
              formElement = formStack.formEl,
              globalError,
              globalErrCt,
              formTag = formElement[0].tagName;

           if (formTag !== "INPUT" && formTag !== "SELECTION" && formTag !== "TEXTAREA") {
                formElement.addClass("invalid-form");
            }

            if (formStack.config.showGenericError) {
                globalError = formStack.errorMap.formGeneric;
                globalErrCt = formElement.find(".ux-error-generic");

                if (globalErrCt.length) {
                    globalErrCt.html(globalError);
                } else {
                    formElement.prepend("<div class='ux-error-generic'></div>");
                    $(".ux-error-generic").html(globalError);
                }
                $(".ux-error-generic").html(globalError);
            }

            $.each(invalidFieldsArray, function(index, field) {
                var fieldObj = field.fieldObj,
                  firstErrorKey = field.failedValidations[0],
                  validator = field.validator,
                  errorDescription = formStack.errorMap[validator][firstErrorKey],
                  errorContainer = fieldObj.closest(".row").find(".ux-error-class"),
                  parent = fieldObj.closest(".row");
                parent.addClass("ux-error-field");
                if (!formStack.config.showGenericError) {
                    if (errorContainer.length) {
                        errorContainer.html(errorDescription);
                    } else {
                        var parent = fieldObj.closest(".row").append("<div class='ux-error-class'></div>");
                        parent.find(".ux-error-class").html(errorDescription);
                    }
                }
            });
        },
        //###Method - clearErrors(formStack) clears error classes and make error message div empty.
        //> parameters
        //>
        //+ *formStack* - Instance of validateForm.    
        //>
        //>
        clearErrors: function(formStack) {
            var formElement = formStack.formEl;
            formElement.find(".ux-error-generic").empty();
            formElement.removeClass("invalid-form");
            formElement.find(".ux-error-class").empty();
            formElement.find('.ux-error-field').removeClass("ux-error-field");
            if (!formElement[0].tagName === "FORM") {
                formElement.closest(".row").removeClass("ux-error-field").find(".ux-error-class").empty();
            }
        }
    }

    // Adds plugin init method to Jquery prototype
    $.fn.formvalidation = init;
    if (typeof define === 'function' && define.amd) {
        if (window.exposePvt) {
          return {
              isPlainObject: glbObj.isPlainObject,
              isValidMethod: glbObj.isValidMethod,
              getAppConf: glbObj.getAppConf,
              getFormFields: glbObj.getInputTextFields,
              validateForm: validateForm,
              initiate: glbObj.initiate,
              submitHandler: glbObj.submitHandler,
              runValidation: glbObj.runValidation,
              showErrors: glbObj.showErrors,
              clearErrors: glbObj.clearErrors,
              init: init
          }
        } 
    }
}, window));