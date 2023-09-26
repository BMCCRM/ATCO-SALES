
var validation;
var validationGetProfileDetails;
var validationGetProfileDetailsMessages;

var docs = [];

$(document).ready(function () {

    $2('#Divmessage').jqm({ modal: true });

    $('#btnOk').click(OKClick)

    //getalldocs();
    getallcities();

    validation = $('#form1').validate({
        errorElement: "div",
        errorClass: "help-block help-block-error",
        focusInvalid: !1, ignore: "",
        highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
        unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
        success: function (e) { e.closest(".form-group").removeClass("has-error") },
    });

    validationGetProfileDetails = {
        txtCustomerCode: { required: true }
    };

    validationGetProfileDetailsMessages = {
        txtCustomerCode: {
            required: 'Please enter customer code'
        }
    };


    $("#ui-id-1").css("height", "350px");
    $("#ui-id-1").css("overflow-y", "auto");
    $("#ui-id-1").css("overflow-x", "hidden");

    $("#txtCustomerCode").keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $("#btnGetCustomerProfile").click();
        }
    });

});

function getallcities() {
    
    $.ajax({
        type: "POST",
        url: "DoctorProfileService.asmx/GetDoctorCities",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);

                $('#ddlDocCities').empty();
                $('#ddlDocCities').append('<option value="-1">Select City</option>');
                for (var i = 0; i < msg.length ; i++) {
                    $('#ddlDocCities').append('<option value="' + msg[i].City + '">' + msg[i].City + '</option>');
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function OnChangeddlCity() {

    $('#txtCustomerCode').val('');

    docs = [];

    if($('#ddlDocCities').val() != '-1')
    {
        getalldocs();
        $('#txtCustomerCode').removeAttr('disabled');
    }
    else
    {
        $('#txtCustomerCode').attr('disabled', 'disabled');
    }
    
    $("#txtCustomerCode").autocomplete({
        source: docs
    });

    $("#txtCustomerCode").on("autocompleteselect", function (event, ui) {

    });
}



function getalldocs() {

    //var doccode = $('#txtCustomerCode').val().split("-")[0];
    var city = $('#ddlDocCities').val();

    $.ajax({
        type: "POST",
        url: "DoctorProfileService.asmx/GetDoctorsForProfile",
        contentType: "application/json; charset=utf-8",
        //data: '{"doccode":"' + doccode + '"}',
        data: '{"city":"' + city + '"}',
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                docs = [];
                var parsed = JSON.parse(data.d);
                $.each(parsed, function (key, value) {
                    docs.push({ label: value.DocName, value: value.DocName });
                });
            }
            //    var newArray = new Array(parsed.length);
            //    var i = 0;

            //    parsed.forEach(function (entry) {
            //        var newObject = {
            //            label: entry.DocName,
            //            name: entry.DoctorCode + '-' + entry.DocName,
            //            value: entry.DocName
            //        };
            //        newArray[i] = newObject;
            //        i++;
            //    });
            //    response(newArray);
            //}
        },
        error: function (result) {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('<b>Error is occurred.<br /> Try again.</b>');
            $2('#Divmessage').jqmShow();
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}


function GetCustomerProfileDetails() {

    //validation.resetForm();
    //validation.settings.rules = validationGetProfileDetails;
    //validation.settings.messages = validationGetProfileDetailsMessages;

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    if ($('#ddlDocCities').val() == "-1") {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Please select city</b>');
        $2('#Divmessage').jqmShow();
    }
    else
    {
        if ($('#txtCustomerCode').val() == "") {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('<b>Please enter customer code or customer name</b>');
            $2('#Divmessage').jqmShow();
        }
        else {

            clearAllValues();

            var doccode = $('#txtCustomerCode').val().split("-")[0];

            $.ajax({
                type: "POST",
                url: "DoctorProfileService.asmx/GetCustomerProfileDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"doccode":"' + doccode + '"}',
                success: onSuccessGetCustomerProfileDetails,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
}

function onSuccessGetCustomerProfileDetails(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        debugger
        if (jsonObj.length > 0) {
            $('.doc_name_val').text(jsonObj[0][0].DocName);
            $('.doc_pmdc_val').text(jsonObj[0][0].PMDC_Number);
            $('.doc_systemcode_val').text(jsonObj[0][0].DoctorCode);
            $('.doc_city_val').text(jsonObj[0][0].City);
            $('.doc_guardian_val').text(jsonObj[0][0].GuardianName);
            $('.doc_gender_val').text(jsonObj[0][0].Gender);
            $('.doc_religion_val').text(jsonObj[0][0].Religion);
            $('.doc_sector_val').text(jsonObj[0][0].Sector);
            $('.doc_qualification_val').text(jsonObj[0][0].QualificationName);

            $('.doc_clinicaddress_val').text(jsonObj[0][0].ClinicAddress);
            $('.doc_Cellphone_val').text(jsonObj[0][0].CellNumber);
            $('.doc_clinicphone_val').text(jsonObj[0][0].ClinicPhone);
            $('.doc_practicetype_val').text(jsonObj[0][0].PracticeName);
            $('.doc_address_val').text(jsonObj[0][0].Address1);
            $('.doc_homephone_val').text(jsonObj[0][0].MobileNumber1);
            $('.doc_email_val').text(jsonObj[0][0].EmailAddress);
            $('.doc_hospital_val').text(jsonObj[0][0].HospitalName);
            $('.do_ward_val').text(jsonObj[0][0].Ward);
            $('.doc_designation_val').text(jsonObj[0][0].DesignationName);
            $('.doc_responsibility_val').text(jsonObj[0][0].ResponsbilityName);
            $('.doc_callday_val').text(jsonObj[0][0].CallDay);
            $('.doc_calltime_val').text(jsonObj[0][0].PreferredCallTime);
            $('.doc_callfrequency_val').text(jsonObj[0][0].CallFrequency);
            $('.doc_practicesize_val').text(jsonObj[0][0].PracticeSize);
            $('.doc_hobby_val').text(jsonObj[0][0].HobbyName);
            $('.doc_style_val').text(jsonObj[0][0].StyleName);
            $('.doc_family_val').text(jsonObj[0][0].FamilyMembers);
            $('.doc_wives_val').text(jsonObj[0][0].NumberOfWives);
            $('.doc_sons_val').text(jsonObj[0][0].NumberOfSons);
            $('.doc_daugthers_val').text(jsonObj[0][0].NumberOfDaughters);
            $('.doc_dobmonth_val').text(jsonObj[0][0].DOB_Month);
            $('.doc_dobday_val').text(jsonObj[0][0].DOB_Day);
            $('.doc_dobyear_val').text(jsonObj[0][0].DOB_Year);
            $('.doc_rxpreference1_val').text('-');
            $('.doc_rxpreference2_val').text('-');
            $('.doc_dommonth_val').text(jsonObj[0][0].DOM_Month);
            $('.doc_domday_val').text(jsonObj[0][0].DOM_Day);
            $('.doc_domyear_val').text(jsonObj[0][0].DOM_Year);
            $('.doc_companyrelationstatus_val').text(jsonObj[0][0].RelationStatus);
            $('.doc_sporelation_val').text(jsonObj[0][0].EmpRelationStatus);
            $('.doc_engagementstatus_val').text(jsonObj[0][0].EngagementStatus);
            $('.doc_distributor_val').text(jsonObj[0][0].DistributorName);
            $('.docdistributorcity_val').text(jsonObj[0][0].City);
            $('.doc_brickid_val').text('-');
            $('.doc_spo_val').text('-');
            $('.doc_team_val').text('-');
            $('.doc_basetown_val').text(jsonObj[0][0].BaseTown);

            for (var i = 0; i <= jsonObj[1].length; i++) {
                if (jsonObj[1][i] != null || jsonObj[1][i] != undefined) {
                    $('.doc_speciality' + i + '_val').text(jsonObj[1][i].SpecialityName);
                }
            }


            for (var j = 0; j <= jsonObj[2].length; j++) {
                if (jsonObj[2][j] != null || jsonObj[2][j] != undefined) {
                    $('.doc_buyingmotive' + (j + 1) + '_val').text(jsonObj[2][j].ByingMotives);
                }
            }

            for (var k = 0; k <= jsonObj[3].length; k++) {
                if (jsonObj[3][k] != null || jsonObj[3][k] != undefined) {
                    $('.doc_engagingteam' + (k + 1) + '_val').text(jsonObj[3][k].TeamName);
                }
            }
        }
    }
    else {
        // no profile found
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Invalid customer code. <br />No customer Found.</b>');
        $2('#Divmessage').jqmShow();
    }
}


function clearAllValues() {

    $('.doc_name_val').text('-');
    $('.doc_pmdc_val').text('-');
    $('.doc_systemcode_val').text('-');
    $('.doc_city_val').text('-');
    $('.doc_guardian_val').text('-');
    $('.doc_gender_val').text('-');
    $('.doc_religion_val').text('-');
    $('.doc_sector_val').text('-');
    $('.doc_qualification_val').text('-');

    $('.doc_clinicaddress_val').text('-');
    $('.doc_Cellphone_val').text('-');
    $('.doc_clinicphone_val').text('-');
    $('.doc_practicetype_val').text('-');
    $('.doc_address_val').text('-');
    $('.doc_homephone_val').text('-');
    $('.doc_email_val').text('-');
    $('.doc_hospital_val').text('-');
    $('.do_ward_val').text('-');
    $('.doc_designation_val').text('-');
    $('.doc_responsibility_val').text('-');
    $('.doc_callday_val').text('-');
    $('.doc_calltime_val').text('-');
    $('.doc_callfrequency_val').text('-');
    $('.doc_practicesize_val').text('-');
    $('.doc_hobby_val').text('-');
    $('.doc_style_val').text('-');
    $('.doc_family_val').text('-');
    $('.doc_wives_val').text('-');
    $('.doc_sons_val').text('-');
    $('.doc_daugthers_val').text('-');
    $('.doc_dobmonth_val').text('-');
    $('.doc_dobday_val').text('-');
    $('.doc_dobyear_val').text('-');
    $('.doc_rxpreference1_val').text('-');
    $('.doc_rxpreference2_val').text('-');
    $('.doc_dommonth_val').text('-');
    $('.doc_domday_val').text('-');
    $('.doc_domyear_val').text('-');
    $('.doc_companyrelationstatus_val').text('-');
    $('.doc_sporelation_val').text('-');
    $('.doc_engagementstatus_val').text('-');
    $('.doc_distributor_val').text('-');
    $('.docdistributorcity_val').text('-');
    $('.doc_brickid_val').text('-');
    $('.doc_spo_val').text('-');
    $('.doc_team_val').text('-');
    $('.doc_basetown_val').text('-');

    $('.doc_speciality1_val').text('-');
    $('.doc_speciality2_val').text('-');
    $('.doc_speciality3_val').text('-');

    $('.doc_buyingmotive1_val').text('-');
    $('.doc_buyingmotive2_val').text('-');
    $('.doc_buyingmotive3_val').text('-');

    $('.doc_engagingteam1_val').text('-');
    $('.doc_engagingteam2_val').text('-');
    $('.doc_engagingteam3_val').text('-');
    $('.doc_engagingteam4_val').text('-');
}



function onError(request, status, error) {
    $('#Divmessage').find('#hlabmsg').empty();
    $('#Divmessage').find('#hlabmsg').text('Error is occured.');
    //$('#Divmessage').jqmShow();
}

function startingAjax() {
    $('#UpdateProgress1').show();
}

function ajaxCompleted() {
    $('#UpdateProgress1').hide();
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}