
// Page Load Event
$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    ClearFields();
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

});

// Global Variables
var ModuleID = 0;
var myData = "", mode = "", jsonObj = "", msg = "";

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $2('#form1').validate({
        rules: {
            txtModuleName: {
                required: true,
                alpha: true
            }
        }
    });

    if (!$2('#form1').valid()) {
        return false;
    }

    mode = $('#hdnMode').val();

    if (mode == "") {

        mode = "AddMode";
    }

    if (mode == "AddMode") {
        SaveData();
    }
    else if (mode == "EditMode") {
        UpdateData();
    }
    else {
        return false;
    }

    return false;
}

// Functions
function SaveData() {

    debugger
    myData = "{'ModuleName':'" + $('#txtModuleName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";
    $.ajax({
        type: "POST",
        url: "MasterModules.asmx/InsertModule",
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

function onSuccess(data, status) {
    debugger
    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode == "AddMode") {
            msg = 'Data inserted succesfully!';
            $('#hlabmsg').append(msg);
            $('#Divmessage').modal('show');
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }

        else if (mode === "DeleteMode") {
            msg = 'Data deleted succesfully!';
            $2('#divConfirmation').jqmHide();
        }

        ClearFields();
        $2('#hdnMode').val("");
        $2('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();

    }
    else if (data.d == "Already Exists") {
        msg = 'already exist! Try different';
        $2('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $2('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();
    }
    else if (data.d == "Error") {
        msg = 'Error';
        $('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();
        return false;
    }
}
function onError(request, status, error) {

    msg = 'Error occoured';
    $('#hlabmsg').append(msg);
    $2('#Divmessage').jqmShow();
    //$.fn.jQueryMsg({
    //    msg: msg,
    //    msgClass: 'error',
    //    fx: 'slide',
    //    speed: 500
    //});
}

function oGrid_Edit(ID) {
    debugger
    $('#hdnMode').val("EditMode");
    ModuleID = ID;
    myData = "{'ID':'" + ModuleID + "'}";

    $.ajax({
        type: "POST",
        url: "MasterModules.asmx/GetModules",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessGetForm(data, status) {
    debugger
    if (data.d != "") {

        //ClearFields();

        jsonObj = jsonParse(data.d);

        $2('#txtModuleName').val(jsonObj[0].ModuleName);
    }
}
function oGrid_Delete(ID) {

    $('#hdnMode').val("DeleteMode");
    ModuleID = ID;
    $2('#divConfirmation').jqmShow();
}
function UpdateData() {
    debugger
    myData = "{'ID':'" + ModuleID + "','ModuleName':'" + $('#txtModuleName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";
    $.ajax({
        type: "POST",
        url: "MasterModules.asmx/UpdateModule",
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

function btnYesClicked() {
    debugger
    myData = "{'ID':'" + ModuleID.ID + "'}";
    $.ajax({
        type: "POST",
        url: "MasterModules.asmx/DeleteModules",
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

function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    $2("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

function btnOkClicked() {

    $2('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $2("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}
function btnNoClicked() {

    $2('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    $2("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}


function startingAjax() {

    $('#imgLoading').show();
}

function ajaxCompleted() {

    $('#imgLoading').hide();
}
function ClearFields() {

    $('#txtModuleName').val("");
}