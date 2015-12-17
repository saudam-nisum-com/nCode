//#MODULE - RESPONSIVE-DIALOG
//> Author      : Ramesh Polishetti
//> Create Date : Dec 03, 2015
//>
//>
//>
//>
//>
//>
//>
//>
//> Description : Creates a resposive dialog by extending jquery ui dialog.
//> 
//> 


//
//
//
//

// Initialize factory function or to define require module if require function is available 
// by requiring jquery and dialog as dependents.

;(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'dialog'], factory);
  } else {
// Refer global jQuery object if require function is not available
    factory(jQuery);
  }
// Factory function signature
}(function($) {

// Check if dialog constructor is available
  if ($.fn.dialog) {
    $.widget("ux.responsivedialog", $.ui.dialog, {
//#Default options passed to widget. 
//
//> Options :
//>
//+ *configureHPosition* : *Boolean* - 'true' enables widget to position overlay horizontally centered. 'false' makes the overlay to get positioned as per position values given.
//+ *configureVPosition* : *Boolean* - 'true' enables widget to position overlay Vertically centered. 'false' makes the overlay to get positioned as per position values given.
//+ *xsResolutionMargin* : *Number* - If the value is available, if the viewport resolution is lessthan the width of the widget, margin right and margin left are applied with given value.
//+ *forceDraggable* : *Boolean* - With 'true' ,the overlay will be draggable. With 'false' the overlay will not be draggable.
//
//
      options: {
        configureHPosition: true,
        configureVPosition: true,
        xsResolutionMargin: 10,
        hideTitleBar : false,
        forceDraggable: false,
        draggable: false,
        resizable : false,
        modal: true
      },
//

//#Create : Private method works as constructor when intialized. By this time, this.options and this.element are available.
      
      _create: function() {
        
        this.options.dialogClass = this.options.dialogClass + " responsive-overlay";

        // Make widget component draggable false by default.
        if (!this.options.forceDraggable) {
          this.options.draggable = false;
        }
        
        if(this.options.hideTitle){
          this.options.dialogClass= this.options.dialogClass+" no-title";
        }

        if(this.options.hideCloseBtn){
          this.options.dialogClass= this.options.dialogClass+" no-close-btn";
        }

        if(this.options.hideTitleBar || (this.options.hideTitle && this.options.hideCloseBtn )){
          this.options.dialogClass= this.options.dialogClass+" no-titlebar";
        }

        // Calls Dialog(Parent constructor) create method
        this._super();
      },


//#Size : Private method. Called when instance open method is called which resizes the component.

      _size: function() {
        // If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
        // divs will both have width and height set, so we need to reset them
        var nonContentHeight, minContentHeight, maxContentHeight,
          options = this.options,
          widgetWidth = this.options.width;
        // Reset content sizing
        this.element.show().css({
          width: "auto",
          minHeight: 0,
          maxHeight: "none",
          height: 0
        });

        if (options.minWidth) {
          this.uiDialog.css({
            minWidth: options.minWidth           
          });
        }

        // reset wrapper sizing
        nonContentHeight = this.uiDialog.css({
          height: "auto",
          // To make dialog responsive
          width: "98%",
          maxWidth: options.width
        }).outerHeight();

        minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
        maxContentHeight = typeof options.maxHeight === "number" ?
          Math.max(0, options.maxHeight - nonContentHeight) :
          "none";

        if (options.height === "auto") {
          this.element.css({
            minHeight: minContentHeight,
            maxHeight: maxContentHeight,
            height: "auto"
          });
        } else {
          this.element.height(Math.max(0, options.height - nonContentHeight));
        }

        if (this.uiDialog.is(":data(ui-resizable)")) {
          this.uiDialog.resizable("option", "minHeight", this._minHeight());
        }

        // Make sure margin is available if viewport resolutions less than widget width (Default margin 10px)
        if (options.xsResolutionMargin) {
          var docWidth, widgetHBorderPaddintSpace, reqWidth, percentage;

          docWidth = $(document).width();
          // Get horizontal padding and border space.
          widgetHBorderPaddintSpace = this.uiDialog.outerWidth() - this.uiDialog.width();

          // For small resolutions
          if (docWidth <= widgetWidth) {
            reqWidth = docWidth - (2 * options.xsResolutionMargin) - parseInt(widgetHBorderPaddintSpace, 10);
            percentage = parseInt((reqWidth / docWidth) * 100, 10);

            this.uiDialog.css({
              "width": percentage + "%"
            });
          }
        }
      },

//#Position : Private method. Called when instance open method is called which resizes the component.

      _position: function() {
        var options = this.options;
        var isVisible = this.uiDialog.is(":visible");

        if (!isVisible) {
          this.uiDialog.show();
        }

        if (options.configureVPosition) {
          this.uiDialog.css({
            top: "50%",
            transform: "translate(0,-50%)"
          });
        }

        if (options.configureHPosition) {
          this.uiDialog.css({
            left: "50%",
            transform: "translate(-50%,0)"
          });
        }

        if (options.configureVPosition && options.configureHPosition) {
          this.uiDialog.css({
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          });
        }

        if (!isVisible) {
          this.uiDialog.hide();
        }
      }
    });
  }
}));