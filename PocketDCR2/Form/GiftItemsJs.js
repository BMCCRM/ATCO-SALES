// Global Variables
var GiftId = 0;
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
            txtCode: {
                required: true,
                digits: true
            },
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

    myData = "{'giftId':'" + GiftId + "'}";

    $.ajax({
        type: "POST",
        url: "GiftItemsService.asmx/DeleteGift",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
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

    myData = "{'code':'" + $('#txtCode').val() + "','name':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "GiftItemsService.asmx/InsertGift",
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
    GiftId = sender.toString();
    myData = "{'giftId':'" + GiftId + "'}";

    $.ajax({
        type: "POST",
        url: "GiftItemsService.asmx/GetGiftItems",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetGift,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    GiftId = sender.GiftId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'giftId':'" + GiftId + "','code':'" + $('#txtCode').val() + "','name':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";
    
    $.ajax({
        type: "POST",
        url: "GiftItemsService.asmx/UpdateGift",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        cache: false
    });
}
function ajaxCompleted(request, data) {

    $('#imgLoading').hide();
}
function onSuccessGetGift(data, status) {

    if (data.d != "") {

        ClearFields();

        jsonObj = jsonParse(data.d);
        $('#txtCode').val(jsonObj[0].GiftCode);
        $('#txtName').val(jsonObj[0].GiftName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
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
    else if (data.d == "Duplicate Code!") {

        msg = 'Code already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Name!") {
        msg = 'Gift already exist! Try different';
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
    $('#divConfirmation').jqmHide();
    msg = 'Error occoured';
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtCode').val("");
    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
}