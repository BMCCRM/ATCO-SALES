// Global Variables
var PackSizeId = 0;
var mode = "", jsonObj = "", msg = "", myData = "";

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
}
function btnSaveClicked() {

    var isValidated = $("#form1").validate({
        rules: {
            txtPackSize: {
                required: true
            }
        }
    });

    if (!$("#form1").valid()) {
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

    myData = "{'packSizeId':'" + PackSizeId + "'}";

    $.ajax({
        type: "POST",
        url: "PackSize.asmx/DeletePackSize",
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

    myData = "{'packSize':'" + $('#txtPackSize').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "PackSize.asmx/InsertPackSize",
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
    PackSizeId = sender.PackSizeid;
    ClearFields();
    myData = "{'packSizeId':'" + PackSizeId + "'}";

    $.ajax({
        type: "POST",
        url: "PackSize.asmx/GetPackSize",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetPackSize,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    PackSizeId = sender.PackSizeid;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'packSizeId':'" + PackSizeId + "','packSize':'" + $('#txtPackSize').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "PackSize.asmx/UpdatePackSize",
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
function onSuccessGetPackSize(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#txtPackSize').val(jsonObj[0].SizeName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {

    var msg = '';
    if (data.d == "OK") {

        var mode = $('#hdnMode').val();


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
    else if (data.d == "Duplicate Package Size!") {
        msg = 'Package Size already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

        return false;
    }
    else if (data.d == "") {


        $('#divConfirmation').jqmHide();

        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
}
function onError(request, status, error) {

    $('#divConfirmation').jqmHide();
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtPackSize').val("");
    $('#chkActive').attr("checked", true);
}