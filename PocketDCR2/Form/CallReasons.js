// Global Variables
var ReasonId = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Event
function pageLoad() {

    ClearFields();

    FillAllReasons();


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

    myData = "{'name':'" + $('#txtName').val() + "'}";

    $.ajax({
        type: "POST",
        url: "CallReasons.asmx/InsertReason",
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
    ReasonId = sender;
    myData = "{'reasonId':'" + sender + "'}";

    $.ajax({
        type: "POST",
        url: "CallReasons.asmx/GetReason",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetReason,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ReasonId = sender;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'reasonId':'" + ReasonId + "','name':'" + $('#txtName').val() + "'}";

    $.ajax({
        type: "POST",
        url: "CallReasons.asmx/UpdateReason",
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
function onSuccessGetReason(data, status) {

    if (data.d != "") {

        ClearFields();

        var jsonObj = jsonParse(data.d);

        $('#txtName').val(jsonObj[0].Reason);
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
        msg = 'Designation already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this level due to linkup.") {

        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this level due to linkup.';

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

var FillAllReasons = function () {
    $.ajax({
        type: 'POST',
        url: 'CallReasons.asmx/GetAllReasons',
        sync: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data.d);
            var jsonReslt = jsonParse(data.d);
            console.log(jsonReslt);
            $('#divGrid1 .dataTables_wrapper').remove();
            $('#divGrid1').prepend($('<table id="GridReasons" style="width:400px"><thead><tr><th Class="ob_gC_Fc">Reasons</th><th Class="ob_gC_Fc">Edit</th></tr></thead><tbody>'));


            $.each(jsonReslt, function (i, option) {
                $('#GridReasons').append($("<tr><td class='ob_text'>" + option.Reason + "</td><td><a href='#' onClick='oGrid_Edit(" + option.ReasonId + ")' class='ob_gAL'>Edit</a> </td></tr>"));
            });


            $('#divGrid1').append($('</tbody></table>'));

            $('#datatables2').dataTable({
                "sPaginationType": "full_numbers"
            });

        },
    });
};