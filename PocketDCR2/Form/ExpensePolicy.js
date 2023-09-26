// Global Variables
var ExpensePolicyId = 0;
var mode = "", myData = "", jsonObj = "", msg = "";
var updateExpenseStatus = "";

// Events
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
    GetCurrentUser();
    //GetLevels();
    GetDesignations();
    //$('#ddlLevel').change(function () {
    //GetDesignations($(this).val());
    // $(this).val() will work here
    //});
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();

    $('#StxtDate').val(month_name + '-' + current_year);
    $('#EtxtDate').val(month_name + '-' + current_year);
}
function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }

}

function GetLevels() {
    $.ajax({
        type: "POST",
        url: "../Form/AppConfiguration.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetLevels,
        error: onError,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {
    document.getElementById('ddlLevel').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Level';
        $("#ddlLevel").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlLevel").append("<option value='" + jsonObj[i].SettingName + "'>" + jsonObj[i].SettingValue + "</option>");
        });
    }
}

function GetDesignations() {
    //myData = "{'Level':'" + LevelName + "'}";
    $.ajax({
        type: "POST",
        data: "",
        url: "ExpensePolicy.asmx/GetEmployeeDesignations",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetDesignations,
        error: onError,
        cache: false
    });
}
function onSuccessGetDesignations(data, status) {
    document.getElementById('ddlDesignation').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Designation';
        $("#ddlDesignation").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlDesignation").append("<option value='" + jsonObj[i].DesignationId + "'>" + jsonObj[i].DesignationName + "</option>");
        });
    }
}

