// Global Variables
var SpecialityId = 0;
var myData = "", mode = "", jsonObj = "", msg = "";

// Event
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
}
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {            
            txtName: {
                required: true,
                alpha: true
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

    myData = "{'specialityId':'" + SpecialityId + "'}";

    $.ajax({
        type: "POST",
        url: "SpecialityService.asmx/DeleteSpeciality",
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

    myData = "{'specialityName':'" + $('#txtName').val() + "'}";

    $.ajax({
        type: "POST",
        url: "SpecialityService.asmx/InsertSpeciality",
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
function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    SpecialityId = sender.toString();
    myData = "{'specialityId':'" + SpecialityId + "'}";

    $.ajax({
        type: "POST",
        url: "SpecialityService.asmx/GetSpeciality",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetSpeciality,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    SpecialityId = sender.SpecialityId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'specialityId':'" + SpecialityId + "','specialityName':'" + $('#txtName').val() + "'}";

    $.ajax({
        type: "POST",
        url: "SpecialityService.asmx/UpdateSpeciality",
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
function onSuccessGetSpeciality(data, status) {

    if (data.d != "") {

        ClearFields();
        jsonObj = jsonParse(data.d);

        $('#txtName').val(jsonObj[0].SpecialiityName);
    }
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();
        var msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {
            msg = 'Data deleted succesfully!';
            $('#divConfirmation').jqmHide();
        }

        ClearFields();
        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
    else if (data.d == "Duplicate Name!") {
        msg = 'Speciality already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
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
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
}