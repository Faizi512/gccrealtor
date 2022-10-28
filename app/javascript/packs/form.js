import "./parsley"
require('jquery')


$( document ).ready(function() {

  
  function validateApiPostcode(){
    window.Parsley.addValidator('validapipostcode', {
      validateString: function(value){
        return $.ajax({
          url:`https://api.getAddress.io/find/${$(".postcode").val()}?api-key=NjGHtzEyk0eZ1VfXCKpWIw25787&expand=true`,
          success: function(json){
            $(".property-div").show()
            if (json.addresses.length > 0) {
              var result = json.addresses
              var adresses = []
               adresses.push( `
                <option
                disabled=""
                selected=""
                >
                Select Your Property
                </option>
              `)
              for (var i = 0; i < result.length; i++) {
                adresses.push( `
                    <option
                    data-street="${result[i].line_1 || result[i].thoroughfare}"
                    data-city="${result[i].town_or_city}"
                    data-address="${result[i].formatted_address.toString().replaceAll(',', ' ')}"
                    data-province="${result[i].county || result[i].town_or_city}"
                    data-street2="${result[i].line_2}"
                    data-building="${result[i].building_number || result[i].sub_building_number || result[i].building_name || result[i].sub_building_name}"
                    >
                    ${result[i].formatted_address.join(" ").replace(/\s+/g,' ')}
                    </option>
                  `)
                }
                $('#property').html(adresses)
                $(".address-div").remove();
              return true
            }else{
              $(".step").removeClass("in-progress")
              return $.Deferred().reject("Please Enter Valid Postcode");
            }
          },
          error: function(request){
            console.log(request.statusText)
            request.abort();
            if (request.statusText == "timeout") {
              $(".property-div").remove();
            }
          },
          timeout: 5000
        })
      },
      messages: {
         en: 'Please Enter Valid Postcode',
      }
    });
  }

  function validatePhone(countryCode = "GB", callingCode = "44"){
    if (document.querySelector("#phone_code")){
      document.querySelector("#phone_code").value = callingCode
    }

    window.Parsley.addValidator('validphone', {
      validateString: function(value){
        debugger
        var xhr = $.ajax(`https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/mobile?value=${callingCode}${value}&key=7b32461b4afd7912a0669d5cf2369d50&countryCode=${countryCode}`)
        return xhr.then(function(json) {
          var skipresponse = ["EC_ABSENT_SUBSCRIBER", "EC_ABSENT_SUBSCRIBER_SM", "EC_CALL_BARRED", "EC_SYSTEM_FAILURE","EC_SM_DF_memoryCapacityExceeded", "EC_NO_RESPONSE", "EC_NNR_noTranslationForThisSpecificAddress", "EC_NNR_MTPfailure", "EC_NNR_networkCongestion"]
          debugger
          if (skipresponse.includes(json.response) && json.status == "Valid" ) {
            isPhone = true
            document.querySelector("#phone").innerHTML = document.querySelector("#phone").innerHTML + `<i class="validate success fa fa-check-circle"></i>`
            return true
          }
          else if (json.status == "Valid") {
            document.querySelector("#phone").innerHTML = document.querySelector("#phone").innerHTML + `<i class="validate success fa fa-check-circle"></i>`
            isPhone = true
            return true
          }else if(json.status == "Invalid"){
            $(".global-phone-success").removeClass("d-inline-block")
            return $.Deferred().reject(`Please Enter Valid ${countryCode} Phone Number`);
          }else if(json.status == "Error"){
            isPhone = true
            sentryNotification("critical", json , "PHONE: Error Some network api is down")
            return true
          }else{
            sentryNotification("info", json , "PHONE: Error other than the ApiDown")
            isPhone = true
            return true
          }
        }).catch(function(e) {
          if (e == `Please Enter Valid ${countryCode} Phone Number`) {
            return $.Deferred().reject(`Please Enter Valid ${countryCode} Phone Number`)
          }else{
            isPhone = true
            $(".global-phone-success").addClass("d-inline-block")
            sentryNotification("critical", e , "PHONE: Error API Down")
            return true
          }
        });
      },
      messages: {
         en: `Please Enter Valid ${countryCode} Phone Number` ,
      }
    });
  }

  
  

  function geoDetection(){
    var requestUrl = "https://api.ipdata.co?api-key=3aae92264fcf46077f53ca99e8649a8bedb83a047e3fa7ab639885b3";
    $.ajax({
      url: requestUrl,
      type: 'GET',
      success: function(data){
        debugger
        var inputs = document.querySelectorAll(".phonecode");
        inputs.forEach( (input) => {
          intlTelInput(input, { initialCountry: data.country_code, allowDropdown: true, separateDialCode: false});
        })
        var areaCode = data.calling_code
        $("#phonecode").val(data.calling_code)
        validatePhone(data.country_code, data.calling_code)
      
      },
      error: function(err){
        console.log("Visitor Details Request failed, error= " + JSON.stringify(err));
      }
    });
  }

  // phoneInputField.addEventListener("countrychange", function() {
  // $('#dealform').parsley().validate()
  // });
  geoDetection();

});