function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtDailyAllowance: {
                required: true
            },
            txtBikeAllowance: {
                required: true
            },
            txtCngAllowance: {
                required: true
            },
            txtDailyAddAllowance_BigCity: {
                required: true
            },
            txtMonthlyAllowance_BigCity: {
                required: true
            },
            MilagePerKM: {
                required: true
            },
            txtOutStationAllowance_OutBack: {
                required: true
            },
            txtOutStationAllowance_NightStay: {
                required: true
            },
            txtDailyInstitutionAllowance: {
                required: true
            },
            txtMobileAllowance: {
                required: true
            },
            //txtInstitutionBaseAllowance: {
            //    required: true
            //},
            txtMonthlyAllowance: {
                required: true
            },
            txtMonthlyAllowance_samebasetown: {
                required: true
            },
            txtMonthlyAllowance_differentbasetown: {
                required: true
            },
            txtMonthlyNonTouringAllowance: {
                required: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    mode = $('#hdnMode').val();

    if (mode === "") {

        mode = "AddMode";
        $('#hdnMode').val("AddMode");
    }

    if (mode === "AddMode") {
        SaveData();
    }

    else if (mode === "EditMode") {
        UpdateData();
    }
    else {
        return false;
    }

    return false;
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'ExpensePolicyId':'" + ExpensePolicyId + "'}";

    $.ajax({
        type: "POST",
        url: "ExpensePolicy.asmx/DeleteExpensePolicy",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}
function btnOkClicked() {

    $('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

// Functions
function SaveData() {
    debugger
    if ($('#ddlDesignation').val() > -1) {
        myData = "{'EmployeeDesignationId':'" + $('#ddlDesignation').val() + "','DailyAllowance':'" + $('#txtDailyAllowance').val() + "','BikeAllowance':'" + $('#txtBikeAllowance').val() + "','CngAllowance':'" + $('#txtCngAllowance').val() + "','DailyAddAllowance_BigCity':'" + $('#txtDailyAddAllowance_BigCity').val() + "','MonthlyAllowance_BigCity':'" + $('#txtMonthlyAllowance_BigCity').val() + "','MilagePerKm':'" + $('#MilagePerKM').val() + "','OutStationAllowance_OutBack':'" + $('#txtOutStationAllowance_OutBack').val() + "','OutStationAllowance_NightStay':'" + $('#txtOutStationAllowance_NightStay').val() + "','DailyInstitutionBaseAllowance':'" + $('#txtDailyInstitutionAllowance').val() + "','MobileAllowance':'" + $('#txtMobileAllowance').val() + "','InstitutionBaseAllowance':'" + $('#txtInstitutionBaseAllowance').val() + "','MonthlyAllowance':'" + $('#txtMonthlyAllowance').val() + "','MonthlyAllowance_SameBaseTown':'" + $('#txtMonthlyAllowance_samebasetown').val() + "','MonthlyAllowance_DifferentBaseTown':'" + $('#txtMonthlyAllowance_differentbasetown').val() + "','MonthlyNonTouringAllowance':'" + $('#txtMonthlyNonTouringAllowance').val() + "','MonthOfExpensePolicyS':'" + $('#StxtDate').val() + "','MonthOfExpensePolicyE':'" + $('#EtxtDate').val() + "'}";

        $.ajax({
            type: "POST",
            url: "ExpensePolicy.asmx/InsertExpensePolicy",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        window.alert('Please Select Designation!');
    }
}
function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    ExpensePolicyId = sender;
    ClearFields();
    myData = "{'ExpensePolicyId':'" + ExpensePolicyId + "'}";

    $.ajax({
        type: "POST",
        url: "ExpensePolicy.asmx/GetExpensePolicy",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetExpensePolicy,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ExpensePolicyId = sender.ID;
    $('#divConfirmation').jqmShow();
}


function getFormatedDate(DateFor) {
    const monthNames = {};



    monthNames["january"] = 1;
    monthNames["february"] = 2;
    monthNames["march"] = 3;
    monthNames["april"] = 4;
    monthNames["may"] = 5;
    monthNames["june"] = 6;
    monthNames["july"] = 7;
    monthNames["august"] = 8;
    monthNames["september"] = 9;
    monthNames["october"] = 10;
    monthNames["november"] = 11;
    monthNames["december"] = 12;

    rawDate = DateFor;

    var a = rawDate.split('-')
    var monthNumber = monthNames[a[0].toLocaleLowerCase()]

    var year = a[1];
    var fdate = year + '-' + monthNumber + '-01';
    return fdate;
}

function UpdateData() {
    if ($('#ddlDesignation').val() > -1) {

        //var dateString = "2015-01-16 22:15:00";
        //var d = new Date($('#StxtDate').val());
        debugger
        var Updatedstartdate = getFormatedDate($('#StxtDate').val());
        var Updatedenddate = getFormatedDate($('#EtxtDate').val());



        var UpdatedstartdateValid = Date.parse(Updatedstartdate, "yyyy-MM-dd HH:mm:ss");
        var UpdatedenddateValid = Date.parse(Updatedenddate, "yyyy-MM-dd HH:mm:ss");

        console.log(UpdatedstartdateValid);
        console.log(UpdatedenddateValid);

        if (isNaN(UpdatedstartdateValid) || isNaN(UpdatedenddateValid)) {
            msg = "";
            if (isNaN(UpdatedstartdateValid)) {
                msg = 'Please Enter Correct start Date';
            } else if (isNaN(UpdatedenddateValid)) {
                msg = 'Please Enter Correct End Date';
            }

          
            $('#hlabmsg').append(msg);
            $('#Divmessage').jqmShow();
            return false;
        }

      
      

        //alert(startDateNumber);
        ////alert(endDateNumber);

        if (UpdatedstartdateValid > UpdatedenddateValid) {

            msg = "End date must be greater than start date";
            $('#hlabmsg').append(msg);
            $('#Divmessage').jqmShow();
          
            return false;
        }
        else {

            if (updateExpenseStatus == "LimitedRecordsUpdate") {
               
                $('#hdnMode').val("EditMode");
               
                //ClearFields();

                myData = "{'ExpensePolicyId':'" + ExpensePolicyId + "','Updatedstartdate':'" + Updatedstartdate + "','Updatedenddate':'" + Updatedenddate + "'}";
               
                $.ajax({
                    type: "POST",
                    url: "ExpensePolicy.asmx/CheckExistingExpPolicy",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessCheckExistingExpPolicy,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });


                function onSuccessCheckExistingExpPolicy(data) {

                    var parseJson = JSON.parse(data.d);
                    msg = "";
                    if (parseJson[0].DataCheck == 'Ok') {

                        myData = "{'ExpensePolicyId':'" + ExpensePolicyId + "','EmployeeDesignationId':'" + $('#ddlDesignation').val() + "','DailyAllowance':'" + $('#txtDailyAllowance').val() + "','BikeAllowance':'" + $('#txtBikeAllowance').val() + "','CngAllowance':'" + $('#txtCngAllowance').val() + "','DailyAddAllowance_BigCity':'" + $('#txtDailyAddAllowance_BigCity').val() + "','MonthlyAllowance_BigCity':'" + $('#txtMonthlyAllowance_BigCity').val() + "','MilagePerKm':'" + $('#MilagePerKM').val() + "','OutStationAllowance_OutBack':'" + $('#txtOutStationAllowance_OutBack').val() + "','OutStationAllowance_NightStay':'" + $('#txtOutStationAllowance_NightStay').val() + "','DailyInstitutionBaseAllowance':'" + $('#txtDailyInstitutionAllowance').val() + "','MobileAllowance':'" + $('#txtMobileAllowance').val() + "','InstitutionBaseAllowance':'" + $('#txtInstitutionBaseAllowance').val() + "','MonthlyAllowance':'" + $('#txtMonthlyAllowance').val() + "','MonthlyAllowance_SameBaseTown':'" + $('#txtMonthlyAllowance_samebasetown').val() + "','MonthlyAllowance_DifferentBaseTown':'" + $('#txtMonthlyAllowance_differentbasetown').val() + "','MonthlyNonTouringAllowance':'" + $('#txtMonthlyNonTouringAllowance').val() + "','MonthOfExpensePolicyS':'" + $('#StxtDate').val() + "','MonthOfExpensePolicyE':'" + $('#EtxtDate').val() + "','UpdateRecStatus':'limitedRec'}";

                        $.ajax({
                            type: "POST",
                            url: "ExpensePolicy.asmx/UpdateExpensePolicy",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccess,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });




                    } else {
                        msg = "Record already Exists in selected date range";
                        $('#hdnMode').val("");
                        $('#hlabmsg').append(msg);
                        $('#Divmessage').jqmShow();                       
                    }

                    
                }



            } else if (updateExpenseStatus == "AllRecordsUpdate") {
               // return false;


                myData = "{'ExpensePolicyId':'" + ExpensePolicyId + "','EmployeeDesignationId':'" + $('#ddlDesignation').val() + "','DailyAllowance':'" + $('#txtDailyAllowance').val() + "','BikeAllowance':'" + $('#txtBikeAllowance').val() + "','CngAllowance':'" + $('#txtCngAllowance').val() + "','DailyAddAllowance_BigCity':'" + $('#txtDailyAddAllowance_BigCity').val() + "','MonthlyAllowance_BigCity':'" + $('#txtMonthlyAllowance_BigCity').val() + "','MilagePerKm':'" + $('#MilagePerKM').val() + "','OutStationAllowance_OutBack':'" + $('#txtOutStationAllowance_OutBack').val() + "','OutStationAllowance_NightStay':'" + $('#txtOutStationAllowance_NightStay').val() + "','DailyInstitutionBaseAllowance':'" + $('#txtDailyInstitutionAllowance').val() + "','MobileAllowance':'" + $('#txtMobileAllowance').val() + "','InstitutionBaseAllowance':'" + $('#txtInstitutionBaseAllowance').val() + "','MonthlyAllowance':'" + $('#txtMonthlyAllowance').val() + "','MonthlyAllowance_SameBaseTown':'" + $('#txtMonthlyAllowance_samebasetown').val() + "','MonthlyAllowance_DifferentBaseTown':'" + $('#txtMonthlyAllowance_differentbasetown').val() + "','MonthlyNonTouringAllowance':'" + $('#txtMonthlyNonTouringAllowance').val() + "','MonthOfExpensePolicyS':'" + $('#StxtDate').val() + "','MonthOfExpensePolicyE':'" + $('#EtxtDate').val() + "','UpdateRecStatus':'AllRec'}";

                $.ajax({
                    type: "POST",
                    url: "ExpensePolicy.asmx/UpdateExpensePolicy",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccess,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }


        }

    }
    else {
        window.alert('Please Select Designation!');
    }
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function onSuccessGetExpensePolicy(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        var StartDate = new Date(Date.parse(jsonObj[0].MonthOfExpensePolicyStart));
        var EndDate = new Date(Date.parse(jsonObj[0].MonthOfExpensePolicyEnd));
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var ddlDesignationExp = $('#ddlDesignation');
        var StxtDateExp = $('#StxtDate');
        var EtxtDateExp = $('#EtxtDate');
        var txtDailyAllowanceExp = $('#txtDailyAllowance');
        var txtBikeAllowanceExp = $('#txtBikeAllowance');
        var txtCngAllowanceExp = $('#txtCngAllowance');
        var txtDailyAddAllowance_BigCityExp = $('#txtDailyAddAllowance_BigCity');
        var txtMonthlyAllowance_BigCityExp = $('#txtMonthlyAllowance_BigCity');
        var MilagePerKMExp = $('#MilagePerKM');
        var txtOutStationAllowance_OutBackExp = $('#txtOutStationAllowance_OutBack');
        var txtOutStationAllowance_NightStayExp = $('#txtOutStationAllowance_NightStay');
        var txtDailyInstitutionAllowanceExp = $('#txtDailyInstitutionAllowance');
        var txtMobileAllowanceExp = $('#txtMobileAllowance');
        var txtInstitutionBaseAllowanceExp = $('#txtInstitutionBaseAllowance');
        var txtMonthlyAllowanceExp = $('#txtMonthlyAllowance');
        var txtMonthlyAllowance_samebasetownExp = $('#txtMonthlyAllowance_samebasetown');
        var txtMonthlyAllowance_differentbasetownExp = $('#txtMonthlyAllowance_differentbasetown');
        var txtMonthlyNonTouringAllowanceExp = $('#txtMonthlyNonTouringAllowance');




        if (jsonObj[0].UpdateStatus == "cannotupdate") {
            //alert("can not edit records");
            updateExpenseStatus = "LimitedRecordsUpdate";


            ddlDesignationExp.val(jsonObj[0].EmployeeDesignationId);
            ddlDesignationExp.attr("disabled", true);


            StxtDateExp.val(monthNames[StartDate.getMonth()] + '-' + StartDate.getFullYear());
            //StxtDateExp.attr("disabled", true);

            EtxtDateExp.val(monthNames[EndDate.getMonth()] + '-' + EndDate.getFullYear());
            //EtxtDateExp.attr("disabled", true);

            txtDailyAllowanceExp.val(jsonObj[0].DailyAllowance);
            txtDailyAllowanceExp.attr("disabled", true);

            txtBikeAllowanceExp.val(jsonObj[0].BikeAllowance);
            txtBikeAllowanceExp.attr("disabled", true);

            txtCngAllowanceExp.val(jsonObj[0].CNGAllowance);
            txtCngAllowanceExp.attr("disabled", true);

            txtDailyAddAllowance_BigCityExp.val(jsonObj[0].DailyAddAllowance_BigCity);
            txtDailyAddAllowance_BigCityExp.attr("disabled", true);

            txtMonthlyAllowance_BigCityExp.val(jsonObj[0].MonthlyAllowance_BigCity);
            txtMonthlyAllowance_BigCityExp.attr("disabled", true);

            MilagePerKMExp.val(jsonObj[0].MilagePerKm);
            MilagePerKMExp.attr("disabled", true);

            txtOutStationAllowance_OutBackExp.val(jsonObj[0].OutStationAllowance_OutBack);
            txtOutStationAllowance_OutBackExp.attr("disabled", true);

            txtOutStationAllowance_NightStayExp.val(jsonObj[0].OutStationAllowance_NightStay);
            txtOutStationAllowance_NightStayExp.attr("disabled", true);

            txtDailyInstitutionAllowanceExp.val(jsonObj[0].DailyInstitutionBaseAllowance);
            txtDailyInstitutionAllowanceExp.attr("disabled", true);

            txtMobileAllowanceExp.val(jsonObj[0].MobileAllowance);
            txtMobileAllowanceExp.attr("disabled", true);

            txtInstitutionBaseAllowanceExp.val(jsonObj[0].InstitutionBaseAllowance);
            txtInstitutionBaseAllowanceExp.attr("disabled", true);

            txtMonthlyAllowanceExp.val(jsonObj[0].MonthlyAllowance);
            txtMonthlyAllowanceExp.attr("disabled", true);

            txtMonthlyAllowance_samebasetownExp.val(jsonObj[0].MonthlyAllowance_SameBaseTown);
            txtMonthlyAllowance_samebasetownExp.attr("disabled", true);

            txtMonthlyAllowance_differentbasetownExp.val(jsonObj[0].MonthlyAllowance_DifferentBaseTown);
            txtMonthlyAllowance_differentbasetownExp.attr("disabled", true);

            txtMonthlyNonTouringAllowanceExp.val(jsonObj[0].MonthlyNonTouringAllowance);
            txtMonthlyNonTouringAllowanceExp.attr("disabled", true);

        } else if (jsonObj[0].UpdateStatus == "canupdate") {
            updateExpenseStatus = "AllRecordsUpdate";
            ddlDesignationExp.val(jsonObj[0].EmployeeDesignationId);
            ddlDesignationExp.attr("disabled", false);


            StxtDateExp.val(monthNames[StartDate.getMonth()] + '-' + StartDate.getFullYear());
            StxtDateExp.attr("disabled", false);

            EtxtDateExp.val(monthNames[EndDate.getMonth()] + '-' + EndDate.getFullYear());
            EtxtDateExp.attr("disabled", false);

            txtDailyAllowanceExp.val(jsonObj[0].DailyAllowance);
            txtDailyAllowanceExp.attr("disabled", false);

            txtBikeAllowanceExp.val(jsonObj[0].BikeAllowance);
            txtBikeAllowanceExp.attr("disabled", false);

            txtCngAllowanceExp.val(jsonObj[0].CNGAllowance);
            txtCngAllowanceExp.attr("disabled", false);

            txtDailyAddAllowance_BigCityExp.val(jsonObj[0].DailyAddAllowance_BigCity);
            txtDailyAddAllowance_BigCityExp.attr("disabled", false);

            txtMonthlyAllowance_BigCityExp.val(jsonObj[0].MonthlyAllowance_BigCity);
            txtMonthlyAllowance_BigCityExp.attr("disabled", false);

            MilagePerKMExp.val(jsonObj[0].MilagePerKm);
            MilagePerKMExp.attr("disabled", false);

            txtOutStationAllowance_OutBackExp.val(jsonObj[0].OutStationAllowance_OutBack);
            txtOutStationAllowance_OutBackExp.attr("disabled", false);

            txtOutStationAllowance_NightStayExp.val(jsonObj[0].OutStationAllowance_NightStay);
            txtOutStationAllowance_NightStayExp.attr("disabled", false);

            txtDailyInstitutionAllowanceExp.val(jsonObj[0].DailyInstitutionBaseAllowance);
            txtDailyInstitutionAllowanceExp.attr("disabled", false);

            txtMobileAllowanceExp.val(jsonObj[0].MobileAllowance);
            txtMobileAllowanceExp.attr("disabled", false);

            txtInstitutionBaseAllowanceExp.val(jsonObj[0].InstitutionBaseAllowance);
            txtInstitutionBaseAllowanceExp.attr("disabled", false);

            txtMonthlyAllowanceExp.val(jsonObj[0].MonthlyAllowance);
            txtMonthlyAllowanceExp.attr("disabled", false);

            txtMonthlyAllowance_samebasetownExp.val(jsonObj[0].MonthlyAllowance_SameBaseTown);
            txtMonthlyAllowance_samebasetownExp.attr("disabled", false);

            txtMonthlyAllowance_differentbasetownExp.val(jsonObj[0].MonthlyAllowance_DifferentBaseTown);
            txtMonthlyAllowance_differentbasetownExp.attr("disabled", false);

            txtMonthlyNonTouringAllowanceExp.val(jsonObj[0].MonthlyNonTouringAllowance);
            txtMonthlyNonTouringAllowanceExp.attr("disabled", false);
        }






        //$('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {

    debugger;
    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';
        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';

        }


        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        ClearFields();

    }
    else if (data.d == "already exists on selected dates range") {
        msg = 'Expense Policy already exists on selected date range and designation!';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
}
function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#imgLoading').hide();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#ddlLevel').val('-1');
    $('#ddlDesignation').val('-1');
    $('#StxtDate').val(month_name + '-' + current_year);
    $('#EtxtDate').val(month_name + '-' + current_year);
    $('#txtDailyAllowance').val("");
    $('#txtMonthlyAllowance_BigCity').val("");
    $('#txtBikeAllowance').val("");
    $('#txtCngAllowance').val("");
    $('#txtDailyAddAllowance_BigCity').val("");
    $('#MilagePerKM').val("");
    $('#txtOutStationAllowance_OutBack').val("");
    $('#txtOutStationAllowance_NightStay').val("");
    $('#txtDailyInstitutionAllowance').val("");
    $('#txtMobileAllowance').val("");
    $('#txtInstitutionBaseAllowance').val("");
    $('#txtMonthlyAllowance').val("");
    $('#txtMonthlyAllowance_samebasetown').val("");
    $('#txtMonthlyAllowance_differentbasetown').val("");
    $('#txtMonthlyNonTouringAllowance').val("");
}

function onCalendarShown1() {

    var cal = $find("calendar1");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call1);
            }
        }
    }
}
function onCalendarHidden1() {
    var cal = $find("calendar1");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call1);
            }
        }
    }

}
function call1(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar1");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}

function onCalendarShown2() {

    var cal = $find("calendar2");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }
}
function onCalendarHidden2() {
    var cal = $find("calendar2");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }

}
function call2(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar2");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}