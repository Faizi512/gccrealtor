import $ from "jquery"
import "./parsley"

$(document).ready(function() {


  const formValidation = {};
  var areaCode;
  var countryCode1;
  var isPhone = false;
  var isEmail = false;

  function validatePhone(countryCode = "GB", callingCode = "44"){
    if (document.querySelector("#phone_code")){
      document.querySelector("#phone_code").value = callingCode
    }

    window.Parsley.addValidator('validphone', {
      validateString: function(value){
        var xhr = $.ajax(`https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/mobile?value=${areaCode}${value}&key=7b32461b4afd7912a0669d5cf2369d50&countryCode=${countryCode1}`)
        return xhr.then(function(json) {
          debugger
          var skipresponse = ["EC_ABSENT_SUBSCRIBER", "EC_ABSENT_SUBSCRIBER_SM", "EC_CALL_BARRED", "EC_SYSTEM_FAILURE","EC_SM_DF_memoryCapacityExceeded", "EC_NO_RESPONSE", "EC_NNR_noTranslationForThisSpecificAddress", "EC_NNR_MTPfailure", "EC_NNR_networkCongestion"]
          if (skipresponse.includes(json.response) && json.status == "Valid" ) {
            isPhone = true
            return true
          }
          else if (json.status == "Valid") {
            isPhone = true
            return true
          }else if(json.status == "Invalid"){
            return $.Deferred().reject(`Please Enter Valid ${countryCode} Phone Number`);
          }else if(json.status == "Error"){
            isPhone = true
            return true
          }else{
            isPhone = true
            return true
          }
        }).catch(function(e) {
          if (e == `Please Enter Valid ${countryCode} Phone Number`) {
            return $.Deferred().reject(`Please Enter Valid Phone Number`)
          }else{
            isPhone = true
            $(".global-phone-success").addClass("d-inline-block")
            return true
          }
        });
      }
    });
  }

  
  

  function geoDetection(){
    var requestUrl = "https://api.ipdata.co?api-key=3aae92264fcf46077f53ca99e8649a8bedb83a047e3fa7ab639885b3";
    $.ajax({
      url: requestUrl,
      type: 'GET',
      success: function(data){
        var inputs = document.querySelectorAll(".phonecode");
        inputs.forEach( (input) => {
          intlTelInput(input, { initialCountry: data.country_code, allowDropdown: true, separateDialCode: false});
        })
        areaCode = data.calling_code
        $("#phonecode").val(data.calling_code)
        countryCode1 = data.country_code
        validatePhone(data.country_code, data.calling_code)
      
      },
      error: function(err){
        console.log("Visitor Details Request failed, error= " + JSON.stringify(err));
      }
    });
  }

  function validate(){
    formValidation = $('#submit_form').parsley({
      trigger: "focusout",
      errorClass: 'error',
      successClass: 'valid',
      errorsWrapper: '<div class="parsley-error-list"></div>',
      errorTemplate: '<label class="error"></label>',
      errorsContainer (field) {
        if(field.$element.hasClass('approve')){
          return $('.error-checkbox')
        }
        if(field.$element.hasClass('phone')){
          return $('.phoneerror')
        }
        return field.$element.parent()
      },
    })
    validatePhone()
    validateEmail()
    // validateApiPostcode()
  }


  function validateEmail(){
    window.Parsley.addValidator('validemail', {
      validateString: function(value){
        var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/email?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.email').val());
        return xhr.then(function(json) {
          if (json.status == "Valid") {
            isEmail = true;
            return true
          }else if(json.status == "Invalid"){
            return $.Deferred().reject("Please Enter Valid Email Address");
          }else{
            isEmail = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid Email Address") {
            return $.Deferred().reject("Please Enter Valid Email Address")
          }else{
            isEmail = true
            return true
          }
        });
      },
    });
  }

  $( "#btn-submit" ).click(function() {
    
    if(($('.error').length === 0 ) && isEmail && isPhone)
    {  $('#btn-submit').prop('disabled', true);
      gtag_report_conversion()
    }
      
    
  });

  // phoneInputField.addEventListener("countrychange", function() {
  // $('#dealform').parsley().validate()
  // });
  geoDetection();

  validate();

  

});