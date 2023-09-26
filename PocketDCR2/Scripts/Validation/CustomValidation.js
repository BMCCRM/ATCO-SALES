$.validator.addMethod("alpha",
            function (value, element) {
                var alphaRegExp = new RegExp("^[\\sa-zA-Z]*$");
                if (alphaRegExp.test(element.value)) {
                    return true;
                }
                else return false;
            },
            "<br /> Only alphabets allowed."
    );

$.validator.addMethod("alphaNumeric",
            function (value, element) {
                var alphaRegExp = new RegExp("^[\\sa-zA-Z0-9.-_]*$");
                if (alphaRegExp.test(element.value)) {
                    return true;
                }
                else return false;
            },
            "<br /> Only digits,alphabets and . - _ allowed."
    );

$.validator.addMethod("decimal",
    function (value, element) {
        var deciRegExp = new RegExp("^[0-9.]*$");
        if (deciRegExp.test(element.value)) {
            return true;
        }
        else return false;
    },
    "<br /> Only decimal/digit allowed."
);

//  $.validator.addMethod("mobileNo",
//    function (value, element) {
//        var deciRegExp = new RegExp("/^[92]\d[2-9]*$");
//        if (deciRegExp.test(element.value)) {
//            return true;
//        }
//        else return false;
//    },
//    "Only decimal/digit allowed."
//);