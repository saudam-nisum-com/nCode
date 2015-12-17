Handlebars.registerHelper('newLineSplit', function(plaintext) {
  var i, output = '',
  lines = plaintext.split(/\r\n|\r|\n/g);
  for (i = 0; i < lines.length; i++) {
      if(lines[i]) {
          output += '</br>' + lines[i];
      }
  }
  return new Handlebars.SafeString(output);
});

$(function(){

    var source = $("#common-template").html(), 
        categoriesSource = $("#categories-template").html(), 
        template = Handlebars.compile(source),
        categoriesTemplate = Handlebars.compile(categoriesSource),
        data = {  
        ResponsiveOverlay: {
            title:"Responsive Overlay",            
            parametersHeading:"Parameters",
            paramList:{
                configureHPosition : "true",
                configureVPosition:"true",
                xsResolutionMargin :"10",
                hideTitleBar:"false",
                forceDraggable:"false",
                draggable:"false",
                resizable:"false",
                modal:"true"
            },
            saCode : "$('#responsiveOverlay').click(function(event) {$('#customDialog').responsivedialog({});});",
            apiText:"$('#customDialog').responsivedialog({\nwidth: 600,\ntitle: 'Send Email!',\nhideTitleBar : false,\nhideTitle : false,\nhideCloseBtn : false,\nclickOutside: true\n});",
            exampleHeading:"Example",        
            buttonText :"Start Overlay",
            apiId:"ResponsiveOverlay",
            buttonId : "responsive",
            buttonClass:"showApi",
            formValidationContainerId:"responsiveContainer",
        },       
        FormValidation:{
            title:"Form Validation",            
            parametersHeading:"Parameters",
            paramList:{
                validatorMap : "validatorMap",
                errorMap:"errorMap",
                showGenericError :"false"
            },
            saCode  :"var emailFormHandler=  $('#emailForm').formvalidation({validatorMap: validatorMap,errorMap: errorMap,showGenericError : false});",
            exampleHeading : "Example",            
            apiText : "var validatorMap = {\n\tuserName: {\nrequired: true,\nminCharacters: 6,\nmaxCharacters: 16,\nalphaNumericPerid: true\n}\n};\nvar errorMap = {\n'formGeneric': 'Please check all the highlighted fields.',\n'emailTo' : {\n'required' : 'To is a required field.'\n}\n};",
            buttonText :"Form Validation",           
            buttonClass:"showApi",
            selectedApiContainer:"formValidationContainer",
            apiId:"FormValidation",
            formValidationContainerId:"formValidationContainer",
            containerClass:"FormValidation"
        },
        AddToBag:{
            title:"Add To Bag",            
            parametersHeading:"Parameters",
            paramList:{
                categoryId : "53630",
                upcId:"1",
                source :"PDPA2B",
                bagContents: 1310,
                url: "/bag/add"
            },
            saCode  :"var atbHandler = new AtbController(options);",
            exampleHeading : "Example",            
            apiText : "var options = {\ncategoryId : 53630,\n'upcId['10855']':1,\nsource:'PDPA2B',\nbagContents: 1310,\nurl: '/bag/add'\n};",
            initCommand:"atbHandler.send();",
            buttonText :"Add To Bag",           
            buttonClass:"showApi",
            selectedApiContainer:"formValidationContainer",
            apiId:"AddToBag",
            formValidationContainerId:"addToBagContainer",
            containerClass:"FormValidation",
            buttonId : "addToBag"
        }         
    },
    validatorMap = {
          emailTo: {
            required: true      
          },
          emailFrom: {
            required: true      
          },
          message: {
            required: true
          },
          userName: {
            required: true,       
            alphaNumericPerid: true
          },
          userEmail: {
            required: true,       
            alphaNumericPerid: true
          },
          location: {
            required: true
          },
          address: {
            required: true
          },
          passport: {
            checkbox: true
          },
          gender : {
            radio : true
          }
        },

        errorMap = {
          "formGeneric": "Please check all the highlighted fields.",
          "emailTo" : {
            "required" : "To is a required field."     
          },
          "emailFrom" :{
            "required" : "From is a required field."      
          },
           "message" :{
            "required" : "Message is a required field."
          },
          "userName" : {
            "required" : "User Name is a required field.",
            "minCharacters" : "this is required field - min characters",
            "maxCharacters" : "this is invalid - max character",
            "alphaNumericPerid" :" this is invalid - alphanumber"
          },
          "userEmail" :{
            "required" : "Email is a required field.",
            "minCharacters" : "this is required field - min characters",
            "maxCharacters" : "this is invalid - max character",
            "alphaNumericPerid" :" this is invalid - alphanumber"
          },
           "location" :{
            "required" : "Location is a required field.",
            "minCharacters" : "this is required field - min characters",
            "maxCharacters" : "this is invalid - max character",
            "alphaNumericPerid" :" this is invalid - alphanumber"
          },

           "address" :{
            "required" : "Address is a required field.",
            "minCharacters" : "this is required field - min characters",
            "maxCharacters" : "this is invalid - max character",
            "alphaNumericPerid" :" this is invalid - alphanumber"
          },

          "passport" :{
            "checkbox" : "passport is a required field.",
          },

          "gender" :{
            "radio" : "Gender is a required field.",
          }
        };

        $('.list-group').append(categoriesTemplate(data));

        $(".list-group-item:first").addClass("active");

        $(".well").html(template(data['ResponsiveOverlay']));

        $(".list-group-item").on("click",function(event) {
          
            $("a").removeClass("active");   

            $(this).addClass("active");   

            var element = $(this).attr('data-id'); 

            $(".well").html(template(data[element])); 

            console.log($("#userSignin").length);
           
            var containerId = element+"ContainerData";
           
            $("."+element).html($("."+containerId).html()).show();

            var signInFormHandler=  $("#userSignin").formvalidation({
              validatorMap: validatorMap,
              errorMap: errorMap,  
              showGenericError : false
            });

        });
        $(".container").on("click","#responsive",function(event) {  
            $("#customDialog").responsivedialog({
              width: 600,
              title: "Send Email!",
              hideTitleBar : false,
              hideTitle : false,
              hideCloseBtn : false,
              clickOutside: true,
              close:function(){
                emailFormHandler.formvalidation("clear");
              }
            });
        });  

        var emailFormHandler=  $("#emailForm").formvalidation({
          validatorMap: validatorMap,
          errorMap: errorMap,  
          showGenericError : false
        });

        $("#emailSubmit").click(function(){
          emailFormHandler.formvalidation("validate");
        });

        var options = {
            categoryId : 53630,
            'upcId["10855"]':1,
            source:'PDPA2B',
            bagContents: 1310,
            // trackingCategory: 'onsite_search',
            // prodSelectionInfo: "cmexplore=-_--_-| | eGift:A | 0003-B | PROS OnOff:Control | C2G_NoTSPP | GROUPGIFT:A | 0003-B | CleanPDP:BAU:15K | HL_P_A | C2G_NoSF-_--_--_--_--_--_--_--_--_--_--_--_--_-MEMBER-_-store_only_product-_--_--_--_--_--_--_--_--_--_-1310-_--_--_-PDP Colorized-_-0-_-0&&PseudoCat=onsite_search&PseudoProdID=1310&BagDate=12/7/2015&breadCrumbCategory=Fine China",
            url: "/bag/add"                 
        };

        var atbHandler = new AtbController(options);
        $('.container').on("click","#addToBag",function(e){           
          e.preventDefault();
          atbHandler.send();                
        });


})




