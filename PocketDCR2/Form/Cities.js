// Global Variables
var CityId = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

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


function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtCityName: {
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

    myData = "{'CityId':'" + CityId + "'}";

    $.ajax({
        type: "POST",
        url: "Cities.asmx/DeleteCity",
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
    //if ($('#ddlT').val() > -1) {
    myData = "{'CityName':'" + $('#txtCityName').val() + "','isBigCityDialyAllowance':'" + $('#chkisBigCityDialyAllowance').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "Cities.asmx/InsertCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    //}
    //else {
    //    window.alert('Please Select Team!');
    //}
}
function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    CityId = sender;
    ClearFields();
    myData = "{'CityId':'" + CityId + "'}";

    $.ajax({
        type: "POST",
        url: "Cities.asmx/GetCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCity,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    CityId = sender.ID;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {
    myData = "{'CityId':'" + CityId + "','CityName':'" + $('#txtCityName').val() + "','isBigCityDialyAllowance':'" + $('#chkisBigCityDialyAllowance').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "Cities.asmx/UpdateCity",
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
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function onSuccessGetCity(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $('#txtCityName').val(jsonObj[0].City);
        $('#chkisBigCityDialyAllowance').attr("checked", jsonObj[0].isBigCityDialyAllowance == "False" ? false : true);
    }
}
function onSuccess(data, status) {

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
    else if (data.d == "Duplicate Name!") {
        msg = 'Already exist! Try different';
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

    $('#txtCityName').val("");
    $('#chkisBigCityDialyAllowance').attr("checked", true);
}

