var countryData = window.intlTelInputGlobals.getCountryData(),
    input = document.querySelector("#phone"),
    addressDropdown = document.querySelector("#input-country"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

var iti = window.intlTelInput(input, {
    hiddenInput: "full_phone",
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function(callback) {
        $.get('https://ipinfo.io?token=27deb63d2b068c', function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            callback(countryCode);
        });
    },
    utilsScript: "js/utils.js"
});

var reset = function() {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
};

input.addEventListener('blur', function() {
    reset();
    if (input.value.trim()) {
        if (iti.isValidNumber()) {
            validMsg.classList.remove("hide");
        } else {
            input.classList.add("error");
            var errorCode = iti.getValidationError();
            errorMsg.innerHTML = errorMap[errorCode];
            errorMsg.classList.remove("hide");
        }
    }
});

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

for (var i = 0; i < countryData.length; i++) {
    var country = countryData[i];
    var optionNode = document.createElement("option");
    optionNode.value = country.iso2;
    var textNode = document.createTextNode(country.name);
    optionNode.appendChild(textNode);
    addressDropdown.appendChild(optionNode);
}

addressDropdown.value = iti.getSelectedCountryData().iso2;

input.addEventListener('countrychange', function(e) {
    addressDropdown.value = iti.getSelectedCountryData().iso2;
});

addressDropdown.addEventListener('change', function() {
    iti.setCountry(this.value);
});

$(document).ready(function() {
    $(".contact__initial-button").click(function(event) {
        if (!$('.contact__initial').valid()) {
            return false;
        } else {
            $(".contact__initial").addClass("contact_hidden");
            $(".contact__title").addClass("contact_hidden");
            $(".contact__apps").removeClass("contact_hidden");
            $(".contact__quiz-start").removeClass("contact_hidden");
        }
    });
    $(".contact__quiz-start-button").click(function() {

        $(".contact__apps").addClass("contact_hidden");
        $(".contact__quiz-start").addClass("contact_hidden");
        $(".contact__quiz-1").removeClass("contact_hidden");
    });
    $(".contact__quiz-main-label_1").click(function() {
        $(".contact__quiz-1").addClass("contact_hidden");
        $(".contact__quiz-2").removeClass("contact_hidden");
    });
    $(".contact__quiz-main-label_2").click(function() {
        $(".contact__quiz-2").addClass("contact_hidden");
        $(".contact__quiz-3").removeClass("contact_hidden");
    });
    $(".contact__quiz-main-label_3").click(function() {
        $(".contact__quiz-3").addClass("contact_hidden");
        $(".contact__quiz-4").removeClass("contact_hidden");
    });
    $(".contact__quiz-main-label_4").click(function() {
        setTimeout(function() {
            let formData = {
                userName: $(".input__name").val(),
                userEmail: $(".input__email").val(),
                userNumber: iti.getNumber(),
                userCountry: $(".input__country option:selected").text(),
                quizFirst: $('input[name="experience"]:checked').val(),
                quizSecond: $('input[name="aim"]:checked').val(),
                quizThird: $('input[name="time"]:checked').val(),
                quizFourth: $('input[name="money"]:checked').val()
            };
            console.log(formData);
        }, 100);
        $(".contact__quiz-4").addClass("contact_hidden");
        $(".contact__quiz-end").removeClass("contact_hidden");
    });

    jQuery.validator.addMethod('validateError', function(value, element) {
        if ($("#valid-msg").hasClass("hide")) {
            return false;
        } else {
            return true;
        }
    });
    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœа-яієїґ]+$/i.test(value);
    }, "Only alphabetical characters");
    $(".contact__initial").validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                lettersonly: true
            },
            usernumber: {
                required: true,
                validateError: true,
            },
            useremail: {
                required: true,
                email: true
            },
            userconsent: "required",
            usercountry: "required"
        }
    });
});