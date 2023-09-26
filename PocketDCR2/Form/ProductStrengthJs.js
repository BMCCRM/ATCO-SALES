// Global Variables
var StrengthId = 0;
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

    myData = "{'strengthId':'" + StrengthId + "'}";

    $.ajax({
        type: "POST",
        url: "StrengthService.asmx/DeleteStrength",
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

    myData = "{'strengthName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "StrengthService.asmx/InsertStrength",
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
    StrengthId = sender.StrengthId.toString();
    ClearFields();
    myData = "{'strengthId':'" + StrengthId + "'}";

    $.ajax({
        type: "POST",
        url: "StrengthService.asmx/GetStrength",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetStrength,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    StrengthId = sender.StrengthId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'strengthtId':'" + StrengthId + "','strengthName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "StrengthService.asmx/UpdateStrength",
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
function onSuccessGetStrength(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#txtName').val(jsonObj[0].StrengthName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {
    msg = '';
    if (data.d == "OK") {

        mode = $('#hdnMode').val();


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

        ClearFields();
        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();



    }
    else if (data.d == "Duplicate Strength!") {
        msg = 'Strength already exist! Try different';
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
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
}