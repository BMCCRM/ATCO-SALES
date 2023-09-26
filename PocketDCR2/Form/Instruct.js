// Global Variables
var INS_ID = 0;
var GlobalFlag = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
function pageLoad() {

    ClearFields();
    $('#hdnMode').val("");
    mode = $('#hdnMode').val();

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
            txtInstructName: {
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

    myData = "{'ID':'" + INS_ID + "'}";

    $.ajax({
        type: "POST",
        url: "InstructService.asmx/DeleteInstruct",
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
    //$('#hdnMode').val("AddMode");
    if (GlobalFlag == 0) {
        $("#btnRefresh").trigger('click');
        ClearFields();
    }
    else {
        msg = "";
    }
    ajaxCompleted();
    return false;
}

// Functions
function SaveData() {
    $('#hdnMode').val("AddMode")
    mode = $('#hdnMode').val();

    myData = "{'InstructName':'" + $('#txtInstructName').val()
        + "','InstructDescription':'" + $('#txtInstructDescription').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "InstructService.asmx/InsertInstruct",
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
    INS_ID = sender.pk_id;
    ClearFields();
    myData = "{'ID':'" + INS_ID + "'}";

    $.ajax({
        type: "POST",
        url: "InstructService.asmx/GetInstruct",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetInstruct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    INS_ID = sender.pk_id;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {
    $('#hdnMode').val("EditMode")
    mode = $('#hdnMode').val();
    myData = "{'ID':'" + INS_ID
        + "','InstructName':'" + $('#txtInstructName').val()
         + "','InstructDescription':'" + $('#txtInstructDescription').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "InstructService.asmx/UpdateInstruct",
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
function onSuccessGetInstruct(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#txtInstructName').val(jsonObj[0].InstructName);
        $('#txtInstructDescription').val(jsonObj[0].InstructDescription);
        $('#chkActive').attr("checked", jsonObj[0].isActive);
    }
}
function onSuccess(data, status) {


    if ($('#hdnMode').val() == "DeleteMode") {
        jsonObj = jsonParse(data.d);
        if (jsonObj[0].msg == 'InstructCSRRelation') {
            GlobalFlag = 1;
            $('#divConfirmation').jqmHide();
            msg = 'Not able to delete this record due to linkup with CSR.';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();


        }
      
        else if (jsonObj[0].msg == 'OK') {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';
            GlobalFlag = 0;
            ClearFields();
            $('#hdnMode').val("");
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
        }
    }
    else {
        if (data.d == "OK") {

            var mode = $('#hdnMode').val();
            var msg = '';

            if (mode === "AddMode") {
                msg = 'Data inserted succesfully!';
            }
            else if (mode === "EditMode") {
                msg = 'Data updated succesfully!';
            }
            GlobalFlag = 0;
            ClearFields();
            $('#hdnMode').val("");
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();


        }
        else if (data.d == "Duplicate Instruct Name!") {
            msg = 'Instruct Name already exist! Try different';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            GlobalFlag = 1;
            return false;
        }

        else if (data.d == "Not able to delete this record due to linkup.") {


            $('#divConfirmation').jqmHide();
            msg = 'Not able to delete this record due to linkup.';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            GlobalFlag = 1;

        }
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

    $('#txtName').val("");
    $('#ddlTeam').val("");
    $('#chkActive').attr("checked", true);
}