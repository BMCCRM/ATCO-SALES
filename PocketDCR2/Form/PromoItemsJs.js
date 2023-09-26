// Global Variables

var PromoItemId = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Events

function pageLoad() {

    ClearFields();
    DefaultData();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#divConfirmation').jqm({ modal: true });
}
function btnAddClicked() {
    $('#hdnMode').val("AddMode");
    
    $('#divGrid').jqmShow();
    return false;
}
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtCode: {
                required: true
            },
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

    ClearFields();
    return false;
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}
function btnYesClicked() {

    myData = "{'promoItemId':'" + PromoItemId + "'}";

    $.ajax({
        type: "POST",
        url: "PromoItemsService.asmx/DeletePromoItem",
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

// Functions

function SaveData() {

    myData = "{'code':'" + $('#txtCode').val() + "','name':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "PromoItemsService.asmx/InsertPromoItem",
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
function LoadForEdit(promoItemId) {

    $('#hdnMode').val("EditMode");
    PromoItemId = promoItemId;

    myData = "{'promoItemId':'" + PromoItemId + "'}";

    $.ajax({
        type: "POST",
        url: "PromoItemsService.asmx/GetPromoItem",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetPromoItem,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function LoadForDelete(promoItemId) {

    $('#hdnMode').val("DeleteMode");
    PromoItemId = promoItemId;

    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'promoItemId':'" + PromoItemId + "','code':'" + $('#txtCode').val() + "','name':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked")
        + "'}";

    $.ajax({
        type: "POST",
        url: "PromoItemsService.asmx/UpdatePromoItem",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    ClearFields();
}
function ajaxCompleted() {

    $('#imgLoading').hide();

}
function onSuccessGetPromoItem(data, status) {

    if (data.d != "") {

        ClearFields();

        jsonObj = jsonParse(data.d);
        $('#txtCode').val(jsonObj[0].PromoCode);
        $('#txtName').val(jsonObj[0].PromoName);
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

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'alert',
            fx: 'slide',
            speed: 500
        });

        $("#btnRefresh").trigger('click');
    }
    else if (data.d == "Duplicate Code!") {

        alert('Code already exist! Try different');
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
function DefaultData() {

    $('#chkActive').attr("checked", true);
}
function ClearFields() {

    $('#txtCode').val("");
    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
}